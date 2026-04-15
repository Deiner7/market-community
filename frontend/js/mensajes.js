document.addEventListener("DOMContentLoaded", function () {

    const contenedor = document.getElementById("contenedor-mensajes");

    fetch("http://localhost/market-community/backend/obtener_mensajes.php")
        .then(response => response.json())
        .then(data => {

            if (data.error) {
                contenedor.innerHTML = "<p>Debes iniciar sesión</p>";
                return;
            }

            if (data.length === 0) {
                contenedor.innerHTML = "<p>No tienes mensajes</p>";
                return;
            }

            data.forEach(mensaje => {

                const div = document.createElement("div");

                div.innerHTML = `
                    <p><strong>De:</strong> ${mensaje.nombre}</p>
                    <p>${mensaje.contenido}</p>

                    <button onclick="irChat(${mensaje.remitente})">
                        Abrir chat
                    </button>

                    <hr>
                `;

                contenedor.appendChild(div);
            });

        })
        .catch(error => console.error("Error:", error));

});

//  FUNCIÓN PARA IR AL CHAT
function irChat(usuarioId) {
    window.location.href = `chat.html?usuario=${usuarioId}`;
}