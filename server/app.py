from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
import random

# Gemini API
client = genai.Client(api_key="AIzaSyAB6J4DqDCvdFAc3EJGuqG1hA9XBJKbOac")

app = Flask(__name__)
CORS(app)

# Temporary user storage
users = []


# ==============================
# QUESTION BANKS
# ==============================

easy_questions = [
"What is a variable in programming?",
"What is a function?",
"What is an API?",
"What is a database?",
"What is a loop in programming?",
"What is an array?",
"What is a conditional statement?",
"What is HTML?",
"What is CSS?",
"What is JavaScript?",
"What is a class in programming?",
"What is object-oriented programming?",
"What is Git?",
"What is version control?",
"What is debugging?",
"What is a web server?",
"What is frontend development?",
"What is backend development?",
"What is an IDE?",
"What is a framework?",
"What is a library?",
"What is HTTP?",
"What is HTTPS?",
"What is JSON?",
"What is REST API?",
"What is a parameter?",
"What is an argument in functions?",
"What is a boolean value?",
"What is a string?",
"What is an integer?",
"What is a float?",
"What is an if statement?",
"What is a for loop?",
"What is a while loop?",
"What is software development?",
"What is a browser?",
"What is a URL?",
"What is a web application?",
"What is localhost?",
"What is client-server architecture?",
"What is a programming language?",
"What is Python?",
"What is Java?",
"What is Node.js?",
"What is variable scope?",
"What is syntax error?",
"What is runtime error?",
"What is logical error?",
"What is testing?"
]

medium_questions = [
"Explain REST API architecture.",
"What is JWT authentication?",
"What is middleware in backend?",
"Explain database indexing.",
"Difference between SQL and NoSQL.",
"What is CORS?",
"Explain microservices architecture.",
"What is load balancing?",
"What is rate limiting?",
"What is GraphQL vs REST?",
"What is dependency injection?",
"Explain caching in web apps.",
"What is Docker?",
"Explain CI/CD pipeline.",
"What are design patterns?",
"What is horizontal scaling?",
"What is vertical scaling?",
"What is message queue?",
"What is API gateway?",
"What is OAuth authentication?",
"What is MVC architecture?",
"What is ORM?",
"What is database normalization?",
"What is database replication?",
"What is authentication vs authorization?",
"What is session management?",
"What is token-based authentication?",
"What is HTTPS handshake?",
"What is CDN?",
"What is containerization?",
"What is Kubernetes?",
"What is async programming?",
"What is event-driven architecture?",
"What is API throttling?",
"What is load testing?",
"What is stress testing?",
"What is performance optimization?",
"What is caching strategy?",
"What is database transaction?",
"What is ACID property?",
"What is message broker?",
"What is WebSocket?",
"What is gRPC?",
"What is API versioning?",
"What is backend logging?",
"What is monitoring?",
"What is distributed caching?",
"What is API security?"
]

hard_questions = [
"Explain the CAP theorem.",
"What is distributed system consistency?",
"What is eventual consistency?",
"Difference between monolith and microservices?",
"What is circuit breaker pattern?",
"What is saga pattern?",
"What is idempotency in APIs?",
"What is distributed tracing?",
"What is consensus algorithm?",
"What is Raft algorithm?",
"What is Paxos algorithm?",
"What is data partitioning?",
"What is leader election?",
"What is high availability architecture?",
"What is fault tolerance?",
"What is backpressure in systems?",
"What is service mesh?",
"What is sidecar pattern?",
"What is zero-downtime deployment?",
"What is blue-green deployment?",
"What is canary deployment?",
"What is CQRS pattern?",
"What is event sourcing?",
"What is domain-driven design?",
"What is bounded context?",
"What is two-phase commit?",
"What is distributed locking?",
"What is vector clock?",
"What is CRDT?",
"What is sharding strategy?",
"What is database failover?",
"What is load shedding?",
"What is token bucket algorithm?",
"What is leaky bucket algorithm?",
"What is distributed queue?",
"What is Kafka architecture?",
"What is Redis clustering?",
"What is memcached vs redis?",
"What is high throughput system design?",
"What is reverse proxy?",
"What is edge computing?",
"What is observability?",
"What is distributed logging?",
"What is data pipeline architecture?",
"What is stream processing?",
"What is batch processing?",
"What is event-driven microservices?"
]


# ==============================
# REGISTER
# ==============================

@app.route("/api/register", methods=["POST"])
def register():

    data = request.get_json()

    username = data.get("identifier")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Missing fields"}), 400

    for user in users:
        if user["username"] == username:
            return jsonify({"message": "User already exists"}), 400

    users.append({
        "username": username,
        "password": password
    })

    return jsonify({"message": "Registration successful"})


# ==============================
# LOGIN
# ==============================

@app.route("/api/login", methods=["POST"])
def login():

    data = request.get_json()

    username = data.get("identifier")
    password = data.get("password")

    for user in users:
        if user["username"] == username and user["password"] == password:
            return jsonify({"message": "Login successful"})

    return jsonify({"message": "Invalid credentials"}), 401


# ==============================
# GENERATE QUESTIONS
# ==============================

@app.route("/api/generate-questions", methods=["POST"])
def generate_questions():

    data = request.get_json()

    role = data.get("role")
    company = data.get("company")
    difficulty = data.get("difficulty")
    count = int(data.get("count", 5))

    prompt = f"""
You are a technical interviewer.

Generate {count} interview questions.

Role: {role}
Company: {company}
Difficulty: {difficulty}

Rules:
- Only return the questions
- No explanations
- One question per line
"""

    try:

        print("Sending request to Gemini...")

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        text = response.text

        questions = []

        for line in text.split("\n"):

            line = line.strip()

            if not line:
                continue

            if line[0].isdigit():
                line = line.split(".", 1)[-1].strip()

            questions.append(line)

        questions = questions[:count]

        print("AI Questions:", questions)

        return jsonify({"questions": questions})

    except Exception as e:

        print("Gemini error:", e)

        if difficulty == "Easy":
            selected = random.sample(easy_questions, count)

        elif difficulty == "Medium":
            selected = random.sample(medium_questions, count)

        else:
            selected = random.sample(hard_questions, count)

        return jsonify({"questions": selected})


# ==============================
# EVALUATE ANSWER
# ==============================

@app.route("/api/evaluate-answer", methods=["POST"])
def evaluate_answer():

    data = request.get_json()

    question = data.get("question")
    answer = data.get("answer")

    prompt = f"""
Evaluate this interview answer.

Question:
{question}

Answer:
{answer}

Return:

Score: (0-100)

Feedback:
• strengths
• missing concepts
• improvements
"""

    try:

        print("Evaluating answer...")

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return jsonify({"evaluation": response.text})

    except Exception as e:

        print("Evaluation error:", e)

        return jsonify({
            "evaluation": """
Score: 60 / 100

Feedback:
• Basic answer provided
• Missing detailed explanation
• Could improve with examples
"""
        })


# ==============================
# EVALUATE FULL INTERVIEW
# ==============================

@app.route("/api/evaluate-interview", methods=["POST"])
def evaluate_interview():

    data = request.get_json()

    role = data.get("role")
    company = data.get("company")
    responses = data.get("responses")

    qa_text = ""

    for i, item in enumerate(responses):

        qa_text += f"""
Question {i+1}: {item['question']}
Answer: {item['answer']}
"""

    prompt = f"""
You are evaluating a technical interview.

Role: {role}
Company: {company}

Interview responses:

{qa_text}

Return:

Final Score: (0-100)

Strengths:
• bullet points

Weaknesses:
• bullet points

Suggestions:
• bullet points
"""

    try:

        print("Evaluating full interview...")

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return jsonify({"evaluation": response.text})

    except Exception as e:

        print("Evaluation error:", e)

        return jsonify({
            "evaluation": "Evaluation unavailable"
        })


# ==============================
# TEST ROUTE
# ==============================

@app.route("/")
def home():
    return "AI Interview Platform Backend Running"


# ==============================
# RUN SERVER
# ==============================

if __name__ == "__main__":
    app.run(debug=True, port=5000)
