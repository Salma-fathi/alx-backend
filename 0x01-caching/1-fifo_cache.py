#!/usr/bin/env python3
"""FIFO caching"""

from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """FIFO cache class"""

    def __init__(self):
        """Constructor"""
        super().__init__()
        self.queue = []

    def put(self, key, item):
        """Add an item in the cache"""
        if key is None or item is None:
            return
        if key in self.cache_data:
            self.cache_data[key] = item
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            discard = self.queue.pop(0)
            del self.cache_data[discard]
            print("DISCARD: " + discard)
        self.cache_data[key] = item
        self.queue.append(key)

    def get(self, key):
        """Get an item by key"""
        return self.cache_data.get(key, None)
