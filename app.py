from flask import Flask, jsonify, render_template, request
from main import generate_true_category
from database import add_data

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get_inputtask", methods=["POST"])
def process():
    data = request.get_json()
    inputTask = data["inputtask"]
    categories = data["all_categories"]

    result = generate_true_category(inputTask, categories)
    result = result.strip().strip("'")

    add_data(result, inputTask)

    print(categories)
    print(result)

    return jsonify({
        "result": result
    })

if __name__ == "__main__":
    app.run(debug=True)
