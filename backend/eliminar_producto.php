<?php

session_start();
include("conexion.php");

if (!isset($_SESSION["usuario_id"])) {
    echo "No autorizado";
    exit();
}

$id_usuario = $_SESSION["usuario_id"];
$id_producto = $_POST["id_producto"];

// Verificar que el producto sea del usuario
$sql = "DELETE FROM productos 
        WHERE id_producto = $id_producto 
        AND id_usuario = $id_usuario";

if ($conn->query($sql) === TRUE) {
    echo "Producto eliminado correctamente";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();

?>