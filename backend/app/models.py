users = [
    {"id": 1, "email": "abc@1", "password": "123"}  # Passwords should be hashed in a real app
]

def find_user_by_email(email):
    return next((user for user in users if user["email"] == email), None)
