import psycopg2

# These match your docker-compose.yml exactly
DB_NAME = "akademia_cms"
DB_USER = "akademia_admin"
DB_PASS = "akademia_123"
DB_HOST = "localhost" # Use 'localhost' when running script locally, 'db' when running inside Docker

def init_db():
    try:
        # Connect to the Docker PostgreSQL database
        conn = psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASS,
            host=DB_HOST
        )
        cursor = conn.cursor()

        # 1. YOUR ORIGINAL TABLE (For simple text/settings)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS site_content (
                id SERIAL PRIMARY KEY,
                content_key TEXT UNIQUE NOT NULL,
                content_value TEXT NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)
        
        # Insert your default welcome message
        cursor.execute("""
            INSERT INTO site_content (content_key, content_value) 
            VALUES ('dashboard.welcome_heading', 'Welcome back to your dashboard')
            ON CONFLICT (content_key) DO NOTHING;
        """)

        # 2. NEW TABLE (For Company Activities/Events)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS activities (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                image_url TEXT,
                video_url TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        """)

        conn.commit()
        cursor.close()
        conn.close()
        print("✅ PostgreSQL Database initialized seamlessly!")

    except Exception as e:
        print(f"❌ Error initializing database: {e}")

if __name__ == "__main__":
    init_db()