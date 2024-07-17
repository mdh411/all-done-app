import os

class Config:
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'fallback-secret-key')  # Fallback is used if env variable is not set
