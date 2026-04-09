<?php

include("conexion.php");

$busqueda = isset($_GET["q"]) ? $_GET["q"] : "";

//  Consulta segura con LIKE
$stmt = $conn->prepare("SELECT * FROM productos WHERE titulo LIKE ?");
$like = "%" . $busqueda . "%";
$stmt->bind_param("s", $like);

$stmt->execute();
$resultado = $stmt->get_result();

$productos = [];

while ($fila = $resultado->fetch_assoc()) {
    $productos[] = $fila;
}

echo json_encode($productos);

$stmt->close();
$conn->close();

?>