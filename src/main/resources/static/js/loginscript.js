document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.querySelector('button[type="submit"]');
    const createONGButton = document.querySelector('.create-account button:nth-child(2)');
    const createTutorButton = document.querySelector('.create-account button:nth-child(3)');

    loginButton.addEventListener('click', function (event) {
        event.preventDefault();
        const emailCPFOrCNPJ = document.getElementById('email-cpf-cnpj').value;
        const password = document.getElementById('senha').value;

        // Logica para determinar a rota baseado no tipo de input: email, CPF ou CNPJ
        let url = '';
        if (emailCPFOrCNPJ.includes('@')) {
            url = '/users/email/' + emailCPFOrCNPJ;
        } else if (emailCPFOrCNPJ.length <= 11) {
            url = '/users/cpf/' + emailCPFOrCNPJ;
        } else {
            url = '/ongs/cnpj/' + emailCPFOrCNPJ;
        }

        fetch(url)
            .then(response => response.json())
            .then(user => {
                if (user.senha === password) {
                    alert('Login bem-sucedido!');
                } else {
                    alert('Senha incorreta, tente novamente!');
                }
            })
            .catch(() => alert('Usuário não encontrado!'));
    });
});
