from flask import Flask, jsonify, render_template
import requests

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get_inputtask", methods=["POST"])
def process():
    global inputTask
    data = requests.get_json()
    inputTask = data["inputtask"]
    categories = data["all_categories"]

    return jsonify({
        "task": inputTask,
        "categories": categories
    })

if __name__ == "__main__":
    app.run(debug=True)
