from flask_jwt_extended import JWTManager

jwt = JWTManager()

def init_jwt(app):
    jwt.init_app(app)

def validate_task(task):
    if 'name' not in task or not isinstance(task['name'], str) or len(task['name'].strip()) == 0:
        return False
    return True

def validate_task_update(task):
    if 'name' in task and (not isinstance(task['name'], str) or len(task['name'].strip()) == 0):
        return False
    if 'checked' in task and not isinstance(task['checked'], bool):
        return False
    return True
