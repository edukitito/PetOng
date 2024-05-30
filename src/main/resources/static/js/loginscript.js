document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.querySelector('button[type="submit"]');
    const createONGButton = document.getElementById('criar-ong');
    const createTutorButton = document.getElementById('criar-tutor');

    loginButton.addEventListener('click', function (event) {
        event.preventDefault();
        const emailCPFOrCNPJ = document.getElementById('email-cpf-cnpj').value;
        const password = document.getElementById('senha').value;

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
                    sessionStorage.setItem('email', emailCPFOrCNPJ);
                    window.location.href = 'dashboardOng.html';
                } else {
                    alert('Senha incorreta, tente novamente!');
                }
            })
            .catch(() => alert('Usuário não encontrado!'));
    });

    createONGButton.addEventListener('click', function () {
        window.location.href = 'cadastrarong.html';
    });

    createTutorButton.addEventListener('click', function () {
        window.location.href = 'cadastrartutor.html';
    });
});