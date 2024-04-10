from flask import Flask

app = Flask(__name__)

corse = require

# Houses API route
@app.route("/houses")
def houses():
    return {"houses": ["House1","House2","House3"] }


if __name__ == "__main__":
    app.run(debug=True)
