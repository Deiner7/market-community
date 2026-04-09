<?php

session_start();
include("conexion.php");

// Verificar si el usuario está logueado
if (!isset($_SESSION["usuario_id"])) {
    echo "Debes iniciar sesión";
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $titulo = trim($_POST["titulo"]);
    $descripcion = trim($_POST["descripcion"]);
    $precio = trim($_POST["precio"]);
    $id_usuario = $_SESSION["usuario_id"];

    //  Validación
    if (empty($titulo) || empty($descripcion) || empty($precio)) {
        echo "Todos los campos son obligatorios";
        exit();
    }

    // Manejo de imagen
    $imagen_nombre = $_FILES["imagen"]["name"];
    $imagen_tmp = $_FILES["imagen"]["tmp_name"];

    $ruta = "../uploads/" . $imagen_nombre;

    move_uploaded_file($imagen_tmp, $ruta);

    //  Consulta segura
    $stmt = $conn->prepare("INSERT INTO productos (titulo, descripcion, precio, imagen, id_usuario) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssdsi", $titulo, $descripcion, $precio, $imagen_nombre, $id_usuario);

    if ($stmt->execute()) {
        echo "Producto publicado correctamente";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
