from django.urls import path
from . import views

urlpatterns = [
    path('files', views.list_files),
    path('upload', views.upload_file),
    path('columns/<int:file_id>/', views.get_columns),
    path('data/', views.get_data),
    path('convert-excel-to-csv/<int:pk>/', views.convert_excel_to_csv, name='convert-excel-to-csv'),
]