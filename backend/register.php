<?php

include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nombre = trim($_POST["nombre"]);
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);

    //  VALIDACIONES
    if (empty($nombre) || empty($email) || empty($password)) {
        echo "Todos los campos son obligatorios";
        exit();
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Correo no válido";
        exit();
    }

    if (strlen($password) < 6) {
        echo "La contraseña debe tener mínimo 6 caracteres";
        exit();
    }

    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nombre, $email, $password_hash);

    if ($stmt->execute()) {
        echo "Usuario registrado correctamente";
    } else {
        echo "El correo ya está registrado";
    }

    $stmt->close();
    $conn->close();
}
?>