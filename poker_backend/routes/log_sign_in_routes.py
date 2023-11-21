#############################
# Log in and Sign in routes
# Built in -> 3rd party -> Custom Modules
#############################

from fastapi import APIRouter, HTTPException
from typing import Optional
from pydantic import BaseModel
import uuid
import sqlalchemy

from controllers.log_sign_in_controller import add_user_account, get_user_account

#### Define all pydantic models ####
class UserInformation(BaseModel):
    username: str = ""
    password: str
    email: str = ""

router = APIRouter()

# Define all post requests
@router.post('/api/signup')
def signin(user_information: UserInformation) -> dict:
    """
        remote_xxx() call to signin user
        
        Parameters:
            user_information (UserInformation)
            
        Returns:
            JSON structure (dict)
    """
    user_information.username = user_information.username.strip()
    user_information.password = user_information.password.strip()
    user_information.email = user_information.email.strip()
    try:
        if not user_information.username or not user_information.password or not user_information.email:
            raise Exception("Please fill all the fields")
        add_user_account(username=user_information.username, email=user_information.email, password=user_information.password)
        return {'message': 'Success'}
    except Exception as e:
        if len(e.args) and isinstance(e.args[0], sqlalchemy.exc.IntegrityError):
            raise HTTPException(status_code=500, detail="Username/Email already exists")
        raise HTTPException(status_code=500, detail=str(e))
    
    
# Define all get requests
@router.post('/api/login')
def login(user_information: UserInformation) -> dict:
    """
        remote_xxx() call to login a registered/existing user
        
        Parameters:
            user_information (UserInformation)
            
        Returns:
            JSON structure (dict)
    """
    user_information.username = user_information.username.strip()
    user_information.password = user_information.password.strip()
    user_information.email = user_information.email.strip()
    try:
        user_account = get_user_account(email=user_information.email, password=user_information.password)
        return {'message': 'Success', 'username': user_account['username']}
    except Exception as e:
        raise HTTPException(status_code=500, detail='Cannot login. Please check username/password')
