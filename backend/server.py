from flask import Flask
from flask_cors import CORS
import psycopg2
from flask import request
from models import House, Child
from config import host, user, password, db_name
from datetime import datetime
from itertools import combinations

app = Flask(__name__)

cors = CORS(app)


def find_houses_with_capacity(houses, target_capacity, used_houses=set()):
    # Iterate over all possible combinations of houses
    for i in range(1, len(houses) + 1):
        for combination in combinations(houses, i):
            # Check if any house in the combination has already been used
            if any(house in used_houses for house in combination):
                continue
            
            # Calculate the total capacity of the combination of houses
            total_capacity = sum(house.capacity for house in combination)
            if total_capacity >= target_capacity:
                # Update the set of used houses
                used_houses.update(combination)
                return combination  # Return the combination if the total capacity is sufficient
    return None  # Return None if no combination is found


def calculate_age(birth_date):
    birth_date = datetime.strptime(birth_date, '%Y-%m-%d')
    today = datetime.today()
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
    return age


# DONT FORGET TO USE COMMITS IN CONNECTION
def db_connect():
    try:
        connection = psycopg2.connect(
            host=host, user=user, password=password, database=db_name
        )
        cursor = connection.cursor()
        return connection, cursor
    except Exception as _ex:
        print("[INFO] Error while working with PostgreSQL ", _ex)
        raise ValueError("[ERROR]Couldn't connect to the database, problem: ", _ex)


def db_close(connection, cursor):
    if cursor:
        cursor.close()
        print("[INFO] PostgreSQL cursor closed")
    if connection:
        connection.close()
        print("[INFO] PostgreSQL connection closed")


@app.route("/houses")
def houses():
    connection, cursor = db_connect()
    cursor.execute('SELECT * FROM "House";')
    houses = cursor.fetchall()
    arrival = request.args.get("arrival")
    response = []
    for house in houses:
        element = {}
        element["id"] = house[0]
        element["houseName"] = house[1]
        element["img"] = (
            "https://a0.muscache.com/im/pictures/21f1bd4d-cac0-47a0-84d3-a6413f675003.jpg?im_w=1200"
        )
        cursor.execute(f"SELECT * FROM gethousebeds('{house[1]}')")
        element["housePlaces"] = cursor.fetchone()[0]
        cursor.execute(f"SELECT * FROM gethouseresidents({arrival},'{house[1]}')")
        response.append(element)
    db_close(connection, cursor)
    return response


@app.route("/rooms")
def rooms():
    print("At rooms")
    connection, cursor = db_connect()
    house_id = request.args.get("house")
    cursor.execute(f'SELECT "Room".* \
                   FROM "Room"\
                   INNER JOIN "House" ON "Room"."houseId"="House".id\
                   WHERE "House".id = {house_id};')
    rooms = cursor.fetchall()
    arrival = request.args.get("arrival")
    print(rooms)
    return rooms


@app.route("/arrivals")
def get_arrivals():
    print("At arrivals")
    connection, cursor = db_connect()
    year = request.args.get("year")
    year = 2024  # temporary
    cursor.execute(f'SELECT "beginningDate","endDate"\
                    FROM "Arrival"\
                    WHERE EXTRACT(YEAR FROM "beginningDate") = {year}')
    arrivals = cursor.fetchall()
    print(arrivals)
    response = []
    for arrival in arrivals:
        element = {}
        element["beginningDate"] = arrival[0].strftime("%d/%m/%Y")
        element["endDate"] = arrival[1].strftime("%d/%m/%Y")
        response.append(element)
    db_close(connection, cursor)
    return response


@app.route("/relocate")
def relocate_algorithm():
    arrival = 1
    connection, cursor = db_connect()
    cursor.execute('SELECT name FROM "House";')
    houses_names = cursor.fetchall()
    houses = []
    for house in houses_names:
        cursor.execute(f"SELECT gethousebeds('{house[0]}')")
        houses.append(House(cursor.fetchone()[0], house[0]))    
    cursor.execute(f"SELECT getarrivalchildren({arrival})")
    children_db = cursor.fetchall()

    children = [Child(str(c[0].replace("(","").replace(")","").split(",")[0])+ " " + str(c[0].replace("(","").replace(")","").split(",")[1]),calculate_age(c[0].replace("(","").replace(")","").split(",")[2]),c[0].replace("(","").replace(")","").split(",")[3]) for c in children_db]
    print([str(c.name) + " " + str(c.age) + " " + str(c.gender) for c in children])
    houses.sort(key=lambda x: x.capacity)
    boys = [c for c in children if c.gender == "m"]
    girls = [c for c in children if c.gender == "f"]
    age_b = [c.age for c in boys]

    set_numbers = list(set(age_b))
    selected_numbers = [set_numbers[0]]
    i = 0 
    while i!=len(set_numbers):
        k = selected_numbers[-1]
        if abs(k-set_numbers[i])>3:
            selected_numbers.append(set_numbers[i])
        i=i+1
    
    age_groups_b = {}

    for age in selected_numbers:
        age_groups_b[age]=0
        for a in age_b:
            if (a-age)<=3 and (a-age)>=0:
                age_groups_b[age] += 1
    print("boys:")
    print(age_groups_b)

    age_g = [c.age for c in girls]

    set_numbers_g = list(set(age_g))
    selected_numbers_g = [set_numbers_g[0]]
    i = 0 
    while i!=len(set_numbers_g):
        k = selected_numbers_g[-1]
        if abs(k-set_numbers_g[i])>3:
            selected_numbers_g.append(set_numbers_g[i])
        i=i+1
    
    age_groups_g = {}

    for age in selected_numbers_g:
        age_groups_g[age]=0
        for a in age_g:
            if (a-age)<=3 and (a-age)>=0:
                age_groups_g[age] += 1
    print("girls:")
    print(age_groups_g)

    age_groups_b = dict(sorted(age_groups_b.items(), key=lambda item: item[0]))
    age_groups_g = dict(sorted(age_groups_g.items(), key=lambda item: item[0]))

    # Set to keep track of used houses
    used_houses = set()

    # Iterate over the sorted age groups and find houses with corresponding capacities
    print("boys:")
    for age in age_groups_b:
        result = find_houses_with_capacity(houses, age_groups_b[age], used_houses)
        if result:
            print(f"Houses with total capacity {age_groups_b[age]}: {[house.name for house in result]}")
            for house in result:

                cursor.execute( f"""SELECT \"Bed\".id
                                 FROM \"Bed\"
                                 JOIN public.\"Room\" R on R.id = \"Bed\".\"roomId\"
                                 JOIN public.\"House\" H on H.id = R.\"houseId\"
                                 WHERE H.name = '{house.name}'""")
                bed_ids = cursor.fetchall()
                cursor.execute( f"""SELECT "Client".id  
                                    FROM "Client"
                                    INNER JOIN "Contact" ON "Client"."contactId" = "Contact".id
                                    INNER JOIN "Detachment" ON "Client"."detachmentId" = "Detachment".id
                                    INNER JOIN "Arrival" ON "Detachment"."arrivalId" = "Arrival".id
                                    WHERE "Contact".sex = 'm'
                                    AND "Arrival".id = {arrival}
                                    AND EXTRACT(YEAR FROM AGE("Contact"."birthDate")) - {age} <= 3
                                    AND EXTRACT(YEAR FROM AGE("Contact"."birthDate")) - {age} >=0;
                                """)
                child_id = cursor.fetchall()
                for i in range(len(child_id)):
                    cursor.execute( f"""UPDATE "Client"
                                        SET "bedId"={bed_ids[i][0]}
                                        WHERE id={child_id[i][0]};
                                  """)
                connection.commit()

        else:
            print(f"No combination of houses found with total capacity {age_groups_b[age]}.")
    print("girls:")
    for age in age_groups_g:
        result = find_houses_with_capacity(houses, age_groups_g[age], used_houses)
        if result:
            print(f"Houses with total capacity {age_groups_g[age]}: {[house.name for house in result]}")
            for house in result:

                cursor.execute( f"""SELECT \"Bed\".id
                                 FROM \"Bed\"
                                 JOIN public.\"Room\" R on R.id = \"Bed\".\"roomId\"
                                 JOIN public.\"House\" H on H.id = R.\"houseId\"
                                 WHERE H.name = '{house.name}'""")
                bed_ids = cursor.fetchall()
                cursor.execute( f"""SELECT "Client".id  
                                    FROM "Client"
                                    INNER JOIN "Contact" ON "Client"."contactId" = "Contact".id
                                    INNER JOIN "Detachment" ON "Client"."detachmentId" = "Detachment".id
                                    INNER JOIN "Arrival" ON "Detachment"."arrivalId" = "Arrival".id
                                    WHERE "Contact".sex = 'f'
                                    AND "Arrival".id = {arrival}
                                    AND EXTRACT(YEAR FROM AGE("Contact"."birthDate")) - {age} <= 3
                                    AND EXTRACT(YEAR FROM AGE("Contact"."birthDate")) - {age} >=0;
                                """)
                child_id = cursor.fetchall()
                for i in range(len(child_id)):
                    cursor.execute( f"""UPDATE "Client"
                                        SET "bedId"={bed_ids[i][0]}
                                        WHERE id={child_id[i][0]};
                                  """)
                connection.commit()

        else:
            print(f"No combination of houses found with total capacity {age_groups_g[age]}.")
    cursor.execute('SELECT id, "bedId" FROM "Client";')
    clients = cursor.fetchall()
    response = []
    for c in clients:
        response.append({"id": c[0], "bedId": c[1]})
    db_close(connection, cursor)
    return response

if __name__ == "__main__":
    app.run(debug=True)
