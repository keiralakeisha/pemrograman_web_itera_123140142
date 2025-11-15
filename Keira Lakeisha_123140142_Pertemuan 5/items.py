from library_item import LibraryItem

class Book(LibraryItem):
    """
    Class Book yang inherit dari LibraryItem.
    Represent buku di perpustakaan dengan atribut tambahan author dan pages.
    """
    
    def __init__(self, item_id, title, year, author, pages):
        super().__init__(item_id, title, year)
        self.__author = author  # private attribute
        self.__pages = pages
    
    @property
    def author(self):
        """Getter untuk author"""
        return self.__author
    
    @property
    def pages(self):
        """Getter untuk pages"""
        return self.__pages
    
    # Implementasi abstract method dari parent class
    def get_info(self):
        """Override method get_info untuk Book"""
        status = "Dipinjam" if self._is_borrowed else "Tersedia"
        return f"""
{'='*50}
ID           : {self._item_id}
Judul        : {self._title}
Penulis      : {self.__author}
Tahun        : {self._year}
Halaman      : {self.__pages}
Status       : {status}
{'='*50}
"""
    
    def get_type(self):
        """Return tipe item"""
        return "Buku"
    
    def get_summary(self):
        """Method khusus untuk Book"""
        return f"{self._title} oleh {self.__author} ({self._year})"


class Magazine(LibraryItem):
    """
    Class Magazine yang inherit dari LibraryItem.
    Represent majalah dengan atribut edition dan publisher.
    """
    
    def __init__(self, item_id, title, year, edition, publisher):
        super().__init__(item_id, title, year)
        self.__edition = edition  # private attribute
        self.__publisher = publisher
    
    @property
    def edition(self):
        """Getter untuk edition"""
        return self.__edition
    
    @property
    def publisher(self):
        """Getter untuk publisher"""
        return self.__publisher
    
    # Implementasi abstract method dari parent class
    def get_info(self):
        """Override method get_info untuk Magazine"""
        status = "Dipinjam" if self._is_borrowed else "Tersedia"
        return f"""
{'='*50}
ID           : {self._item_id}
Judul        : {self._title}
Edisi        : {self.__edition}
Penerbit     : {self.__publisher}
Tahun        : {self._year}
Status       : {status}
{'='*50}
"""
    
    def get_type(self):
        """Return tipe item"""
        return "Majalah"
    
    def get_summary(self):
        """Method khusus untuk Magazine"""
        return f"{self._title} Edisi {self.__edition} - {self.__publisher}"