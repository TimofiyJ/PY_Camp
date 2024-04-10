from flask import Flask
from flask_cors import CORS
import psycopg2
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
    print(houses[0])
    response = []
    for house in houses:
        element = {}
        element["id"] = house[0]
        element["houseName"] = house[1]
        element["img"] = "https://a0.muscache.com/im/pictures/21f1bd4d-cac0-47a0-84d3-a6413f675003.jpg?im_w=1200"
        element["housePlaces"] = 21
        response.append(element)
    db_close(connection, cursor)
    return response


if __name__ == "__main__":
    app.run(debug=True)
