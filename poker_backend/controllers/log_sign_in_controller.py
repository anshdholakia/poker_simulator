#############################
# log_sign_in_controller
# Built in -> 3rd party -> Custom Modules
#############################

import hashlib

from controllers import database_controller


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
