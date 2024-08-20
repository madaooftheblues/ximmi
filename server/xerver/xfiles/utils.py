import hashlib
from .models import ExcelFile
from django.core.exceptions import ObjectDoesNotExist

def generate_md5_hash(file_obj, chunk_size=4096):
    md5_hash = hashlib.md5()
    
    for chunk in file_obj.chunks(chunk_size):
        md5_hash.update(chunk)

    return md5_hash.hexdigest()

def file_exists(file_hash):
    try:
        ExcelFile.objects.get(hash=file_hash)
        return True
    except ObjectDoesNotExist:
        return False