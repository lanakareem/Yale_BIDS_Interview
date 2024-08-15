from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

class Config:
    #if SECRET_KEY is not set in the environment, default to default_secret_key
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
