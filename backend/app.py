import random
from flask import Flask, jsonify, redirect, request, render_template, url_for

app = Flask(__name__)

tasks = [
    {"id": 1, "name": "Pray Asr", "checked": False},
    {"id": 2, "name": "Pray Maghrib", "checked": True},
]


@app.route("/")
@app.route("/home")
def home():
    return render_template("index.html")

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify({"tasks": tasks})

@app.route("/tasks", methods=["POST"])
def create_task():
    new_task = {"id": len(tasks) + 1, "name": request.json["name"], "checked": False}
    tasks.append(new_task)
    return jsonify({"message": "Task created successfully", "task": new_task}), 201

@app.route("/tasks/<int:task_id>", methods=["PUT"])
def edit_tasks(task_id):
    task = next((task for task in tasks if task["id"] == task_id), None)
    if not task:
        return jsonify({"message": "Task not found"}), 404

    task["name"] = request.json.get("name", task["name"])
    task["checked"] = request.json.get("checked", task["checked"])

    return jsonify({"message": "Task updated successfully", "task": task}), 200


@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task["id"] != task_id]
    return jsonify({"message": "Task deleted successfully"}), 200


if __name__ == "__main__":
    app.run(debug=True)
