from flask import Flask
from flask_cors import CORS
import psycopg2
from flask import request

from config import host, user, password, db_name

app = Flask(__name__)

cors = CORS(app)


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


# Houses API route
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


# Rooms API route
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


# Rooms API route
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


if __name__ == "__main__":
    app.run(debug=True)
