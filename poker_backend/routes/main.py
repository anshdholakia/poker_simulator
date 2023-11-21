from fastapi import FastAPI
from sqlalchemy import create_engine
from models import Base, DATABASE_URL
import uuid

app = FastAPI()

@app.post("/create-room")
async def create_room():
    room_id = str(uuid.uuid4())
    # Normally, you would save this Room ID in a database, associating it with the relevant game data.
    return {"room_id": room_id}

@app.on_event("startup")
def startup_event():
    engine = create_engine(DATABASE_URL)
    Base.metadata.create_all(bind=engine)



# To run the fastapi backend run -> python -m uvicorn main:app --reload
