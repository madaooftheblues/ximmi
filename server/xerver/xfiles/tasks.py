from .db_connection import get_mongo_db
from celery import shared_task
import csv
import io
from openpyxl import load_workbook


@shared_task
def insert_data_to_mongodb(data):
    try:
        db = get_mongo_db()
        collection = db['test']
        collection.insert_one(data)
        print("Data inserted successfully into MongoDB!")
    except Exception as e:
        print(f"An error occurred while inserting data into MongoDB: {e}")

@shared_task
def excel_to_csv(excel_file):
    # Load the Excel file
    wb = load_workbook(excel_file.file.path)
    sheet = wb.active

    # Create a CSV file in memory
    csv_buffer = io.StringIO()
    csv_writer = csv.writer(csv_buffer)

    # Write data from Excel to CSV
    for row in sheet.iter_rows(values_only=True):
        csv_writer.writerow(row)
    
    return csv_buffer