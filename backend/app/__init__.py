from flask import Flask
from flask_cors import CORS
from .routes import main_routes
from .auth import auth_routes
from .error_handlers import bad_request, not_found, handle_exception
from .utils import init_jwt

def create_app():
    app = Flask(__name__, template_folder='templates')
    app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this in a real app
    CORS(app, origins="http://localhost:3000")
    init_jwt(app)
    
    app.register_blueprint(main_routes)
    app.register_blueprint(auth_routes, url_prefix='/auth')
    
    app.register_error_handler(400, bad_request)
    app.register_error_handler(404, not_found)
    app.register_error_handler(Exception, handle_exception)
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
