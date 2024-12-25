// Data akun default
const users = [
    { email: "admin@example.com", password: "admin123" }
];

// Fungsi untuk menangani login
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Menyimpan status login di sessionStorage
        sessionStorage.setItem("loggedIn", true);
        // Mengarahkan ke aplikasi utama setelah login berhasil
        window.location.href = "app.html"; // Ganti dengan URL aplikasi utama
    } else {
        // Menampilkan pesan error jika login gagal
        document.getElementById("error-message").style.display = "block";
    }
});