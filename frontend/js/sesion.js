fetch("http://localhost/market-community/backend/verificar_sesion.php")
    .then(response => response.json())
    .then(data => {

        const usuarioInfo = document.getElementById("usuario-info");
        const logoutBtn = document.getElementById("logout-btn");

        if (data.logueado) {

            usuarioInfo.textContent = "Bienvenido, " + data.nombre;
            logoutBtn.style.display = "inline-block";

            logoutBtn.addEventListener("click", () => {

                fetch("http://localhost/market-community/backend/logout.php")
                    .then(() => {
                        location.reload();
                    });
            });

        } else {

            usuarioInfo.innerHTML = `
                <a href="pages/login.html">Login</a> |
                <a href="pages/register.html">Registro</a>
            `;
        }

    })
    .catch(error => console.error("Error:", error));