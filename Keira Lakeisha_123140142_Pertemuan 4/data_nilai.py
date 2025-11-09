import os

# Fungsi utilitas untuk clear screen
def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

# --- DATA AWAL MAHASISWA (Karakter Pitch Perfect) ---
data_mahasiswa = [
    {
        'nama': 'Beca Mitchell',
        'NIM': '123140089',
        'nilai_uts': 90,
        'nilai_uas': 95,
        'nilai_tugas': 88
    },
    {
        'nama': 'Aubrey Posen',
        'NIM': '123140101',
        'nilai_uts': 82,
        'nilai_uas': 78,
        'nilai_tugas': 85
    },
    {
        'nama': 'Chloe Beale',
        'NIM': '123140115',
        'nilai_uts': 75,
        'nilai_uas': 80,
        'nilai_tugas': 70
    },
    {
        'nama': 'Fat Amy',
        'NIM': '123140130',
        'nilai_uts': 65,
        'nilai_uas': 60,
        'nilai_tugas': 70
    },
    {
        'nama': 'Jesse Swanson',
        'NIM': '123140045',
        'nilai_uts': 95,
        'nilai_uas': 88,
        'nilai_tugas': 92
    },
    {
        'nama': 'Benji Applebaum',
        'NIM': '123140022',
        'nilai_uts': 55,
        'nilai_uas': 50,
        'nilai_tugas': 45
    }
]

# --- FUNGSI-FUNGSI LOGIKA ---

def hitung_nilai_akhir(uts, uas, tugas):
    """30% UTS + 40% UAS + 30% Tugas"""
    return (0.30 * uts) + (0.40 * uas) + (0.30 * tugas)

def tentukan_grade(nilai_akhir):
    """Menentukan grade (A: >=80, B: >=70, C: >=60, D: >=50, E: <50)"""
    if nilai_akhir >= 80:
        return 'A'
    elif nilai_akhir >= 70:
        return 'B'
    elif nilai_akhir >= 60:
        return 'C'
    elif nilai_akhir >= 50:
        return 'D'
    else:
        return 'E'

def tampilkan_data(data):
    """Menampilkan data mahasiswa dalam format tabel"""
    print("\n" + "="*80)
    print(f"| {'No':^4} | {'NIM':^11} | {'Nama Mahasiswa':<25} | {'UTS':^5} | {'UAS':^5} | {'Tugas':^5} | {'Akhir':^7} | {'Grade':^5} |")
    print("="*80)
    
    for i, mhs in enumerate(data):
        nilai_akhir = hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
        grade = tentukan_grade(nilai_akhir)
        
        print(f"| {i+1:^4} | {mhs['NIM']:^11} | {mhs['nama']:<25} | {mhs['nilai_uts']:^5} | {mhs['nilai_uas']:^5} | {mhs['nilai_tugas']:^5} | {nilai_akhir:^7.2f} | {grade:^5} |")
    
    print("="*80 + "\n")

def cari_min_max(data, tipe='max'):
    """Mencari mahasiswa dengan nilai akhir tertinggi atau terendah"""
    if not data:
        return None
    
    key_func = lambda mhs: hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])
    
    if tipe == 'max':
        mahasiswa_terpilih = max(data, key=key_func)
        nilai = key_func(mahasiswa_terpilih)
        return f"Nilai Tertinggi: {nilai:.2f} ({mahasiswa_terpilih['nama']} - {mahasiswa_terpilih['NIM']})"
    elif tipe == 'min':
        mahasiswa_terpilih = min(data, key=key_func)
        nilai = key_func(mahasiswa_terpilih)
        return f"Nilai Terendah: {nilai:.2f} ({mahasiswa_terpilih['nama']} - {mahasiswa_terpilih['NIM']})"
    return "Tipe pencarian tidak valid."

def hitung_rata_rata_kelas(data):
    """Menghitung rata-rata nilai akhir seluruh mahasiswa"""
    if not data:
        return 0
    
    total_nilai = sum(hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas']) for mhs in data)
    return total_nilai / len(data)

def filter_berdasarkan_grade(data, target_grade):
    """Memfilter list mahasiswa berdasarkan grade tertentu (List Comprehension)"""
    target = target_grade.upper()
    return [
        mhs for mhs in data 
        if tentukan_grade(hitung_nilai_akhir(mhs['nilai_uts'], mhs['nilai_uas'], mhs['nilai_tugas'])) == target
    ]

def input_data_baru(data):
    """Fungsi untuk input data mahasiswa baru dari user"""
    clear_screen()
    print("--- Input Data Mahasiswa Baru ---")
    
    nama = input("Masukkan Nama: ")
    nim = input("Masukkan NIM: ")
    
    while True:
        try:
            # Menggunakan map() untuk input sekaligus dan menangani error
            uts = int(input("Nilai UTS (0-100): "))
            uas = int(input("Nilai UAS (0-100): "))
            tugas = int(input("Nilai Tugas (0-100): "))
            if all(0 <= val <= 100 for val in [uts, uas, tugas]):
                break
            else:
                 print("Nilai harus antara 0 sampai 100.")
        except ValueError:
            print("Input nilai harus berupa angka bulat.")
            
    mahasiswa_baru = {
        'nama': nama,
        'NIM': nim,
        'nilai_uts': uts,
        'nilai_uas': uas,
        'nilai_tugas': tugas
    }
    
    data.append(mahasiswa_baru)
    print("\n✅ Data berhasil ditambahkan!")
    input("\nTekan ENTER untuk kembali ke Menu...")
    return data

# --- FUNGSI UTAMA ---
def main_menu():
    """Menu interaktif utama program"""
    global data_mahasiswa 
    
    while True:
        clear_screen()
        print("="*40)
        print(" SISTEM PENGELOLAAN NILAI MAHASISWA")
        print("="*40)
        print("1. Tampilkan Semua Data")
        print("2. Tambah Data Mahasiswa")
        print("3. Analisis Nilai (Min & Max)")
        print("4. Hitung Rata-Rata Kelas")
        print("5. Filter Berdasarkan Grade")
        print("6. Keluar")
        print("="*40)
        
        pilihan = input("Pilih menu (1-6): ")
        
        if pilihan == '1':
            clear_screen()
            print("--- Daftar Nilai Barden Bellas & Treblemakers ---")
            tampilkan_data(data_mahasiswa)
            input("Tekan ENTER...")
        
        elif pilihan == '2':
            data_mahasiswa = input_data_baru(data_mahasiswa)
            
        elif pilihan == '3':
            clear_screen()
            print("--- Analisis Nilai Kelas ---")
            print(cari_min_max(data_mahasiswa, 'max'))
            print(cari_min_max(data_mahasiswa, 'min'))
            input("\nTekan ENTER...")
            
        elif pilihan == '4':
            clear_screen()
            rata_rata = hitung_rata_rata_kelas(data_mahasiswa)
            print(f"Rata-Rata Nilai Akhir Kelas: **{rata_rata:.2f}**")
            input("\nTekan ENTER...")
            
        elif pilihan == '5':
            clear_screen()
            target = input("Grade yang dicari (A/B/C/D/E): ")
            data_filtered = filter_berdasarkan_grade(data_mahasiswa, target)
            
            if data_filtered:
                print(f"--- Mahasiswa Grade '{target.upper()}' ({len(data_filtered)} orang) ---")
                tampilkan_data(data_filtered)
            else:
                print(f"\n❌ Tidak ada yang mendapat Grade '{target.upper()}' saat ini.")
            input("Tekan ENTER...")
            
        elif pilihan == '6':
            print("\n👋 Acapella Out! Program selesai.")
            break
            
        else:
            print("\n⚠️ Pilihan tidak ada di menu. Coba lagi.")
            input("Tekan ENTER...")

if __name__ == "__main__":
    main_menu()