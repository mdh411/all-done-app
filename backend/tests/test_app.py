import pytest
from app import app, tasks
import json


@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
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

def test_delete_task_success(client):
    task_id = 1
    response = client.delete(f'/tasks/{task_id}')
    assert response.status_code == 200
    response_data = json.loads(response.data.decode('utf-8'))
    assert response_data['message'] == 'Task deleted successfully'
