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

function applyMasks(){
    VMasker(document.getElementById("cpf")).maskPattern("999.999.999-99")
    VMasker(document.getElementById("estado")).maskPattern("AA")
    VMasker(document.getElementById("telefone")).maskPattern("(99) 999999999")
}

function validateInput(inputId, errorId, regexPattern) {
    const inputField = document.getElementById(inputId);
    const errorSpan = document.getElementById(errorId);
    const inputValue = inputField.value;

    const isValid = regexPattern.test(inputValue);

    if (!isValid) {
        errorSpan.style.display = 'block';
    } else {
        errorSpan.style.display = 'none';
    }
}

document.getElementById("email").addEventListener('blur', function () {
    validateInput('email', 'email_error', /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
})

document.getElementById('senha').addEventListener('blur', function () {
    validateInput('senha', 'senha_error', /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/);
});

document.getElementById('telefone').addEventListener('blur', function () {
    validateInput('telefone', 'telefone_error', /^\(\d{2}\) \d{9}$/);
});

function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
}


loadScript("https://unpkg.com/vanilla-masker/build/vanilla-masker.min.js", applyMasks);