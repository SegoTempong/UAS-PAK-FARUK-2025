let dataPulsa = [];

// Fungsi untuk mengambil data dari database.json
const ambilDataPulsa = async () => {
  const response = await fetch("http://localhost:3000/dataPulsa");
  dataPulsa = await response.json();
  tampilkanDataPulsa();
};

// Fungsi tambah pulsa
const tambahPulsa = async (event) => {
  event.preventDefault();
  const nomorHp = document.getElementById("nomor-hp").value;
  const operator = document.getElementById("operator").value;
  const nominal = document.getElementById("nominal").value;

  if (nomorHp && operator && nominal) {
    const pulsa = {
      nomorHp,
      operator,
      nominal,
    };

    // Simpan data ke database.json
    const response = await fetch("http://localhost:3000/dataPulsa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pulsa),
    });

    if (response.ok) {
      ambilDataPulsa();
      resetForm();
    }
  } else {
    alert("Lengkapi semua field!");
  }
};

// Fungsi tampilkan data pulsa
const tampilkanDataPulsa = () => {
  const tabelData = document.getElementById("tabel-data");
  tabelData.innerHTML = ""; // Kosongkan tabel sebelum menampilkan data baru

  dataPulsa.forEach((pulsa, index) => {
    const baris = document.createElement("tr");

    // Mengisi baris tabel dengan data
    baris.innerHTML = `
      <td>${index + 1}</td>
      <td>${pulsa.nomorHp}</td>
      <td>${pulsa.operator}</td>
      <td>${pulsa.nominal}</td>
      <td>
        <button class="edit" data-id="${pulsa.id}">Edit</button>
        <button class="hapus" data-id="${pulsa.id}">Hapus</button>
      </td>
    `;

    // Tambahkan event listener untuk tombol Edit dan Hapus
    const editButton = baris.querySelector(".edit");
    editButton.addEventListener("click", () => editPulsa(pulsa));
    
    const hapusButton = baris.querySelector(".hapus");
    hapusButton.addEventListener("click", () => hapusPulsa(pulsa.id));

    tabelData.appendChild(baris);
  });
};

// Fungsi edit pulsa
const editPulsa = async (pulsa) => {
  document.getElementById("nomor-hp").value = pulsa.nomorHp;
  document.getElementById("operator").value = pulsa.operator;
  document.getElementById("nominal").value = pulsa.nominal;

  // Hapus data lama setelah di-edit
  hapusPulsa(pulsa.id);
};

// Fungsi hapus pulsa
const hapusPulsa = async (id) => {
  const response = await fetch(`http://localhost:3000/dataPulsa/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    ambilDataPulsa();
  }
};

// Fungsi reset form
const resetForm = () => {
  document.getElementById("nomor-hp").value = "";
  document.getElementById("operator").value = "";
  document.getElementById("nominal").value = "";
};

// Ambil data pulsa saat pertama kali aplikasi dijalankan
document.addEventListener("DOMContentLoaded", ambilDataPulsa);
