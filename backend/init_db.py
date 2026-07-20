import sqlite3

def init_db():
    conn = sqlite3.connect("akademia_cms.db")
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS site_content (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content_key TEXT UNIQUE NOT NULL,
            content_value TEXT NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)
    cursor.execute("""
        INSERT OR IGNORE INTO site_content (content_key, content_value) 
        VALUES ('dashboard.welcome_heading', 'Welcome back to your dashboard');
    """)
    conn.commit()
    cursor.close()
    conn.close()
    print("SQLite Database initialized seamlessly without passwords!")

if __name__ == "__main__":
    init_db()
