from flask import Flask, jsonify, render_template, request, redirect, session, url_for
from main import generate_true_category
from database import add_data, check_user_email

app = Flask(__name__)

@app.route("/")
def home():
    email = session.get("user_email")

    if email is None:
        return redirect(url_for("signup"))
    
    user_email = check_user_email(email)

    if user_email is None:
        session.pop("user_email", None)
        return redirect(url_for("signup"))
    
    return render_template("index.html", user=user_email)

@app.route("/sign_up")
def signup():
    email = session.get("user_email")

    if email is not None:
        user_email = check_user_email(email)
        if user_email is not None:
            return redirect(url_for("home"))
    
    return render_template("signup.html")

@app.route("/get_inputtask", methods=["POST"])
def process():
    data = request.get_json()
    inputTask = data["inputtask"]
    categories = data["all_categories"]

    result = generate_true_category(inputTask, categories)
    result = result.strip().strip("'")

    categories[result].append(inputTask.strip())

    # add_data(result, inputTask)

    print(categories)

    return jsonify({
        "categories": categories
    })

@app.route("/get_signup_data", methods = ["POST"])
def get_signup_data():
    data = request.get_json()
    username = data["username"]
    email = data["email"]
    password = data["password"]

    add_data(username, email, password)

    session["user_email"] = email

    print(username)
    print(email)
    print(password)

    return jsonify({
        "reply": "data sent"
    })

if __name__ == "__main__":
    app.run(debug=True)
