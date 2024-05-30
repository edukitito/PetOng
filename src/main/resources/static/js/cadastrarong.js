document.getElementById('cadastro-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const data = {
        nome: document.getElementById('razao-social').value,
        descricao: document.getElementById('nome-fantasia').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value,
        cnpj: document.getElementById('cnpj').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        senha: document.getElementById('senha').value,
        pix: document.getElementById('pix').value
    };

    console.log("Dados a serem enviados:", data);


    // Verificar se algum campo está vazio
    for (let key in data) {
        if (data[key].trim() === "") {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
    }

    fetch('http://localhost:8080/ongs/cadastrar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Cadastro realizado com sucesso!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Erro ao cadastrar. Tente novamente.');
        });
});
