from items import Book, Magazine
from library import Library

def display_menu():
    """Menampilkan menu utama"""
    print("\n" + "="*60)
    print("          SISTEM MANAJEMEN PERPUSTAKAAN")
    print("="*60)
    print("1. Tambah Buku")
    print("2. Tambah Majalah")
    print("3. Tampilkan Semua Item")
    print("4. Cari Item berdasarkan Judul")
    print("5. Cari Item berdasarkan ID")
    print("6. Pinjam Item")
    print("7. Kembalikan Item")
    print("8. Lihat Item Tersedia")
    print("9. Lihat Item Dipinjam")
    print("0. Keluar")
    print("="*60)

def add_book(library):
    """Function untuk menambah buku"""
    print("\n--- TAMBAH BUKU BARU ---")
    item_id = input("ID Buku: ").strip()
    title = input("Judul: ").strip()
    author = input("Penulis: ").strip()
    
    while True:
        try:
            year = int(input("Tahun Terbit: "))
            pages = int(input("Jumlah Halaman: "))
            break
        except ValueError:
            print("❌ Input harus berupa angka!")
    
    book = Book(item_id, title, year, author, pages)
    library.add_item(book)

def add_magazine(library):
    """Function untuk menambah majalah"""
    print("\n--- TAMBAH MAJALAH BARU ---")
    item_id = input("ID Majalah: ").strip()
    title = input("Judul: ").strip()
    edition = input("Edisi: ").strip()
    publisher = input("Penerbit: ").strip()
    
    while True:
        try:
            year = int(input("Tahun Terbit: "))
            break
        except ValueError:
            print("❌ Input harus berupa angka!")
    
    magazine = Magazine(item_id, title, year, edition, publisher)
    library.add_item(magazine)

def search_by_title(library):
    """Function untuk search berdasarkan judul"""
    print("\n--- CARI BERDASARKAN JUDUL ---")
    title = input("Masukkan judul yang dicari: ").strip()
    results = library.search_by_title(title)
    library.display_search_results(results)

def search_by_id(library):
    """Function untuk search berdasarkan ID"""
    print("\n--- CARI BERDASARKAN ID ---")
    item_id = input("Masukkan ID: ").strip()
    item = library.search_by_id(item_id)
    
    if item:
        print(item.get_info())
    else:
        print("\n❌ Item tidak ditemukan.")

def borrow_item(library):
    """Function untuk meminjam item"""
    print("\n--- PINJAM ITEM ---")
    item_id = input("Masukkan ID item yang ingin dipinjam: ").strip()
    library.borrow_item(item_id)

def return_item(library):
    """Function untuk mengembalikan item"""
    print("\n--- KEMBALIKAN ITEM ---")
    item_id = input("Masukkan ID item yang ingin dikembalikan: ").strip()
    library.return_item(item_id)

def view_available_items(library):
    """Function untuk melihat item tersedia"""
    items = library.get_available_items()
    
    if not items:
        print("\n📚 Tidak ada item yang tersedia saat ini.")
        return
    
    print("\n" + "="*60)
    print("ITEM TERSEDIA")
    print("="*60)
    for idx, item in enumerate(items, 1):
        print(f"{idx}. [{item.get_type()}] {item.title}")
    print("="*60)

def view_borrowed_items(library):
    """Function untuk melihat item dipinjam"""
    items = library.get_borrowed_items()
    
    if not items:
        print("\n📚 Tidak ada item yang sedang dipinjam.")
        return
    
    print("\n" + "="*60)
    print("ITEM SEDANG DIPINJAM")
    print("="*60)
    for idx, item in enumerate(items, 1):
        print(f"{idx}. [{item.get_type()}] {item.title}")
    print("="*60)

def main():
    """Main function"""
    # Inisialisasi perpustakaan
    library = Library("Perpustakaan ITERA")
    
    # Tambah beberapa data dummy biar gak kosong
    print("🔄 Menginisialisasi perpustakaan dengan data contoh...")
    
    book1 = Book("B001", "Python Programming", 2023, "John Doe", 350)
    book2 = Book("B002", "Data Structures and Algorithms", 2022, "Jane Smith", 480)
    book3 = Book("B003", "Web Development with Flask", 2024, "Mike Johnson", 290)
    
    mag1 = Magazine("M001", "Tech Today", 2024, "Januari 2024", "TechPress")
    mag2 = Magazine("M002", "Science Weekly", 2024, "Februari 2024", "SciencePub")
    
    library.add_item(book1)
    library.add_item(book2)
    library.add_item(book3)
    library.add_item(mag1)
    library.add_item(mag2)
    
    # Main loop
    while True:
        display_menu()
        choice = input("\nPilih menu (0-9): ").strip()
        
        if choice == "1":
            add_book(library)
        elif choice == "2":
            add_magazine(library)
        elif choice == "3":
            library.display_all_items()
        elif choice == "4":
            search_by_title(library)
        elif choice == "5":
            search_by_id(library)
        elif choice == "6":
            borrow_item(library)
        elif choice == "7":
            return_item(library)
        elif choice == "8":
            view_available_items(library)
        elif choice == "9":
            view_borrowed_items(library)
        elif choice == "0":
            print("\n👋 Terima kasih telah menggunakan sistem perpustakaan!")
            print("Sampai jumpa!\n")
            break
        else:
            print("\n❌ Pilihan tidak valid! Silakan pilih 0-9.")
        
        # Pause sebelum kembali ke menu
        input("\nTekan ENTER untuk melanjutkan...")

if __name__ == "__main__":
    main()