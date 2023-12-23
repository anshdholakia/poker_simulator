#############################
# Log in and Sign in Pydantic Models
# Built in -> 3rd party -> Custom Modules
#############################
from pydantic import BaseModel

#### Define all pydantic models ####


class RoomInformation(BaseModel):
    room_name: str
    lower_blind: int
    upper_blind: int
    initial_bid: int
