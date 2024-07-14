import random
from flask import Flask, jsonify, request, render_template, abort

app = Flask(__name__)

tasks = [
    {"id": 1, "name": "Pray Asr", "checked": False},
    {"id": 2, "name": "Pray Maghrib", "checked": True},
]

def validate_task(task):
    if 'name' not in task or not isinstance(task['name'], str) or len(task['name'].strip()) == 0:
        return False
    return True

@app.errorhandler(400)
def bad_request(error):
    response = jsonify({"message": error.description})
    response.status_code = 400
    return response

@app.errorhandler(404)
def not_found(error):
    response = jsonify({"message": error.description})
    response.status_code = 404
    return response

@app.route("/")
@app.route("/home")
def home():
    return render_template("index.html")

@app.route("/tasks", methods=["GET"])
def get_tasks():
    return jsonify({"tasks": tasks})

@app.route("/tasks", methods=["POST"])
def create_task():
    if not request.json or not validate_task(request.json):
        abort(400, "Invalid task data. 'name' field is required and must be a non-empty string.")
    
    new_task = {"id": len(tasks) + 1, "name": request.json["name"], "checked": False}
    tasks.append(new_task)
    return jsonify({"message": "Task created successfully", "task": new_task}), 201

@app.route("/tasks/<int:task_id>", methods=["PUT"])
def edit_tasks(task_id):
    task = next((task for task in tasks if task["id"] == task_id), None)
    if not task:
        abort(404, "Task not found")
    
    if not request.json or ('name' in request.json and not isinstance(request.json['name'], str)) or ('name' in request.json and len(request.json['name'].strip()) == 0):
        abort(400, "Invalid task data. 'name' field must be a non-empty string if provided.")
    
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
