from abc import ABC, abstractmethod

class LibraryItem(ABC):
    """
    Abstract base class untuk semua item di perpustakaan.
    Class ini jadi parent untuk semua jenis item perpustakaan.
    """
    
    def __init__(self, item_id, title, year):
        self._item_id = item_id  # protected attribute
        self._title = title
        self._year = year
        self._is_borrowed = False  # private-ish attribute
    
    # Property decorator buat encapsulation
    @property
    def item_id(self):
        """Getter untuk item_id"""
        return self._item_id
    
    @property
    def title(self):
        """Getter untuk title"""
        return self._title
    
    @property
    def year(self):
        """Getter untuk year"""
        return self._year
    
    @property
    def is_borrowed(self):
        """Getter untuk status peminjaman"""
        return self._is_borrowed
    
    @is_borrowed.setter
    def is_borrowed(self, value):
        """Setter untuk status peminjaman"""
        self._is_borrowed = value
    
    @abstractmethod
    def get_info(self):
        """
        Abstract method yang harus diimplementasi oleh subclass.
        Digunakan untuk menampilkan informasi detail item.
        """
        pass
    
    @abstractmethod
    def get_type(self):
        """
        Abstract method untuk mendapatkan tipe item.
        Setiap subclass harus define tipe mereka sendiri.
        """
        pass
    
    def borrow(self):
        """Method untuk meminjam item"""
        if self._is_borrowed:
            return False
        self._is_borrowed = True
        return True
    
    def return_item(self):
        """Method untuk mengembalikan item"""
        if not self._is_borrowed:
            return False
        self._is_borrowed = False
        return True