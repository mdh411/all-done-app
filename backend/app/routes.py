from flask import Blueprint, jsonify, request, render_template, abort
from flask_cors import cross_origin
from .utils import validate_task, validate_task_update

main_routes = Blueprint('main', __name__)

tasks = []

@main_routes.route("/")
@main_routes.route("/home")
@cross_origin(origins="http://localhost:3000", supports_credentials=True)
def home():
    return render_template("index.html")

@main_routes.route("/tasks", methods=["GET"])
@cross_origin(origins="http://localhost:3000", supports_credentials=True)
def get_tasks():
    return jsonify({"tasks": tasks})

@main_routes.route("/tasks", methods=["POST"])
@cross_origin(origins="http://localhost:3000", supports_credentials=True)
def create_task():
    if not request.json or not validate_task(request.json):
        abort(400, "Invalid task data. 'name' field is required and must be a non-empty string.")
    
    new_task = {"id": len(tasks) + 1, "name": request.json["name"], "checked": False}
    tasks.append(new_task)
    return jsonify({"message": "Task created successfully", "task": new_task}), 201

@main_routes.route("/tasks/<int:task_id>", methods=["PUT"])
@cross_origin(origins="http://localhost:3000", supports_credentials=True)
def edit_tasks(task_id):
    task = next((task for task in tasks if task["id"] == task_id), None)
    if not task:
        abort(404, "Task not found")
    
    if not request.json or not validate_task_update(request.json):
        abort(400, "Invalid task data. 'name' field must be a non-empty string if provided and 'checked' field must be a boolean if provided.")
    
    task["name"] = request.json.get("name", task["name"])
    task["checked"] = request.json.get("checked", task["checked"])

    return jsonify({"message": "Task updated successfully", "task": task}), 200

@main_routes.route("/tasks/<int:task_id>", methods=["DELETE"])
@cross_origin(origins="http://localhost:3000", supports_credentials=True)
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task["id"] != task_id]
    return jsonify({"message": "Task deleted successfully"}), 200
