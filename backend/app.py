from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app) 

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="srinivas",
        password="agile123",
        database="fsit_sales_database"
    )

@app.route('/api/employees', methods=['GET'])
def get_employees():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT 
            e.employeeNumber, e.lastName, e.firstName, e.extension, e.email, e.officeCode, e.jobTitle, 
            o.city, o.phone,
            e.reportsTo, r.lastName AS reportToLastName, r.firstName AS reportToFirstName
        FROM employees e
        LEFT JOIN employees r ON e.reportsTo = r.employeeNumber
        LEFT JOIN offices o ON e.officeCode = o.officeCode
    """)

    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify({"data": rows})

if __name__ == '__main__':
    app.run(debug=True)
