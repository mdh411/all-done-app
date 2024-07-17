users = [
    {"id": 1, "email": "mohammed@ada.com", "password": "adaIsGreat123"}
]


def find_user_by_email(email):
    return next((user for user in users if user["email"] == email), None)
