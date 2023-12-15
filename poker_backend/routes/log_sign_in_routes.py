#############################
# Log in and Sign in routes
# Built in -> 3rd party -> Custom Modules
#############################
from fastapi import Depends, APIRouter, HTTPException, Response, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Optional
import uuid
import sqlalchemy

from models.log_sign_in_models import UserInformation, TokenData
from controllers.log_sign_in_controller import add_user_account, get_user_account, create_access_token, verify_token

router = APIRouter()

# Define all post requests
@router.post('/api/signup')
def signup(user_information: UserInformation, response: Response) -> dict:
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
        # Create token
        access_token = create_access_token(data={"sub": user_information.username})
        response.set_cookie(key="access_token", value=f"Bearer {access_token}", httponly=True)
        return {'message': 'Success'}
    except Exception as e:
        if len(e.args) and isinstance(e.args[0], sqlalchemy.exc.IntegrityError):
            raise HTTPException(status_code=500, detail="Username/Email already exists")
        raise HTTPException(status_code=500, detail=str(e))
    
    
# Define all get requests
@router.post('/api/login')
def login(user_information: UserInformation, response: Response) -> dict:
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
        # Create token
        access_token = create_access_token(data={"sub": user_account['username']})
        response.set_cookie(key="access_token", value=f"Bearer {access_token}", httponly=True)
        return {'message': 'Success', 'username': user_account['username']}
    except Exception as e:
        raise HTTPException(status_code=500, detail='Cannot login. Please check username/password')
    
@router.post('/api/logout')
def logout(response: Response):
    response.delete_cookie(key="access_token")
    return {"message": "Logged out"}

@router.get("/api/verifyToken")
def verify_token_endpoint(request: Request):
    credentials_exception = HTTPException(status_code=401, detail="Could not validate credentials")
    # Extracting token from cookie
    token = request.cookies.get("access_token")
    if token is None:
        raise credentials_exception
    # Token format 'Bearer xxxxx', extracting actual token part
    token = token.split(" ")[1] if token.startswith("Bearer ") else token
    # Verifying token
    token_data = verify_token(token, credentials_exception)
    # Returning the username or other user info
    return {"username": token_data.username}

