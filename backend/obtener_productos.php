<?php

include("conexion.php");

$sql = "SELECT * FROM productos ORDER BY fecha_publicacion DESC";
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