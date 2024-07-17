from flask import jsonify

def bad_request(error):
    response = jsonify({"message": error.description})
    response.status_code = 400
    return response

def not_found(error):
    response = jsonify({"message": error.description})
    response.status_code = 404
    return response

def handle_exception(e):
    return jsonify({"message": "An unexpected error occurred"}), 500
