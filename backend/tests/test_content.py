import pytest
from app import app


class TestContent:
    def test_get_content_empty(self, client, mock_db_cursor):
        mock_connect, mock_conn, mock_cursor = mock_db_cursor
        mock_cursor.fetchone.return_value = None

        resp = client.get("/content/test-key")
        assert resp.status_code == 200
        assert resp.json()["content"] is None

    def test_update_content_unauthorized(self, client):
        resp = client.post("/content/update", json={"content_key": "k", "content_value": "v", "admin_secret": "wrong"})
        assert resp.status_code == 401

    def test_update_content_forbidden_wrong_secret(self, client, auth_headers):
        resp = client.post(
            "/content/update",
            json={"content_key": "k", "content_value": "v", "admin_secret": "wrong"},
            headers=auth_headers,
        )
        assert resp.status_code == 403

    def test_update_content_success(self, client, auth_headers, mock_db_cursor):
        resp = client.post(
            "/content/update",
            json={"content_key": "k", "content_value": "v", "admin_secret": "testpass"},
            headers=auth_headers,
        )
        assert resp.status_code == 200
        assert resp.json()["status"] == "success"
