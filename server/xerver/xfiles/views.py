from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import ExcelFile
import pandas as pd

@api_view(['POST'])
def upload_file(request):
    if request.method == 'POST':
        file = request.FILES['file']
        excel_file = ExcelFile.objects.create(
            file=file,
            name=file.name,
            size=file.size
        )
        return Response({'id': excel_file.id, 'name': excel_file.name})

@api_view(['GET'])
def list_files(request):
    files = ExcelFile.objects.all().values('id', 'name', 'size', 'uploaded_at')
    return Response(list(files))

@api_view(['GET'])
def get_columns(request, file_id):
    excel_file = ExcelFile.objects.get(id=file_id)
    df = pd.read_excel(excel_file.file.path)
    columns = df.columns.tolist()
    return Response({'columns': columns})

@api_view(['POST'])
def get_data(request):
    excel_file = ExcelFile.objects.get(id=request.data.get('id'))
    selected_columns = request.data.get('columns')
    df = pd.read_excel(excel_file.file.path, usecols=selected_columns)
    df = df.fillna('')
    records = df.to_dict('records')
    return Response({'records': records})