import pytest
from app import create_app
from flask import json

@pytest.fixture
def client():
    flask_app = create_app()
    flask_app.config['TESTING'] = True
    with flask_app.test_client() as client:
        yield client

def test_login_success(client):
    response = client.post('/auth/login', json={
        'email': 'mohammed@ada.com',
        'password': 'adaIsGreat123'
    })
    data = json.loads(response.data)
    assert response.status_code == 200
    assert 'access_token' in data

def test_login_failure(client):
    response = client.post('/auth/login', json={
        'email': 'user@example.com',
        'password': 'wrongpassword'
    })
    data = json.loads(response.data)
    assert response.status_code == 401
    assert data['msg'] == 'Bad email or password'

def test_protected_route_without_token(client):
    response = client.get('/auth/protected')
    assert response.status_code == 401

def test_protected_route_with_token(client):
    login_response = client.post('/auth/login', json={
      'email': 'mohammed@ada.com',
      'password': 'adaIsGreat123'
    })
    token = json.loads(login_response.data)['access_token']
    
    response = client.get('/auth/protected', headers={
        'Authorization': f'Bearer {token}'
    })
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['msg'] == 'Protected route'
