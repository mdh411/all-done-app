from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

tasks = [
    {"id": 1, "title": "Task 1", "description": "This is Task 1", "status": False},
    {"id": 2, "title": "Task 2", "description": "This is Task 2", "status": False},
]

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/tasks', methods=['POST'])
def create_task():
    new_task = {
        "id": len(tasks) + 1,
        "title": request.json['title'],
        "description": request.json.get('description', 'This is Task 3'),
        "status": False
    }
    tasks.append(new_task)
    return jsonify({"message": "Task created successfully", "task": new_task}), 201

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify({"tasks": tasks})

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def edit_tasks(task_id):
    task = next((task for task in tasks if task['id'] == task_id), None)
    if not task:
        return jsonify({"message": "Task not found"}), 404

    task['title'] = request.json.get('title', task['title'])
    task['description'] = request.json.get('description', task['description'])
    task['status'] = request.json.get('status', task['status'])
    
    return jsonify({"message": "Task updated successfully", "task": task}), 200

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return jsonify({"message": "Task deleted successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)