class Library:
    """
    Class untuk manage seluruh koleksi perpustakaan.
    Nerapin encapsulation buat protect data koleksi.
    """
    
    def __init__(self, name):
        self.__name = name  # private attribute
        self.__items = []   # private list untuk nyimpen semua item
    
    @property
    def name(self):
        """Getter untuk nama perpustakaan"""
        return self.__name
    
    @property
    def total_items(self):
        """Getter untuk total item di perpustakaan"""
        return len(self.__items)
    
    def add_item(self, item):
        """
        Menambahkan item ke perpustakaan.
        Cek dulu apakah ID sudah ada atau belum.
        """
        # Cek apakah ID sudah ada
        for existing_item in self.__items:
            if existing_item.item_id == item.item_id:
                print(f"\n❌ Item dengan ID {item.item_id} sudah ada!")
                return False
        
        self.__items.append(item)
        print(f"\n✅ {item.get_type()} '{item.title}' berhasil ditambahkan!")
        return True
    
    def display_all_items(self):
        """Menampilkan semua item yang ada di perpustakaan"""
        if not self.__items:
            print("\n📚 Perpustakaan masih kosong.")
            return
        
        print(f"\n{'='*60}")
        print(f"DAFTAR KOLEKSI {self.__name.upper()}")
        print(f"{'='*60}")
        print(f"Total Item: {len(self.__items)}\n")
        
        for idx, item in enumerate(self.__items, 1):
            status = "🔴 Dipinjam" if item.is_borrowed else "🟢 Tersedia"
            print(f"{idx}. [{item.get_type()}] {item.title} - {status}")
        print(f"{'='*60}\n")
    
    def search_by_title(self, title):
        """
        Mencari item berdasarkan judul.
        Pakai case-insensitive search biar lebih fleksibel.
        """
        results = []
        title_lower = title.lower()
        
        for item in self.__items:
            if title_lower in item.title.lower():
                results.append(item)
        
        return results
    
    def search_by_id(self, item_id):
        """Mencari item berdasarkan ID"""
        for item in self.__items:
            if item.item_id == item_id:
                return item
        return None
    
    def display_search_results(self, results):
        """Helper method untuk display hasil pencarian"""
        if not results:
            print("\n❌ Item tidak ditemukan.")
            return
        
        print(f"\n🔍 Ditemukan {len(results)} item:")
        for item in results:
            print(item.get_info())
    
    def borrow_item(self, item_id):
        """Method untuk meminjam item"""
        item = self.search_by_id(item_id)
        
        if not item:
            print(f"\n❌ Item dengan ID {item_id} tidak ditemukan!")
            return False
        
        if item.borrow():
            print(f"\n✅ Berhasil meminjam: {item.title}")
            return True
        else:
            print(f"\n❌ Item '{item.title}' sedang dipinjam!")
            return False
    
    def return_item(self, item_id):
        """Method untuk mengembalikan item"""
        item = self.search_by_id(item_id)
        
        if not item:
            print(f"\n❌ Item dengan ID {item_id} tidak ditemukan!")
            return False
        
        if item.return_item():
            print(f"\n✅ Berhasil mengembalikan: {item.title}")
            return True
        else:
            print(f"\n❌ Item '{item.title}' tidak sedang dipinjam!")
            return False
    
    def get_available_items(self):
        """Mendapatkan semua item yang tersedia (belum dipinjam)"""
        return [item for item in self.__items if not item.is_borrowed]
    
    def get_borrowed_items(self):
        """Mendapatkan semua item yang sedang dipinjam"""
        return [item for item in self.__items if item.is_borrowed]