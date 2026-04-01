<?php

session_start();
include("conexion.php");

// Verificar login
if (!isset($_SESSION["usuario_id"])) {
    echo json_encode(["error" => "No autorizado"]);
    exit();
}

$id_usuario = $_SESSION["usuario_id"];

$sql = "SELECT * FROM productos WHERE id_usuario = $id_usuario ORDER BY fecha_publicacion DESC";
$resultado = $conn->query($sql);

$productos = [];

if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        $productos[] = $fila;
    }
}

echo json_encode($productos);

$conn->close();

?>