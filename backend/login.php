<?php

session_start();
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);

    //  Validación
    if (empty($email) || empty($password)) {
        echo "Todos los campos son obligatorios";
        exit();
    }

    //  Consulta segura
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();

    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {

        $usuario = $resultado->fetch_assoc();

        if (password_verify($password, $usuario["password"])) {

            $_SESSION["usuario_id"] = $usuario["id_usuario"];
            $_SESSION["nombre"] = $usuario["nombre"];

            echo "Login exitoso";

        } else {
            echo "Contraseña incorrecta";
        }

    } else {
        echo "Usuario no encontrado";
    }

    $stmt->close();
    $conn->close();
}
?>