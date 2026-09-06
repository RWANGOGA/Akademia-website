import pytest
from app import app


class TestAuth:
    def test_login_success(self, client):
        resp = client.post(
            "/api/auth/login",
            data={"username": "testadmin", "password": "testpass"},
        )
        assert resp.status_code == 200
        data = resp.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"

    def test_login_failure(self, client):
        resp = client.post(
            "/api/auth/login",
            data={"username": "bad", "password": "bad"},
        )
        assert resp.status_code == 401

    def test_verify_token_success(self, client, admin_token):
        resp = client.get(
            "/api/auth/verify",
            headers={"Authorization": f"Bearer {admin_token}"},
        )
        assert resp.status_code == 200
        assert resp.json()["valid"] is True

    def test_verify_token_missing(self, client):
        resp = client.get("/api/auth/verify")
        assert resp.status_code == 401

    def test_verify_token_invalid(self, client):
        resp = client.get(
            "/api/auth/verify",
            headers={"Authorization": "Bearer invalid"},
        )
        assert resp.status_code == 401
