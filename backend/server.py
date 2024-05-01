from flask import Flask, jsonify
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
    birth_date = datetime.strptime(birth_date, "%Y-%m-%d")
    today = datetime.today()
    age = (
        today.year
        - birth_date.year
        - ((today.month, today.day) < (birth_date.month, birth_date.day))
    )
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
    print(request.args.get("arrival"))
    arrival = int(request.args.get("arrival").replace("[","").replace("]",""))
    print(arrival)
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
    response = []
    for room in rooms:
        element = {}
        element["id"] = room[0]
        element["number"] = room[1]
        element["balcony"] = room[2]
        element["floor"] = room[3]
        element["houseId"] = room[4]
        element["bedAmount"] = room[5]
        response.append(element)
    db_close(connection, cursor)
    return response

@app.route("/rooms/<arrival>/<house>/<room>")
def rooms_kids(arrival,house,room):
    print("rooms_kids")
    connection, cursor = db_connect()
    print(arrival,house,room)
    cursor.execute(f"""SELECT "Client".id, C.name, C.surname, C.sex, C."birthDate",C.adress,B.number
                    FROM "Client"
                    JOIN public."Contact" C on C.id = public."Client"."contactId"
                    JOIN public."Detachment" D on D.id = "Client"."detachmentId"
                    JOIN public."Arrival" A on A.id = D."arrivalId"
                    JOIN public."Bed" B on B.id = "Client"."bedId"
                    JOIN public."Room" R on R.id = B."roomId"
                    JOIN public."House" H on H.id = R."houseId"
                    WHERE A.id={arrival} AND R.id={room}
                    """)
    kids = cursor.fetchall()
    print(kids)
    response = []
    for kid in kids:
        element = {}
        element["surname"] = kid[2]
        element["name"]= kid[1]
        element["gender"] = kid[3]
        element["birthday"] = kid[4].strftime("%d/%m/%Y")
        element["address"] = kid[5]
        element["bed"] = kid[6]
        element["id"] = kid[0]
        response.append(element)
    db_close(connection, cursor)
    return response

  
@app.route("/rooms-filter", methods=["POST"])
def rooms_filter():
    print("At rooms")
    connection, cursor = db_connect()
    data = request.get_json()
    print(data)
    house_name = data["house"]
    cursor.execute(f"SELECT \"Room\".* \
                   FROM \"Room\"\
                   INNER JOIN \"House\" ON \"Room\".\"houseId\"=\"House\".id\
                   WHERE \"House\".name = '{house_name}';")
    rooms = cursor.fetchall()
    response = []
    for room in rooms:
        element = {}
        element["id"] = room[0]
        element["number"] = room[1]
        response.append(element)
    db_close(connection, cursor)
    return response


@app.route("/houses-filter")
def houses_filer():
    connection, cursor = db_connect()
    cursor.execute('SELECT * FROM "House";')
    houses = cursor.fetchall()
    response = []
    for house in houses:
        element = {}
        element["id"] = house[0]
        element["houseName"] = house[1]
        response.append(element)
    db_close(connection, cursor)
    return response


@app.route("/address-filter")
def address_filter():
    print("At rooms")
    connection, cursor = db_connect()

    cursor.execute(f"SELECT DISTINCT \"Contact\".adress FROM \"Contact\";")
    address = cursor.fetchall()
    response = []
    for addres in address:
        element = {}
        element["name"] = addres[0]
        response.append(element)
    db_close(connection, cursor)
    return response

@app.route("/arrivals")
def get_arrivals():
    print("At arrivals")
    connection, cursor = db_connect()
    cursor.execute('SELECT "beginningDate","endDate"\
                    FROM "Arrival"\
                    ')
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

@app.route("/arrival_by_date", methods=["GET"])
def get_arrivals_by_date():
    connection, cursor = db_connect()
    date = request.args.get("arrival")
    date_obj = datetime.strptime(date, '%d/%m/%Y')

    # Extract day, month, and year
    day = date_obj.day
    month = date_obj.month
    year = date_obj.year

    cursor.execute(f"""SELECT id
                        FROM "Arrival"
                        WHERE EXTRACT(MONTH FROM "Arrival"."beginningDate") = {month}
                            AND EXTRACT(YEAR FROM "Arrival"."beginningDate") = {year}
                            AND EXTRACT(DAY FROM "Arrival"."beginningDate") = {day};
                        """)
    arrivals = cursor.fetchone()
    print(arrivals)
    return jsonify(arrivals)

@app.route("/relocate/<arrival>")
def relocate_algorithm(arrival):
    print("AT RELOCATE")
    connection, cursor = db_connect()
    cursor.execute('SELECT name FROM "House";')
    houses_names = cursor.fetchall()
    houses = []
    for house in houses_names:
        cursor.execute(f"SELECT gethousebeds('{house[0]}')")
        houses.append(House(cursor.fetchone()[0], house[0]))
    cursor.execute(f"SELECT getarrivalchildren({arrival})")
    children_db = cursor.fetchall()
    children = [
        Child(
            str(c[0].replace("(", "").replace(")", "").split(",")[0])
            + " "
            + str(c[0].replace("(", "").replace(")", "").split(",")[1]),
            calculate_age(c[0].replace("(", "").replace(")", "").split(",")[2]),
            c[0].replace("(", "").replace(")", "").split(",")[3],
            c[0].replace("(", "").replace(")", "").split(",")[4]
        )
        for c in children_db
    ]
    print([str(c.name) + " " + str(c.age) + " " + str(c.gender) for c in children])
    houses.sort(key=lambda x: x.capacity)
    boys = [c for c in children if c.gender == "m"]
    girls = [c for c in children if c.gender == "f"]
    age_b = [c.age for c in boys]

    set_numbers = list(set(age_b))
    selected_numbers = [set_numbers[0]]
    i = 0
    while i != len(set_numbers):
        k = selected_numbers[-1]
        if abs(k - set_numbers[i]) > 3:
            selected_numbers.append(set_numbers[i])
        i = i + 1

    age_groups_b = {}

    for age in selected_numbers:
        age_groups_b[age] = 0
        for a in age_b:
            if (a - age) <= 3 and (a - age) >= 0:
                age_groups_b[age] += 1
    print("boys:")
    print(age_groups_b)

    age_g = [c.age for c in girls]

    set_numbers_g = list(set(age_g))
    selected_numbers_g = [set_numbers_g[0]]
    i = 0
    while i != len(set_numbers_g):
        k = selected_numbers_g[-1]
        if abs(k - set_numbers_g[i]) > 3:
            selected_numbers_g.append(set_numbers_g[i])
        i = i + 1

    age_groups_g = {}

    for age in selected_numbers_g:
        age_groups_g[age] = 0
        for a in age_g:
            if (a - age) <= 3 and (a - age) >= 0:
                age_groups_g[age] += 1
    print("girls:")
    print(age_groups_g)

    age_groups_b = dict(sorted(age_groups_b.items(), key=lambda item: item[0]))
    age_groups_g = dict(sorted(age_groups_g.items(), key=lambda item: item[0]))

    # Set to keep track of used houses
    used_houses = set()
    unassigned_children = []


    # Iterate over the sorted age groups and find houses with corresponding capacities
    print("boys:")
    for age in age_groups_b:
        result = find_houses_with_capacity(houses, age_groups_b[age], used_houses)
        if result:
            print(
                f"Houses with total capacity {age_groups_b[age]}: {[house.name for house in result]}"
            )
            c_id=1
            cursor.execute(f"""SELECT "Client".id, "Contact".sex   
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
            print(child_id)

            for house in result:
                cursor.execute(f"""SELECT \"Bed\".id
                                 FROM \"Bed\"
                                 JOIN public.\"Room\" R on R.id = \"Bed\".\"roomId\"
                                 JOIN public.\"House\" H on H.id = R.\"houseId\"
                                 WHERE H.name = '{house.name}'""")
                bed_ids = cursor.fetchall()
                for j in range(len(bed_ids)):
                    if c_id==len(child_id):
                        break
                    cursor.execute(f"""UPDATE "Client"
                                        SET "bedId"={bed_ids[j][0]}
                                        WHERE id={child_id[c_id][0]};
                                  """)
                    connection.commit()
                    print(f"ID: {child_id[c_id][0]} MOVED TO {house.name}")
                    c_id = c_id+1
                if c_id==len(child_id):
                    break
            
            unassigned_children.extend(children[c_id:])


        else:
            print(
                f"No combination of houses found with total capacity {age_groups_b[age]}."
            )
            unassigned_children.extend(children[c_id:])

    print("girls:")
    for age in age_groups_g:
        result = find_houses_with_capacity(houses, age_groups_g[age], used_houses)
        if result:
            print(
                f"Houses with total capacity {age_groups_g[age]}: {[house.name for house in result]}"
            )
            c_id=1
            for house in result:
                cursor.execute(f"""SELECT \"Bed\".id
                                 FROM \"Bed\"
                                 JOIN public.\"Room\" R on R.id = \"Bed\".\"roomId\"
                                 JOIN public.\"House\" H on H.id = R.\"houseId\"
                                 WHERE H.name = '{house.name}'""")
                bed_ids = cursor.fetchall()
                cursor.execute(f"""SELECT "Client".id  
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
                for j in range(len(bed_ids)):
                    if c_id==len(child_id):
                        break
                    cursor.execute(f"""UPDATE "Client"
                                        SET "bedId"={bed_ids[j][0]}
                                        WHERE id={child_id[c_id][0]};
                                  """)
                    print(f"ID: {child_id[c_id][0]} MOVED TO {house.name}")
                    connection.commit()
                    c_id +=1
                if c_id==len(child_id):
                    break
            
            unassigned_children.extend(children[c_id:])

        else:
            print(
                f"No combination of houses found with total capacity {age_groups_g[age]}."
            )
            unassigned_children.extend(children[c_id:])
    connection.commit()

    if unassigned_children:
        # Get all free beds
        cursor.execute(
        """
        SELECT "Bed".id, R.number, H.name
        FROM "Bed"
        JOIN public."Room" R on R.id = "Bed"."roomId"
        JOIN public."House" H on H.id = R."houseId"
        WHERE "Bed".id NOT IN (
            SELECT "bedId"
            FROM "Client"
            JOIN public."Detachment" D ON D.id = "Client"."detachmentId"
            JOIN public."Arrival" A ON A.id = D."arrivalId"
            WHERE A.id = %s
        );
        """,
        (arrival,)
        )

        free_beds = cursor.fetchall()
        # Iterate over unassigned children and free beds
        for child, bed in zip(unassigned_children, free_beds):
            print("child " + str(child.id) + " was relocated to " + str(bed[0]))
            cursor.execute(f"""UPDATE "Client" SET "bedId"={bed[0]} WHERE id={child.id}""")
            connection.commit()

    cursor.execute('SELECT id, "bedId" FROM "Client";')
    clients = cursor.fetchall()
    response = []
    for c in clients:
        response.append({"id": c[0], "bedId": c[1]})
    connection.commit()
    db_close(connection, cursor)
    return response


@app.route("/login", methods=["POST"])
def login():
    connection, cursor = db_connect()
    login = request.json.get("login")
    password = request.json.get("password")

    cursor.execute('SELECT "Users".password FROM "Users" WHERE login = %s', (login,))
    result = cursor.fetchone()
    print(login)
    print(password)
    if result and result[0] == password:
        # Authentication successful
        db_close(connection, cursor)
        return jsonify({"message": "Login successful"}), 200
    else:
        # Authentication failed
        db_close(connection, cursor)
        return jsonify({"message": "Invalid credentials"}), 401


@app.route("/child/<id>", methods=["GET"])
def child(id):
    connection, cursor = db_connect()
    cursor.execute(
        """
            SELECT "Client".id as id, C.name as name, C.surname as surname,"birthDate" as birthdate, sex,
                   "phoneNumber", C.adress, "Client".alergy, preferences, H.name as house_name, R.number as room_number,
                   B.number as bed_number
            FROM "Client"
            JOIN public."Contact" C on C.id = "Client"."contactId"
            JOIN public."Bed" B on B.id = "Client"."bedId"
            JOIN public."Room" R on R.id = B."roomId"
            JOIN public."House" H on H.id = R."houseId"
            WHERE "Client".id = %s
        """,
        (id),
    )
    client_info = cursor.fetchone()
    return jsonify(client_info)


@app.route("/supervisor/<id>", methods=["GET"])
def supervisor(id):
    connection, cursor = db_connect()
    cursor.execute(
        """
            SELECT "Supervisor".id as id, C.name as name, C.surname as surname,"birthDate" as birthdate, sex,
            "phoneNumber", C.adress, "Supervisor".education
            FROM "Supervisor"
            JOIN public."Contact" C on C.id = "Supervisor"."contactId"
            WHERE "Supervisor".id = 1
        """,
        (id),
    )
    supervisor_info = cursor.fetchone()
    db_close(connection, cursor)
    return jsonify(supervisor_info)


@app.route("/allchildren/<id>", methods=["POST"])
def allchildren(id):
    connection, cursor = db_connect()
    data = request.get_json()
    print(data)
    gender_filter = data["gender_filter"] if "gender_filter" in data.keys() and data["gender_filter"]!='' else None
    age_filter = data["age_filter"] if "age_filter" in data.keys() and data["age_filter"]!='' else None
    address_filter = data["address_filter"] if "address_filter" in data.keys() and data["address_filter"]!='' else None
    house_filter = data["house_filter"] if "house_filter" in data.keys() and data["house_filter"]!='' else None
    room_filter = data["room_filter"] if "room_filter" in data.keys() and data["room_filter"]!='' else None
    surname_filter = data["surname_filter"] if "surname_filter" in data.keys() and data["surname_filter"]!='' else None
    print(data)
    query = """ 
    SELECT "Client".id as id, C.name as name, C.surname as surname,"birthDate" as birthdate, sex,
           C."phoneNumber", C.adress, "Client".alergy, preferences, H.name as house_name, R.number as room_number,
           B.number as bed_number
    FROM "Client"
    JOIN public."Contact" C ON C.id = "Client"."contactId"
    JOIN public."Bed" B ON B.id = "Client"."bedId"
    JOIN public."Room" R ON R.id = B."roomId"
    JOIN public."House" H ON H.id = R."houseId"
    JOIN public."Detachment" D ON D.id = "detachmentId"
    JOIN public."Arrival" A ON A.id = D."arrivalId"
    WHERE A.id = %s
    """

    # Add optional filters if they are not NULL
    filter_values = [id]
    if gender_filter is not None:
        query += " AND (sex = %s)"
        filter_values.append(gender_filter)
    if age_filter is not None:
        query += " AND (EXTRACT(YEAR FROM AGE(C.\"birthDate\")) >= %s) AND (EXTRACT(YEAR FROM AGE(C.\"birthDate\")) <= %s)"
        filter_values.append(age_filter)
        filter_values.append(str(int(age_filter)+3))
    if address_filter is not None:
        query += " AND (EXTRACT(YEAR FROM AGE(C.\"birthDate\")) <= %s)"
        filter_values.append(age_filter)
    if address_filter is not None:
        query += " AND (C.adress ILIKE %s)"
        filter_values.append('%' + address_filter + '%')
    if house_filter is not None:
        query += " AND (H.name ILIKE %s)"
        filter_values.append('%' + house_filter + '%')
    if room_filter is not None:
        query += " AND (R.number = %s)"
        filter_values.append(room_filter)
    if surname_filter is not None:
        query += " AND (C.surname ILIKE %s)"
        filter_values.append('%' + surname_filter + '%')


    # Execute the query with filter values
    cursor.execute(query, filter_values)
    children = cursor.fetchall()

    response = []
    for child in children:
        r = {}
        r["id"] = child[0]
        r["name"] = child[1]
        r["surname"] = child[2]
        r["birthday"] = child[3].strftime("%Y %B %d")
        r["gender"] = child[4]
        r["phone_number"] = child[5]
        r["address"] = child[6]
        r["allergy"] = child[7]
        r["preferences"] = child[8]
        r["house"] = child[9]
        r["room"] = child[10]
        r["bed"] = child[11]
        response.append(r)
    db_close(connection, cursor)
    return response


@app.route("/allsupervisers/<id>", methods=["POST"]) # TODO: do it
def allsupervisers(id):
    connection, cursor = db_connect()
    data = request.get_json()
    print(data)
    gender_filter = data["gender_filter"] if "gender_filter" in data.keys() and data["gender_filter"]!='' else None
    age_filter = data["age_filter"] if "age_filter" in data.keys() and data["age_filter"]!='' else None
    address_filter = data["address_filter"] if "address_filter" in data.keys() and data["address_filter"]!='' else None
    surname_filter = data["surname_filter"] if "surname_filter" in data.keys() and data["surname_filter"]!='' else None    
    print(data)
    query = """ 
    SELECT "Supervisor".id as id, C.name as name, C.surname as surname,"birthDate" as birthdate, sex,
           C."phoneNumber", C.adress
    FROM "Supervisor"
    JOIN public."Contact" C ON C.id = "Supervisor"."contactId"
    JOIN public."Detachment" D ON D.id = "detachmentId"
    JOIN public."Arrival" A ON A.id = D."arrivalId"
    WHERE A.id = %s
    """

    # Add optional filters if they are not NULL
    filter_values = [id]
    if gender_filter is not None:
        query += " AND (sex = %s)"
        filter_values.append(gender_filter)
    if age_filter is not None:
        query += " AND (EXTRACT(YEAR FROM AGE(C.\"birthDate\")) >= %s) AND (EXTRACT(YEAR FROM AGE(C.\"birthDate\")) <= %s)"
        filter_values.append(age_filter)
        filter_values.append(str(int(age_filter)+3))
    if address_filter is not None:
        query += " AND (C.adress ILIKE %s)"
        filter_values.append('%' + address_filter + '%')
    if surname_filter is not None:
        query += " AND (C.surname ILIKE %s)"
        filter_values.append('%' + surname_filter + '%')

    # Execute the query with filter values
    cursor.execute(query, filter_values)
    supervisors = cursor.fetchall()
    print(supervisors)
    response = []
    for supervisor in supervisors:
        r = {}
        r["id"] = supervisor[0]
        r["name"] = supervisor[1]
        r["surname"] = supervisor[2]
        r["birthday"] = (supervisor[3]).strftime("%Y %B %d")
        r["gender"] = supervisor[4]
        r["phone_number"] = supervisor[5]
        r["address"] = supervisor[6]
        response.append(r)
    db_close(connection, cursor)
    return response

@app.route("/free_bed/<arrival>")
def free_bed(arrival):
    connection, cursor = db_connect()
    cursor.execute(
        """
            SELECT "Bed".id, R.number, H.name
            FROM "Bed"
            JOIN public."Room" R on R.id = "Bed"."roomId"
            JOIN public."House" H on H.id = R."houseId"
            WHERE "Bed".id NOT IN (
                SELECT "bedId"
                FROM "Client"
                JOIN public."Detachment" D ON D.id = "Client"."detachmentId"
                JOIN public."Arrival" A ON A.id = D."arrivalId"
                WHERE A.id = %s
            );
        """,
        (arrival),
    )
    free_beds = cursor.fetchall()
    response = []
    for bed in free_beds:
        r = {}
        r["bed"] = bed[0]
        r["room"] = bed[1]
        r["house"] = bed[2]
       
        response.append(r)
    return jsonify(response)



if __name__ == "__main__":
    app.run(debug=True)

