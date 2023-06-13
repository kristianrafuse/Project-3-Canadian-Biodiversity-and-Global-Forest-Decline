import csv
from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route("/")
def welcome():
    return render_template("index.html")

@app.route("/api")
def api():
    csv_file_paths = [
        "Project-3/Resources/birds.csv",
        "Project-3/Resources/forests_df_percent.csv",
        "Project-3/Resources/forests_df_total.csv",
        "Project-3/Resources/national.csv",
        "Project-3/Resources/regional.csv",
        "Project-3/Resources/selected.csv",
        "Project-3/Resources/species_percent.csv",
        "Project-3/Resources/species.csv"
    ]

    data = {}

    for csv_file_path in csv_file_paths:
        try:
            with open(csv_file_path, "r", encoding="utf-8") as csv_file:
                csv_data = list(csv.DictReader(csv_file))
            filename = csv_file_path.split("/")[-1].split(".")[0]  # Extract the filename without extension
            data[filename] = {"csv_data": csv_data}
        except FileNotFoundError:
            return jsonify({"error": f"CSV file not found: {csv_file_path}"})

    return jsonify(data)

if __name__ == "__main__":
    app.run()