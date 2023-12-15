#############################
# log_sign_in_controller
# Built in -> 3rd party -> Custom Modules
#############################
import os
from datetime import datetime, timedelta

from jose import JWTError, jwt
from dotenv import load_dotenv
import hashlib

from controllers import database_controller
from models.log_sign_in_models import UserInformation, TokenData

# This loads the environment variables from .env
load_dotenv()

#### Global Functions ####
JWT_SECRET = os.environ["JWT_SECRET"]
ALGORITHM = "HS256"

def hash_password(password: str) -> str:
    """
        Hashes password by calling hashlib.sha256()
        
        Parameters:
            password (str)
        
        Returns:
            str: Hashed password
        
        Raises:
            Exception: If error in hashing password.
    """
    return hashlib.sha256(password.encode()).hexdigest()


def add_user_account(username: str, email: str, password: str):
    """
        Creates User Account by calling remote_xxx() in database controllers
        
        Parameters:
            username (str)
            email (str)
            password (str)
        
        Returns:
            None
        
        Raises:
            Exception: If error in creating a row.
    """
    database_controller.create_user_account(
        username=username, email=email, hashed_password=hash_password(password))
    
def get_user_account(email: str, password: str) -> dict:
    """
        Gets User Account by calling remote_xxx() in database controllers
        
        Parameters:
            email (str)
            password (str)
        
        Returns:
            dict: A dictionary of row returned by the query.
        
        Raises:
            Exception: If error in getting a row.
    """
    return database_controller.get_user_account(email=email, hashed_password=hash_password(password))

def create_access_token(data: dict):
    """
        Creates an access token
        
        Parameters:
            data (dict)
        
        Returns:
            dict: A dictionary of row returned by the query.
        
        Raises:
            Exception.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=30)  # Token expiry time
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    return token_data
