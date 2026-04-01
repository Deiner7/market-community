<?php

include("conexion.php");

$id = $_GET["id"];

//  NUEVA CONSULTA (con JOIN)
$sql = "SELECT productos.*, usuarios.nombre 
        FROM productos
        JOIN usuarios ON productos.id_usuario = usuarios.id_usuario
        WHERE productos.id_producto = $id";

$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {
    $producto = $resultado->fetch_assoc();
    echo json_encode($producto);
} else {
    echo json_encode(["error" => "Producto no encontrado"]);
}

$conn->close();

?>