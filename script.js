// ===== Theme Toggle with Persistence =====
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "🌙";
    }
  });
}

// ===== Form Handling & Validation =====
const donorForm = document.getElementById("donorForm");
if (donorForm) {
  donorForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const age = parseInt(document.getElementById("age").value);
    const contact = document.getElementById("contact").value;

    // Validation checks
    if (age < 18) {
      alert("You must be at least 18 years old to donate blood.");
      return;
    }
    if (!/^\d{10}$/.test(contact)) {
      alert("Contact number must be 10 digits.");
      return;
    }

    // Collect data
    const donorData = {
      name: document.getElementById("name").value,
      age,
      gender: document.getElementById("gender").value,
      bloodType: document.getElementById("bloodType").value,
      contact,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      medical: document.getElementById("medical").value || "None"
    };

    // Save in localStorage
    localStorage.setItem("donorData", JSON.stringify(donorData));

    // Redirect
    window.location.href = "profile.html";
  });
}

// ===== Display Profile Data =====
const profileDiv = document.getElementById("profile");
if (profileDiv) {
  const donorData = JSON.parse(localStorage.getItem("donorData"));
  if (donorData) {
    profileDiv.innerHTML = `
      <p><b>👤 Name:</b> ${donorData.name}</p>
      <p><b>🎂 Age:</b> ${donorData.age}</p>
      <p><b>⚧ Gender:</b> ${donorData.gender}</p>
      <p><b>🩸 Blood Type:</b> ${donorData.bloodType}</p>
      <p><b>📞 Contact:</b> ${donorData.contact}</p>
      <p><b>✉️ Email:</b> ${donorData.email}</p>
      <p><b>🏠 Address:</b> ${donorData.address}</p>
      <p><b>📝 Medical History:</b> ${donorData.medical}</p>
    `;
  }
}
