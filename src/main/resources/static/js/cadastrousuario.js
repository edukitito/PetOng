document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cadastro-form');
    const submitBtn = document.getElementById('submit-btn');

    submitBtn.addEventListener('click', function () {
        const senha = document.getElementById('senha').value;
        const senhaConfirmada = document.getElementById('senhaconfirmada').value;

        // Checando se as senhas são iguais
        if (senha !== senhaConfirmada) {
            alert('As senhas não coincidem. Por favor, tente novamente.');
            return; // Interrompe o envio do formulário
        }

        const formData = {
            nome: document.getElementById('nome').value,
            nickname: document.getElementById('nickname').value,
            senha: senha,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            cpf: document.getElementById('cpf').value,
            endereco: document.getElementById('endereco').value,
            cidade: document.getElementById('cidade').value,
            estado: document.getElementById('estado').value
        };

        fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erro ao criar usuário');
            })
            .then(data => {
                alert('Usuário cadastrado com sucesso!');
                form.reset();
            })
            .catch(error => {
                alert(error.message);
            });
    });
});
