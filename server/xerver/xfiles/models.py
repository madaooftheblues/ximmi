from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os

class ExcelFile(models.Model):
    file = models.FileField(upload_to='excel_files/')
    name = models.CharField(max_length=255)
    size = models.IntegerField()
    uploaded_at = models.DateTimeField(auto_now_add=True)
    hash = models.CharField(max_length=32)

@receiver(post_delete, sender=ExcelFile)
def delete_file_on_delete(sender, instance, **kwargs):
    if instance.file:
        if os.path.isfile(instance.file.path):
            os.remove(instance.file.path)
