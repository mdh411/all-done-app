users = [
    {"id": 1, "email": "mohammed@ada.com", "password": "adaIsGreat123"}  # Passwords should be hashed in a real app
]

def find_user_by_email(email):
    return next((user for user in users if user["email"] == email), None)
