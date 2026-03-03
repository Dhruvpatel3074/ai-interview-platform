from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users = {}

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Missing fields"}), 400

    if email in users:
        return jsonify({"message": "User already exists"}), 400

    users[email] = password
    return jsonify({"message": "User registered successfully"}), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if email in users and users[email] == password:
        return jsonify({"token": "real-token-123"})

    return jsonify({"message": "Invalid credentials"}), 401


@app.route("/start-interview", methods=["POST"])
def start_interview():
    data = request.json
    role = data.get("role")

    question = f"Tell me about your experience as a {role} developer."
    return jsonify({"question": question})


@app.route("/submit-answer", methods=["POST"])
def submit_answer():
    data = request.json
    answer = data.get("answer")

    feedback = "Good structure. Try adding more technical depth."
    return jsonify({"feedback": feedback})


if __name__ == "__main__":
    app.run(debug=True)