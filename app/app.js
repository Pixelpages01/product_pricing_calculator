document.getElementById('calculate-btn').addEventListener('click', function() {
    // Ambil nilai input dari pengguna
    let sku = document.getElementById('sku').value;
    let hpp = parseFloat(document.getElementById('hpp').value);
    let margin = parseFloat(document.getElementById('margin').value);
    let biaya = parseFloat(document.getElementById('biaya').value);
    let diskon = parseFloat(document.getElementById('diskon').value);

    // Validasi input
    if (isNaN(hpp) || isNaN(margin)) {
        alert('HPP dan Margin harus berupa angka yang valid.');
        return;
    }

    // Hitung harga jual
    let hargaJual = hpp + (hpp * margin / 100) + biaya;
    let hargaSetelahDiskon = hargaJual - (hargaJual * (diskon / 100));

    // Format harga ke format mata uang
    function formatCurrency(amount) {
        return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    }

    // Tampilkan hasil pada tabel
    let resultRow = `
        <tr>
            <td>${sku}</td>
            <td>${formatCurrency(hpp)}</td>
            <td>${margin}%</td>
            <td>${formatCurrency(biaya)}</td>
            <td>${formatCurrency(hargaJual)}</td>
            <td>${formatCurrency(hargaSetelahDiskon)}</td>
        </tr>
    `;
    // ubah format
    // Fungsi untuk format mata uang tanpa desimal
    function formatCurrency(amount) {
    return amount.toLocaleString('id-ID', { 
    style: 'currency', 
    currency: 'IDR', 
    minimumFractionDigits: 0, // Menghapus desimal
    maximumFractionDigits: 0  // Menghapus desimal
    });
    }

    // Masukkan hasil kalkulasi ke dalam tabel
    document.querySelector("#result-table tbody").insertAdjacentHTML('beforeend', resultRow);

    // Tampilkan bagian hasil kalkulasi
    document.getElementById('result-section').style.display = 'block';
});

// Fungsi Simpan (untuk menyimpan data secara lokal)
document.getElementById('save-btn').addEventListener('click', function() {
    let sku = document.getElementById('sku').value;
    let hpp = parseFloat(document.getElementById('hpp').value);
    let margin = parseFloat(document.getElementById('margin').value);
    let biaya = parseFloat(document.getElementById('biaya').value);
    let diskon = parseFloat(document.getElementById('diskon').value);

    let data = {
        sku: sku,
        hpp: hpp,
        margin: margin,
        biaya: biaya,
        diskon: diskon
    };

    // Simpan data menggunakan LocalStorage
    localStorage.setItem('pricingData', JSON.stringify(data));
    alert('Data berhasil disimpan secara lokal!');
});

// Fungsi Unduh PDF
document.getElementById('download-btn').addEventListener('click', function() {
    let doc = new jsPDF();

    let table = document.getElementById('result-table');
    doc.autoTable({ html: table });

    // Unduh PDF
    doc.save('pricing-report.pdf');
});