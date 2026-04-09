document.getElementById("form-login").addEventListener("submit", function(e) {
    e.preventDefault(); // ❗ evita que recargue la página

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost/market-community/backend/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.text())
    .then(data => {

        const mensaje = document.getElementById("mensaje-login");

        if (data.includes("exitoso")) {

            //  Redirección correcta
            window.location.href = "../index.html";

        } else {
            mensaje.textContent = data;
            mensaje.style.color = "red";
        }

    })
    .catch(error => console.error("Error:", error));
});