#############################
# Log in and Sign in Pydantic Models
# Built in -> 3rd party -> Custom Modules
#############################
from pydantic import BaseModel

#### Define all pydantic models ####
class UserInformation(BaseModel):
    username: str = ""
    password: str
    email: str = ""
    
class TokenData(BaseModel):
    username: str = None