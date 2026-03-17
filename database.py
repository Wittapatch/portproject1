import sqlite3


def create_db():
    conn = sqlite3.connect("todolist.db")
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS tasks (
        category TEXT NOT NULL,
        todo TEXT NOT NULL
    )
""")
    conn.commit()
    conn.close()

def add_data(result, todo):
    conn = sqlite3.connect("todolist.db")
    cursor = conn.cursor()  
    cursor.execute(
        "INSERT INTO tasks (category, todo) VALUES (?, ?)",
        (result, todo)
    )
    conn.commit()
    conn.close()

def list_all_data():
    conn = sqlite3.connect("todolist.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tasks")
    rows = cursor.fetchall()
    conn.close()
    for row in rows:
        print(row)

def delete_all_data():
    conn = sqlite3.connect("todolist.db")
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks")
    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_db()
    list_all_data()
