from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"message": "Backend running successfully"})

@app.route("/generate-question")
def generate_question():
    return jsonify({
        "question": "Explain the difference between list and tuple in Python."
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)