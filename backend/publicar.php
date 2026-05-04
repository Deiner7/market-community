<?php

session_start();
include("conexion.php");

// Verificar sesión
if (!isset($_SESSION["usuario_id"])) {
    echo "Debes iniciar sesión";
    exit();
}

// Verificar método POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Limpiar datos
    $titulo = trim($_POST["titulo"]);
    $descripcion = trim($_POST["descripcion"]);
    $precio = trim($_POST["precio"]);
    $id_usuario = $_SESSION["usuario_id"];

    // Validar campos vacíos
    if (
        empty($titulo) ||
        empty($descripcion) ||
        empty($precio)
    ) {
        echo "Todos los campos son obligatorios";
        exit();
    }

    // Verificar imagen
    if (!isset($_FILES["imagen"])) {
        echo "Debes subir una imagen";
        exit();
    }

    // Datos de imagen
    $imagen = $_FILES["imagen"];

    $nombre_original = $imagen["name"];
    $tmp = $imagen["tmp_name"];
    $tamano = $imagen["size"];
    $error = $imagen["error"];

    // Validar errores de subida
    if ($error !== 0) {
        echo "Error al subir la imagen";
        exit();
    }

    // Extensiones permitidas
    $extensiones_permitidas = ["jpg", "jpeg", "png", "webp"];

    // Obtener extensión
    $extension = strtolower(pathinfo($nombre_original, PATHINFO_EXTENSION));

    // Validar extensión
    if (!in_array($extension, $extensiones_permitidas)) {
        echo "Formato de imagen no permitido";
        exit();
    }

    // Validar tamaño (2MB máximo)
    $maximo = 2 * 1024 * 1024;

    if ($tamano > $maximo) {
        echo "La imagen es demasiado pesada";
        exit();
    }

    // Validar que sea realmente imagen
    $check = getimagesize($tmp);

    if ($check === false) {
        echo "El archivo no es una imagen válida";
        exit();
    }

    // Crear nombre único
    $nuevo_nombre = uniqid("producto_", true) . "." . $extension;

    // Ruta destino
    $ruta = "../uploads/" . $nuevo_nombre;

    // Mover archivo
    if (!move_uploaded_file($tmp, $ruta)) {
        echo "Error al guardar la imagen";
        exit();
    }

    // Guardar en BD
    $stmt = $conn->prepare("
        INSERT INTO productos
        (titulo, descripcion, precio, imagen, id_usuario)
        VALUES (?, ?, ?, ?, ?)
    ");

    $stmt->bind_param(
        "ssdsi",
        $titulo,
        $descripcion,
        $precio,
        $nuevo_nombre,
        $id_usuario
    );

    // Ejecutar
    if ($stmt->execute()) {
        echo "Producto publicado correctamente";
    } else {
        echo "Error al guardar producto";
    }

    $stmt->close();
    $conn->close();
}
?>
