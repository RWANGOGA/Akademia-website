import os
import io
import pytest
from unittest.mock import patch, MagicMock
from app import app


class TestActivities:
    def test_list_activities(self, client, mock_db_cursor):
        mock_connect, mock_conn, mock_cursor = mock_db_cursor
        mock_cursor.fetchall.return_value = []

        resp = client.get("/api/activities")
        assert resp.status_code == 200
        assert "activities" in resp.json()

    def test_create_activity_unauthorized(self, client):
        resp = client.post("/api/activities", data={"title": "t", "description": "d"})
        assert resp.status_code == 401

    def test_create_activity_success(self, client, auth_headers, mock_db_cursor):
        with patch("app.os.path.exists", return_value=False), patch("app.open", create=True) as mock_open:
            resp = client.post(
                "/api/activities",
                data={"title": "t", "description": "d"},
                files={"images": ("img.jpg", b"fake-image", "image/jpeg")},
                headers=auth_headers,
            )
        assert resp.status_code == 200
        assert resp.json()["message"] == "Activity created successfully!"

    def test_create_activity_invalid_image_extension(self, client, auth_headers):
        resp = client.post(
            "/api/activities",
            data={"title": "t", "description": "d"},
            files={"images": ("malware.exe", b"bad", "application/octet-stream")},
            headers=auth_headers,
        )
        assert resp.status_code == 400

    def test_update_activity_unauthorized(self, client):
        resp = client.put("/api/activities/1", data={"title": "t", "description": "d"})
        assert resp.status_code == 401

    def test_delete_activity_unauthorized(self, client):
        resp = client.delete("/api/activities/1")
        assert resp.status_code == 401

    def test_delete_activity_success(self, client, auth_headers, mock_db_cursor):
        mock_connect, mock_conn, mock_cursor = mock_db_cursor
        mock_cursor.fetchone.return_value = [[], []]

        with patch("app.os.path.exists", return_value=False), patch("app.os.remove") as mock_remove:
            resp = client.delete("/api/activities/1", headers=auth_headers)
        assert resp.status_code == 200
        assert resp.json()["message"] == "Activity deleted successfully!"
