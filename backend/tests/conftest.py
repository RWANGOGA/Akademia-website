import os
import sys
import pytest
from unittest.mock import patch, MagicMock

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

os.environ.setdefault("JWT_SECRET_KEY", "test-secret-key")
os.environ.setdefault("ADMIN_USER", "testadmin")
os.environ.setdefault("ADMIN_PASS", "testpass")
os.environ.setdefault("DATABASE_URL", "postgresql://user:pass@localhost:5432/testdb")
os.environ.setdefault("GROQ_API_KEY", "groq-test")
os.environ.setdefault("DEEPGRAM_API_KEY", "deepgram-test")
os.environ.setdefault("RESEND_API_KEY", "resend-test")

import app as app_module
from app import app

@pytest.fixture
def client():
    from fastapi.testclient import TestClient
    return TestClient(app)


@pytest.fixture
def admin_token(client):
    resp = client.post(
        "/api/auth/login",
        data={"username": "testadmin", "password": "testpass"},
    )
    assert resp.status_code == 200
    return resp.json()["access_token"]


@pytest.fixture
def auth_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}"}


@pytest.fixture
def mock_db_cursor():
    with patch.object(app_module.psycopg2, "connect") as mock_connect:
        mock_conn = MagicMock()
        mock_cursor = MagicMock()
        mock_connect.return_value = mock_conn
        mock_conn.cursor.return_value = mock_cursor
        mock_cursor.fetchone.return_value = [1]
        mock_cursor.fetchall.return_value = []
        yield mock_connect, mock_conn, mock_cursor
