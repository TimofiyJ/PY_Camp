import random
import pandas as pd
from datetime import datetime, timedelta

# GENERATE HOUSE
house_id = [i for i in range(1, 10)]
house_name = [
    "Marichka",
    "Fialka",
    "Druzhba",
    "Lastivka",
    "Zirka",
    "Nichka",
    "Sontse",
    "Spryna",
    "Dobro",
]
data = {"id":house_id,"name":house_name}
houses = pd.DataFrame(data=data,columns=["id", "name"])
houses.to_csv("./data/houses.csv", index=False)

# GENERATE ROOM
room_id = []
room_houseId = []
room_number = []
room_balcony = []
room_floor = []
room_bedAmount = []
room_rid = 0
for i in house_id:
    for n in range(1,5):
        room_rid +=1
        room_id.append(room_rid)
        room_number.append(n)
        room_houseId.append(i)
        if n==3 or n==4:
            room_balcony.append(True)
            room_floor.append(2)
        else:
            room_balcony.append(False)
            room_floor.append(1)
        room_bedAmount.append(4)
        
data = {"id":room_id,"number":room_number,"balcony":room_balcony,"floor":room_floor,"houseId":room_houseId,"bedAmount":room_bedAmount}
rooms = pd.DataFrame(data=data,columns=["id", "number","balcony","floor","houseId","bedAmount"])
rooms.to_csv("./data/rooms.csv", index=False)

# GENERATE BED
bed_id = []
bed_number = []
bed_roomId = []
bed_bid = 0
for roomId in room_id:
    for n in range(1,5):
        bed_bid +=1
        bed_id.append(bed_bid)
        bed_roomId.append(roomId)
        bed_number.append(n)

data = {"id":bed_id,"number":bed_number,"roomId":bed_roomId}
beds = pd.DataFrame(data=data,columns=["id", "number","roomId"])
beds.to_csv("./data/beds.csv", index=False)

# GENERATE USERS
users_login = ["admin", "supervisor"]
users_password = ["admin","supervisor"]
data = {"login":users_login,"password":users_password}
users = pd.DataFrame(data=data,columns=["login", "password"])
users.to_csv("./data/users.csv", index=False)


