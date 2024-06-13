function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
}

function applyMasks() {
    VMasker(document.getElementById("cnpj")).maskPattern("99.999.999/9999-99");
    VMasker(document.getElementById("telefone")).maskPattern("(99) 999999999");
    VMasker(document.getElementById("estado")).maskPattern("AA");
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

function validateAllFields() {
    //validateInput('cnpj', 'cnpj-error', /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
    //validateInput('telefone', 'telefone-error', /^\(\d{2}\) \d{9}$/);
    //validateInput('email', 'email-error', /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    //validateInput('estado', 'estado_error', /[A-Z]{2}$/);
    validateInput('senha', 'senha_error', /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/);

    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    const senhaError = document.getElementById('confirmar_senha_error');

    if (senha !== confirmarSenha) {
        senhaError.style.display = 'block';
    } else {
        senhaError.style.display = 'none';
    }
}

document.getElementById('cadastro-form').addEventListener('submit', function(event) {
    event.preventDefault();
    validateAllFields();
    const form = event.target;
    const isValid = form.checkValidity();
    if (isValid) {
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
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
});

document.getElementById('cnpj').addEventListener('blur', function () {
    validateInput('cnpj', 'cnpj-error', /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
});

document.getElementById('telefone').addEventListener('blur', function () {
    validateInput('telefone', 'telefone-error', /^\(\d{2}\) \d{9}$/);
});

document.getElementById('email').addEventListener('blur', function () {
    validateInput('email', 'email-error', /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});

document.getElementById('estado').addEventListener('blur', function () {
    validateInput('estado', 'estado_error', /[A-Z]{2}$/);
});

document.getElementById('senha').addEventListener('blur', function () {
    validateInput('senha', 'senha_error', /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/);
});

document.getElementById('confirmar-senha').addEventListener('blur', function () {
    validateAllFields();
});

loadScript("https://unpkg.com/vanilla-masker/build/vanilla-masker.min.js", applyMasks);