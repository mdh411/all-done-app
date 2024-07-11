import random
from flask import Flask, jsonify, redirect, request, render_template, url_for

app = Flask(__name__)

tasks = [
    {"id": 1, "name": "Pray Asr", "checked": False},
    {"id": 2, "name": "Pray Maghrib", "checked": True},
]

@app.route("/")
@app.route("/home", methods=["GET", "POST"])
def home():
    if (request.method == "POST"):
        task_name = request.form["task_name"]
        cur_id = random.randint(1, 1000)
        tasks.append({
            'id': cur_id,
            'name': task_name,
            'checked': False
        })
    return render_template("index.html", items=tasks)

@app.route("/checked/<int:task_id>", methods=["POST"])
def checked_task(task_id):
    for task in tasks:
        if task['id'] == task_id:
            task['checked'] = not task['checked']
            break
    return redirect(url_for("home"))


@app.route("/delete/<int:task_id>", methods=["POST"])
def delete_task(task_id):
    global tasks
    for task in tasks:
        if task['id'] == task_id:
            tasks.remove(task)
    return redirect(url_for("home"))

@app.route('/tasks', methods=['POST'])
def create_task():
    new_task = {
        "id": len(tasks) + 1,
        "name": request.json['name'],
        "checked": False
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

    task['name'] = request.json.get('name', task['name'])
    task['checked'] = request.json.get('checked', task['checked'])
    
    return jsonify({"message": "Task updated successfully", "task": task}), 200

# @app.route('/tasks/<int:task_id>', methods=['DELETE'])
# def delete_task(task_id):
#     global tasks
#     tasks = [task for task in tasks if task['id'] != task_id]
#     return jsonify({"message": "Task deleted successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)