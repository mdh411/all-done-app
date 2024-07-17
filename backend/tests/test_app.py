import json
import pytest
from app import create_app

@pytest.fixture
def client():
    flask_app = create_app()
    flask_app.config['TESTING'] = True
    with flask_app.test_client() as client:
        yield client

def test_home_route(client):
    response = client.get("/")
    assert response.status_code == 200

def test_get_tasks_success(client):
    response = client.get('/tasks')
    assert response.status_code == 200
    tasks_data = json.loads(response.data.decode('utf-8'))
    assert 'tasks' in tasks_data

def test_create_task_success(client):
    new_task_data = {"name": "Test Task", "checked": False}
    response = client.post('/tasks', json=new_task_data)
    assert response.status_code == 201
    response_data = json.loads(response.data.decode('utf-8'))
    assert response_data['message'] == 'Task created successfully'
    assert 'task' in response_data
    created_task = response_data['task']
    assert created_task['name'] == new_task_data['name']
    assert created_task['checked'] == new_task_data['checked']

def test_edit_task_success(client):
    task_id = 1
    updated_task_data = {"name": "Updated Task", "checked": True}
    response = client.put(f'/tasks/{task_id}', json=updated_task_data)
    assert response.status_code == 200
    response_data = json.loads(response.data.decode('utf-8'))
    assert response_data['message'] == 'Task updated successfully'
    assert 'task' in response_data
    updated_task = response_data['task']
    assert updated_task['name'] == updated_task_data['name']
    assert updated_task['checked'] == updated_task_data['checked']

def test_edit_task_invalid_input(client):
    task_id = 1
    invalid_task_data = {"checked": "True"}  # 'checked' should be a boolean
    response = client.put(f'/tasks/{task_id}', json=invalid_task_data)
    
    assert response.status_code >= 400 and response.status_code < 500  # Check if status code is in 4xx range
    response_data = json.loads(response.data.decode('utf-8'))
    assert 'message' in response_data
    assert response_data['message'] == "Invalid task data. 'name' field must be a non-empty string if provided and 'checked' field must be a boolean if provided."
    
def test_delete_task_success(client):
    task_id = 1
    response = client.delete(f'/tasks/{task_id}')
    assert response.status_code == 200
    response_data = json.loads(response.data.decode('utf-8'))
    assert response_data['message'] == 'Task deleted successfully'

def test_create_task_invalid_input(client):
    invalid_task_data = {"checked": False}  # missing 'name' field
    response = client.post('/tasks', json=invalid_task_data)
    
    assert response.status_code == 400
    response_data = json.loads(response.data.decode('utf-8'))
    assert 'message' in response_data
    assert response_data['message'] == "Invalid task data. 'name' field is required and must be a non-empty string."
