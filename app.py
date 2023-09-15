from flask import Flask, jsonify, render_template
from sqlalchemy import create_engine
import os

app = Flask(__name__)

# Connection details
username = os.environ.get('DB_USERNAME')
password = os.environ.get('DB_PASSWORD')
host = os.environ.get('DB_HOST')
database = os.environ.get('DB_NAME')

# Create the database URL
url = f'postgresql://{username}:{password}@{host}/{database}'

# Create the engine
engine = create_engine(url)

@app.route("/")
def welcome():
    return render_template("index.html")

@app.route("/api")
def api():
    data = {}

    # Loop through the table names
    table_names = ["birds", "forests_df_percent", "forests_df_total", "national", "regional", "selected", "species_percent", "species"]
    for table_name in table_names:
        try:
            # Execute a select query on each table
            query = f"SELECT * FROM {table_name}"
            result = engine.execute(query)
            # Fetch all rows and convert to a list of dictionaries
            rows = result.fetchall()
            columns = result.keys()
            table_data = [dict(zip(columns, row)) for row in rows]
            data[table_name] = {"csv_data": table_data}
        except Exception as e:
            return jsonify({"error": f"An error occurred while fetching data from the table {table_name}: {str(e)}"})

    return jsonify(data)

if __name__ == "__main__":
    app.run()

# import csv
# from flask import Flask, jsonify, render_template

# app = Flask(__name__)

# @app.route("/")
# def welcome():
#     return render_template("index.html")

# @app.route("/api")
# def api():
#     csv_file_paths = [
#         "Resources/birds.csv",
#         "Resources/forests_df_percent.csv",
#         "Resources/forests_df_total.csv",
#         "Resources/national.csv",
#         "Resources/regional.csv",
#         "Resources/selected.csv",
#         "Resources/species_percent.csv",
#         "Resources/species.csv"
#     ]

#     data = {}

# # Loop through the csvs, read as a dictionary, grab a name based on file name and path, remove directory and path, exort to data to jsonify

#     for csv_file_path in csv_file_paths:
#         try:
#             with open(csv_file_path, "r", encoding="utf-8") as csv_file:
#                 csv_data = list(csv.DictReader(csv_file))
#             filename = csv_file_path.split("/")[-1].split(".")[0]
#             data[filename] = {"csv_data": csv_data}
#         except FileNotFoundError:
#             return jsonify({"error": f"CSV file not found: {csv_file_path}"})

#     return jsonify(data)

# if __name__ == "__main__":
#     app.run()
