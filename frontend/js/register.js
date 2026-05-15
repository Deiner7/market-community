const form = document.getElementById("form-register");

form.addEventListener("submit", function(e) {

    e.preventDefault();

    const boton = document.querySelector(".auth-btn");

    boton.disabled = true;
    boton.innerText = "Registrando...";

    const datos = new FormData(form);

    fetch("http://localhost/market-community/backend/register.php", {
        method: "POST",
        body: datos
    })
    .then(res => res.text())
    .then(data => {

        // ÉXITO
        if (data.includes("correctamente")) {

            mostrarToast("Cuenta creada correctamente");

            boton.innerText = "Redirigiendo...";

            setTimeout(() => {

                window.location.href = "login.html";

            }, 1500);

        } else {

            mostrarToast(data, "error");

            boton.disabled = false;
            boton.innerText = "Registrarse";

        }

    })
    .catch(error => {

        console.error(error);

        mostrarToast("Error del servidor", "error");

        boton.disabled = false;
        boton.innerText = "Registrarse";

    });

});