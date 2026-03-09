from flask import Flask, request, jsonify
from flask_cors import CORS
from routes.interview_routes import interview_bp

app = Flask(__name__)
CORS(app)

# Temporary in-memory users (no database yet)
users = []

# REGISTER
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    for user in users:
        if user["username"] == username:
            return jsonify({"message": "User already exists"}), 400

    users.append({
        "username": username,
        "password": password
    })

    return jsonify({"message": "Registration successful"})


# LOGIN
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    for user in users:
        if user["username"] == username and user["password"] == password:
            return jsonify({"message": "Login successful"})

    return jsonify({"message": "Invalid credentials"}), 401


# Interview routes
app.register_blueprint(interview_bp, url_prefix="/api")


if __name__ == "__main__":
    app.run(debug=True)