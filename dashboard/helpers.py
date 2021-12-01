import os
from django.conf import settings

def split_every(iterable, size=1000):
    """
    Split the list into chunks
    """
    iterableLength = len(iterable)
    for idx in range(0, iterableLength, size):
        idx_leap = idx + size
        if idx+size > iterableLength:
            idx_leap = iterableLength
        print(idx_leap)
        yield iterable[idx:idx_leap] 