#############################
# Creation routes
# Built in -> 3rd party -> Custom Modules
#############################

from fastapi import APIRouter, HTTPException
import uuid

from models.room_creation_models import RoomInformation

from controllers import room_creation_controller

router = APIRouter()


@router.post("/api/create_room")
def create_room(room_information: RoomInformation):
    """
        remote_xxx() create a room in the database

        Parameters:
            room_information (RoomInformation)

        Returns:
            JSON structure (dict)
    """
    try:
        room_id = room_creation_controller.create_room(room_information=dict(room_information))
        return {"room_id": room_id}
    except Exception as e:
        raise HTTPException(
            status_code=401, detail=f"Could not validate credentials/Please contact admin -> {e}")
