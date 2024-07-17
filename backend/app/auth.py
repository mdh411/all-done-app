from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from flask_cors import cross_origin
from .models import find_user_by_email

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/login', methods=['POST'])
@cross_origin(origins="http://localhost:3000", supports_credentials=True)
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = find_user_by_email(email)
    if not user or user['password'] != password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=user['id'])
    return jsonify(access_token=access_token), 200


@auth_routes.route('/protected', methods=['GET'])
@jwt_required()
@cross_origin(origins="http://localhost:3000", supports_credentials=True)
def protected():
    return jsonify({"msg": "Protected route"}), 200
