#############################
# log_sign_in_controller
# Built in -> 3rd party -> Custom Modules
#############################
import random

from controllers import database_controller

def create_room(room_information: dict) -> str:
    all_rooms = database_controller.get_all_room_information()
    # import pdb; pdb.set_trace()
    return "str"