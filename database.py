import sqlite3


def create_db():
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        username TEXT NOT NULL,
        gmail TEXT NOT NULL,
        password TEXT NOT NULL
    )
""")
    conn.commit()
    conn.close()

def add_data(username, gmail, password):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()  
    cursor.execute(
        "INSERT INTO users (username, gmail, password) VALUES (?, ?, ?)",
        (username, gmail, password)
    )
    conn.commit()
    conn.close()

def list_all_data():
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    rows = cursor.fetchall()
    conn.close()
    for row in rows:
        print(row)

def delete_all_data():
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users")
    conn.commit()
    conn.close()

def check_user_email(gmail):
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    cursor.execute("SELECT gmail FROM users WHERE gmail = ?", (gmail, ))
    user_gmail = cursor.fetchone()
    gmails = cursor.fetchall()
    conn.close()

    if user_gmail:
        return True
    else:
        return False


if __name__ == "__main__":
    create_db()
    list_all_data()
