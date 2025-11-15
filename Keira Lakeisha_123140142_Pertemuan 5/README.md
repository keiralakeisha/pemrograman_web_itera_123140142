# Sistem Manajemen Perpustakaan

Tugas Praktikum Pertemuan 5 - Pemrograman Berorientasi Objek (OOP) dengan Python

## Deskripsi Program

Program ini adalah sistem manajemen perpustakaan sederhana yang dibuat menggunakan konsep Object-Oriented Programming (OOP) di Python. Program ini bisa digunakan untuk mengelola koleksi buku dan majalah di perpustakaan, termasuk fitur untuk menambah, mencari, meminjam, dan mengembalikan item.

## Fitur Utama

- ✅ **Tambah Item**: Menambahkan buku atau majalah ke perpustakaan
- 📋 **Tampilkan Koleksi**: Melihat semua item yang ada di perpustakaan
- 🔍 **Pencarian**: Mencari item berdasarkan judul atau ID
- 📖 **Peminjaman**: Meminjam item yang tersedia
- 🔄 **Pengembalian**: Mengembalikan item yang sudah dipinjam
- 📊 **Filter Status**: Melihat item berdasarkan status (tersedia/dipinjam)

## Struktur File

```
.
├── library_item.py    # Abstract base class untuk semua item perpustakaan
├── items.py          # Class Book dan Magazine yang inherit dari LibraryItem
├── library.py        # Class Library untuk manage koleksi
├── main.py           # Program utama dengan menu interaktif
└── README.md         # File ini
```

## Konsep OOP yang Diterapkan

### 1. Abstract Class & Inheritance (30%)
- **Abstract Class**: `LibraryItem` sebagai base class dengan abstract method `get_info()` dan `get_type()`
- **Inheritance**: Class `Book` dan `Magazine` mewarisi dari `LibraryItem`
- Semua subclass wajib mengimplementasikan abstract method dari parent class

### 2. Encapsulation (25%)
- Menggunakan **private attributes** (double underscore `__`) di class `Library` untuk `__name` dan `__items`
- Menggunakan **protected attributes** (single underscore `_`) di class `LibraryItem` untuk `_item_id`, `_title`, dll
- Implementasi **property decorators** (`@property` dan `@setter`) untuk akses controlled ke attributes

### 3. Polymorphism (20%)
- **Method Overriding**: Setiap subclass override method `get_info()` dan `get_type()` sesuai kebutuhan masing-masing
- Setiap item bisa dipanggil method yang sama tapi menghasilkan output berbeda sesuai tipenya

### 4. Additional Features
- Constructor dengan parameter berbeda untuk setiap class
- Method helper untuk operasi perpustakaan (borrow, return, search)
- Data validation dan error handling

## Cara Menjalankan Program

### Prerequisites
- Python 3.x sudah terinstall
- Text editor atau IDE (rekomendasi: VS Code)

### Langkah-langkah di VS Code:

1. **Clone atau download repository ini**
   ```bash
   git clone <repository-url>
   cd <folder-project>
   ```

2. **Buka folder di VS Code**
   - File > Open Folder
   - Pilih folder project

3. **Jalankan program**
   - Buka terminal di VS Code (Terminal > New Terminal)
   - Ketik command:
     ```bash
     python main.py
     ```
   - Atau bisa langsung klik kanan di file `main.py` > Run Python File

4. **Ikuti menu yang muncul**
   - Program sudah include data contoh
   - Coba fitur-fitur yang tersedia dengan pilih nomor menu

## Contoh Penggunaan

### 1. Menambah Buku Baru
```
Pilih menu: 1
ID Buku: B004
Judul: Clean Code
Penulis: Robert C. Martin
Tahun Terbit: 2008
Jumlah Halaman: 464
```

### 2. Mencari Item
```
Pilih menu: 4
Masukkan judul yang dicari: Python
```

### 3. Meminjam Item
```
Pilih menu: 6
Masukkan ID item yang ingin dipinjam: B001
```

## Screenshot Hasil Running Program
![Running Program 1](<WhatsApp Image 2025-11-15 at 11.43.16_e999a179.jpg>)
![Running Program 2](<WhatsApp Image 2025-11-15 at 11.43.35_e0da3505.jpg>)

### Menu Utama
```
============================================================
          SISTEM MANAJEMEN PERPUSTAKAAN
============================================================
1. Tambah Buku
2. Tambah Majalah
3. Tampilkan Semua Item
...
```

### Tampilan Semua Item
```
============================================================
DAFTAR KOLEKSI PERPUSTAKAAN ITERA
============================================================
Total Item: 5

1. [Buku] Python Programming - 🟢 Tersedia
2. [Buku] Data Structures and Algorithms - 🟢 Tersedia
...
```

### Detail Item
```
==================================================
ID           : B001
Judul        : Python Programming
Penulis      : John Doe
Tahun        : 2023
Halaman      : 350
Status       : Tersedia
==================================================
```

## Diagram Class

```
┌─────────────────────┐
│   LibraryItem       │ (Abstract)
├─────────────────────┤
│ - _item_id          │
│ - _title            │
│ - _year             │
│ - _is_borrowed      │
├─────────────────────┤
│ + get_info()        │ (Abstract)
│ + get_type()        │ (Abstract)
│ + borrow()          │
│ + return_item()     │
└──────────┬──────────┘
           │
    ┌──────┴──────┐
    │             │
┌───▼────┐   ┌───▼────────┐
│  Book  │   │  Magazine  │
├────────┤   ├────────────┤
│-author │   │ -edition   │
│-pages  │   │ -publisher │
└────────┘   └────────────┘

┌─────────────────────┐
│     Library         │
├─────────────────────┤
│ - __name            │
│ - __items[]         │
├─────────────────────┤
│ + add_item()        │
│ + search_by_title() │
│ + search_by_id()    │
│ + borrow_item()     │
│ + return_item()     │
└─────────────────────┘
```

## Penjelasan Teknis

### Abstract Class Implementation
File `library_item.py` berisi abstract base class yang menggunakan module `abc` dari Python. Method `get_info()` dan `get_type()` di-mark sebagai `@abstractmethod`, jadi semua class turunannya wajib implement method tersebut.

### Encapsulation Strategy
- **Private (`__`)**: Untuk data yang benar-benar sensitif dan tidak boleh diakses langsung (contoh: `__items` di Library)
- **Protected (`_`)**: Untuk data yang mungkin diakses oleh subclass (contoh: `_item_id` di LibraryItem)
- **Property**: Untuk controlled access dengan validation (contoh: `@property` untuk semua getter)

### Polymorphism in Action
Method `get_info()` di setiap class menghasilkan format output berbeda:
- Book: menampilkan author dan pages
- Magazine: menampilkan edition dan publisher

Tapi semua bisa dipanggil dengan cara yang sama: `item.get_info()`

## Testing

Program sudah ditest dengan skenario:
- ✅ Menambah item baru (buku dan majalah)
- ✅ Menampilkan semua koleksi
- ✅ Mencari item (by title dan by ID)
- ✅ Meminjam item
- ✅ Mengembalikan item
- ✅ Validasi ID duplikat
- ✅ Validasi status peminjaman

## Catatan Pengembangan

Program ini masih bisa dikembangkan lebih lanjut dengan fitur:
- Database persistence (simpan ke file/database)
- User management (siapa yang pinjam)
- Due date tracking
- Fine calculation untuk keterlambatan
- Export data ke CSV/Excel

## Author

**Keira Lakeisha Fachra Fuady** - 123140142  
Teknik Informatika - Institut Teknologi Sumatera  
Praktikum Pemrograman Python - Pertemuan 5

---

*Dibuat untuk memenuhi tugas Praktikum Python OOP*