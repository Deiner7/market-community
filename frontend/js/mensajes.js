document.addEventListener("DOMContentLoaded", function () {

    const contenedor = document.getElementById("contenedor-mensajes");

    fetch("http://localhost/market-community/backend/obtener_mensajes.php")
        .then(response => response.json())
        .then(data => {

            // LOGIN
            if (data.error) {

                contenedor.innerHTML = `
                    <p class="sin-productos">
                        Debes iniciar sesión
                    </p>
                `;

                return;
            }

            // VACÍO
            if (data.length === 0) {

                contenedor.innerHTML = `
                    <p class="sin-productos">
                        No tienes conversaciones todavía
                    </p>
                `;

                return;
            }

            // RECORRER
            data.forEach(mensaje => {

                const div = document.createElement("div");

                div.classList.add("card-mensaje");

                div.innerHTML = `

                    <div class="mensaje-avatar">
                        👤
                    </div>

                    <div class="mensaje-info">

                        <h3>${mensaje.nombre}</h3>

                        <p>
                            ${mensaje.contenido}
                        </p>

                    </div>

                    <button class="btn-chat"
                        onclick="irChat(${mensaje.remitente})">

                        Abrir Chat

                    </button>
                `;

                contenedor.appendChild(div);

            });

        })
        .catch(error => console.error("Error:", error));

});

// IR AL CHAT
function irChat(usuarioId) {

    window.location.href = `chat.html?usuario=${usuarioId}`;

}