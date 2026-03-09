from flask import Blueprint, request, jsonify

interview_bp = Blueprint("interview", __name__)


@interview_bp.route("/start-interview", methods=["POST"])
def start_interview():

    data = request.json
    count = int(data.get("questions", 5))

    questions = [
        "Explain React Virtual DOM.",
        "What are React Hooks?",
        "Explain REST APIs.",
        "What is state in React?",
        "What is component lifecycle?"
    ]

    return jsonify({
        "questions": questions[:count]
    })


@interview_bp.route("/submit-interview", methods=["POST"])
def submit_interview():

    data = request.json
    answers = data.get("answers", [])

    score = len([a for a in answers if len(a) > 10])

    return jsonify({
        "score": score,
        "feedback": "Good attempt. Try to give more detailed answers."
    })