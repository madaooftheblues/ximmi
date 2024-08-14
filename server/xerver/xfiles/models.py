from django.db import models
import os

class ExcelFile(models.Model):
    file = models.FileField(upload_to='excel_files/')
    name = models.CharField(max_length=255)
    size = models.IntegerField()
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def delete(self, *args, **kwargs):
        # Delete the file from the filesystem
        if self.file:
            file_path = self.file.path
            if os.path.isfile(file_path):
                os.remove(file_path)
        # Delete the model instance
        super().delete(*args, **kwargs)
