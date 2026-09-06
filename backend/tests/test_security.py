import pytest
from unittest.mock import patch
import app as app_module
from app import app


class TestRateLimiting:
    def test_rate_limit_returns_429_when_limited(self, client, mock_db_cursor):
        with patch.object(app_module, "_is_rate_limited", return_value=True):
            resp = client.post(
                "/api/contact",
                json={
                    "inquiryType": "Other",
                    "firstName": "Test",
                    "lastName": "User",
                    "email": "test@example.com",
                    "message": "Hello",
                },
            )
            assert resp.status_code == 429
            assert resp.json()["detail"] == "Too many requests. Please try again later."


class TestCors:
    def test_cors_headers_present(self, client, mock_db_cursor):
        resp = client.get("/api/activities", headers={"Origin": "http://localhost:3000"})
        assert resp.status_code == 200
        assert "access-control-allow-origin" in resp.headers

    def test_cors_rejects_unknown_origin(self, client, mock_db_cursor):
        resp = client.get("/api/activities", headers={"Origin": "http://evil.example"})
        assert resp.headers.get("access-control-allow-origin") != "http://evil.example"


class TestErrorHandling:
    def test_errors_do_not_leak_internals(self, client, mock_db_cursor):
        mock_connect, mock_conn, mock_cursor = mock_db_cursor
        mock_cursor.execute.side_effect = Exception("postgresql internal error")

        resp = client.get("/api/activities")
        assert resp.status_code == 500
        assert "postgresql" not in resp.text
        assert resp.json()["detail"] == "Internal server error"
