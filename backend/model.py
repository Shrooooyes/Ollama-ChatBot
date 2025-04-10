from pydantic import BaseModel

class createUser(BaseModel):
    name: str
    email: str
    password: str
    chats: list
    
class loginReq(BaseModel):
    email: str
    password: str