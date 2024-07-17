# for security - generate a secure jwt secret key
import secrets
secret_key = secrets.token_urlsafe(64)
print(secret_key)
