document.getElementById('cadastro-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const data = {
        nome: document.getElementById('razao-social').value,
        descricao: document.getElementById('nome-fantasia').value,
        cnpj: document.getElementById('cnpj').value,
        endereco: document.getElementById('endereco').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    };

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
