#############################
# Database controller
# Built in -> 3rd party -> Custom Modules
#############################
import os

from sqlalchemy import create_engine
from sqlalchemy import select
from sqlalchemy.orm import sessionmaker
from db.schema_code import User

engine = create_engine(os.environ["DATABASE_URL"])
SessionLocal = sessionmaker(bind=engine)


def create_user_account(username: str, email: str, hashed_password: str):
    """
    Create a row in the user_information table.
    
    Parameters:
        username (str)
        email (str)
        password (str)
    
    Returns:
        None
    
    Raises:
        Exception: If error in adding row.
    """
    session = SessionLocal()
    new_user = User(username=username, email=email,
                    hashed_password=hashed_password)
    try:
        session.add(new_user)
        session.commit()
    except Exception as e:
        session.rollback()
        raise Exception(e)
    finally:
        session.close()


def get_user_account(username: str = "", email: str = "", hashed_password: str = "") -> dict:
    """
    Get a user entry from the user_information table.
    
    Parameters:
        username (str)
        email (str)
        hashed_password (str)
    
    Returns:
        dict: A dictionary of row returned by the query.
    
    Raises:
        Exception: If error in getting a row.
    """
    session = SessionLocal()
    try:
        statement = select(User).where(User.email==email, User.hashed_password==hashed_password)
        rows = session.execute(statement).all()
        if not rows:
            # No rows are found
            raise Exception("No user account found")
        rows = [row[0].__dict__ for row in rows]
    except Exception as e:
        session.rollback()
        raise Exception(e)
    finally:
        session.close()
    return rows[0]