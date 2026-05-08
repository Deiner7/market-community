function mostrarToast(mensaje, tipo = "success") {

    // CONTENEDOR
    let container = document.getElementById("toast-container");

    if (!container) {

        container = document.createElement("div");
        container.id = "toast-container";

        document.body.appendChild(container);

    }

    // TOAST
    const toast = document.createElement("div");

    toast.classList.add("toast");

    if (tipo === "error") {
        toast.classList.add("toast-error");
    }

    toast.innerText = mensaje;

    container.appendChild(toast);

    // ELIMINAR
    setTimeout(() => {

        toast.remove();

    }, 3000);

}