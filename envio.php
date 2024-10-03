<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Captura os dados do formulário
    $nome = htmlspecialchars($_POST['nome']);
    $sobrenome = htmlspecialchars($_POST['sobrenome']);
    $endereco = htmlspecialchars($_POST['endereco']);
    $cep = htmlspecialchars($_POST['cep']);
    $pais = htmlspecialchars($_POST['pais']);
    $opcaoEnvio = isset($_POST['opcaoEnvio']) ? 'Sim' : 'Não';

    // Aqui você pode enviar um e-mail ou salvar em um banco de dados
    $to = 'seu_email@example.com'; // Substitua pelo seu e-mail
    $subject = 'Novo Pedido de Entrega';
    $message = "Nome: $nome\nSobrenome: $sobrenome\nEndereço: $endereco\nCEP: $cep\nPaís: $pais\nEnvio Expresso: $opcaoEnvio";
    $headers = 'From: webmaster@example.com' . "\r\n" . // Substitua pelo seu e-mail
               'Reply-To: webmaster@example.com' . "\r\n"; // Substitua pelo seu e-mail

    // Envia o e-mail
    if (mail($to, $subject, $message, $headers)) {
        echo "Formulário enviado com sucesso!";
    } else {
        echo "Erro ao enviar o formulário.";
    }
} else {
    echo "Método inválido.";
}
?>