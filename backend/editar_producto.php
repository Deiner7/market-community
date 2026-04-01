<?php

session_start();
include("conexion.php");

if (!isset($_SESSION["usuario_id"])) {
    echo "No autorizado";
    exit();
}

$id_usuario = $_SESSION["usuario_id"];

$id = $_POST["id_producto"];
$titulo = $_POST["titulo"];
$descripcion = $_POST["descripcion"];
$precio = $_POST["precio"];

$sql = "UPDATE productos 
        SET titulo='$titulo', descripcion='$descripcion', precio='$precio'
        WHERE id_producto=$id AND id_usuario=$id_usuario";

if ($conn->query($sql) === TRUE) {
    echo "Producto actualizado correctamente";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();

?>