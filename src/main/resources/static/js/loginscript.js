document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login');
    const createONGButton = document.getElementById('criar-ong');
    const createTutorButton = document.getElementById('criar-tutor');

    loginButton.addEventListener('click', function (event) {
        event.preventDefault();
        const emailCPFOrCNPJ = document.getElementById('email-cpf-cnpj').value;
        const password = document.getElementById('senha').value;

        let url = emailCPFOrCNPJ.includes('@') ? '/users/login' : '/ongs/login';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'email': emailCPFOrCNPJ,
                'senha': password
            }),
            credentials: 'include' // Inclui cookies na requisição
        })
            .then(response => response.text().then(text => {
                if (response.ok) {
                    return text; // Se a resposta for bem-sucedida, retorna o texto para a próxima cadeia de promessas
                } else {
                    throw new Error(text); // Lança uma exceção com a mensagem de erro do servidor
                }
            }))
            .then(email => {
                alert('Login bem-sucedido!');
                sessionStorage.setItem('email', email);
                // Define qual dashboard abrir baseando-se no conteúdo de email (supondo que CNPJ só contém dígitos)
                const regexCNPJ = /^\d+$/;
                window.location.href = regexCNPJ.test(email) ? 'dashboardOng.html' : 'dashboardUser.html';
            })
            .catch(error => {
                // Exibe um alerta com o erro
                alert('Erro: ' + error.message);
            });
    });

    createONGButton.addEventListener('click', function () {
        window.location.href = 'cadastrarong.html';
    });

    createTutorButton.addEventListener('click', function () {
        window.location.href = 'cadastrartutor.html';
    });
});