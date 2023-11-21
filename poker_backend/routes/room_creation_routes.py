#############################
#### Creation routes
#### Built in -> 3rd party -> Custom Modules
#############################

from fastapi import APIRouter
import uuid

router = APIRouter()

@router.post("/create-room")
async def create_room():
    room_id = str(uuid.uuid4())
    # Normally, save this Room ID in a database, associating it with the relevant game data.
    return {"room_id": room_id}
