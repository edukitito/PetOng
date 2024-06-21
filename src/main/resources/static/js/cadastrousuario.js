document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cadastro-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const senha = document.getElementById('senha').value;
        const senhaConfirmada = document.getElementById('senhaconfirmada').value;

        if (senha !== senhaConfirmada) {
            alert('As senhas não coincidem. Por favor, tente novamente.');
            return;
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

        if (validateForm(formData)) {
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
                    window.location.href = 'login.html';
                })
                .catch(error => {
                    alert(error.message);
                });
        } else {
            alert('Por favor, corrija os erros no formulário.');
        }
    });

    const inputs = ['nome', 'nickname', 'senha', 'senhaconfirmada', 'email', 'telefone', 'cpf', 'endereco', 'cidade', 'estado'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        input.addEventListener('blur', () => validateSingleInput(inputId));
        input.addEventListener('input', () => validateSingleInput(inputId));
    });

    function validateSingleInput(inputId) {
        const errorId = inputId + '_error';
        const inputField = document.getElementById(inputId);
        const errorSpan = document.getElementById(errorId);
        const inputValue = inputField.value;

        let isValid = true;
        let regexPattern;

        switch (inputId) {
            case 'nome':
            case 'nickname':
                isValid = inputValue.length >= 5;
                break;
            case 'senha':
                regexPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
                isValid = regexPattern.test(inputValue) && inputValue.length >= 8;
                break;
            case 'senhaconfirmada':
                isValid = inputValue === document.getElementById('senha').value;
                break;
            case 'email':
                regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = regexPattern.test(inputValue);
                break;
            case 'telefone':
                regexPattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
                isValid = regexPattern.test(inputValue);
                break;
            case 'cpf':
                regexPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
                isValid = regexPattern.test(inputValue);
                break;
            case 'estado':
                regexPattern = /^[A-Z]{2}$/;
                isValid = regexPattern.test(inputValue);
                break;
            default:
                isValid = inputValue.length > 0;
        }

        if (!isValid) {
            displayError(inputField, errorSpan);
        } else {
            hideError(inputField, errorSpan);
        }
    }

    function validateForm(formData) {
        let isValid = true;

        // Validar nome
        if (formData.nome.length < 5) {
            displayError(document.getElementById('nome'), document.getElementById('nome_error'));
            isValid = false;
        } else {
            hideError(document.getElementById('nome'), document.getElementById('nome_error'));
        }

        // Validar nickname
        if (formData.nickname.length < 5) {
            displayError(document.getElementById('nickname'), document.getElementById('nickname_error'));
            isValid = false;
        } else {
            hideError(document.getElementById('nickname'), document.getElementById('nickname_error'));
        }

        // Validar senha
        if (formData.senha.length < 8 || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.senha)) {
            displayError(document.getElementById('senha'), document.getElementById('senha_error'));
            isValid = false;
        } else {
            hideError(document.getElementById('senha'), document.getElementById('senha_error'));
        }

        // Validar confirmação de senha
        if (document.getElementById('senhaconfirmada').value !== formData.senha) {
            displayError(document.getElementById('senhaconfirmada'), document.getElementById('senhaconfirmada_error'));
            isValid = false;
        } else {
            hideError(document.getElementById('senhaconfirmada'), document.getElementById('senhaconfirmada_error'));
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            displayError(document.getElementById('email'), document.getElementById('email_error'));
            isValid = false;
        } else {
            hideError(document.getElementById('email'), document.getElementById('email_error'));
        }

        // Validar telefone
        if (!formData.telefone.match(/^\(\d{2}\) \d{4,5}-\d{4}$/)) {
            displayError(document.getElementById('telefone'), document.getElementById('telefone_error'));
            isValid = false;
        } else {
            hideError(document.getElementById('telefone'), document.getElementById('telefone_error'));
        }

        // Validar CPF
        if (!formData.cpf.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
            displayError(document.getElementById('cpf'), document.getElementById('cpf_error'));
            isValid = false;
        } else {
            hideError(document.getElementById('cpf'), document.getElementById('cpf_error'));
        }

        // Validar endereço
        if (formData.endereco.length < 1) {
            displayError(document.getElementById('endereco'), document.getElementById('endereco_error'));
            isValid = false;
        } else {
            hideError(document.getElementById('endereco'), document.getElementById('endereco_error'));
        }

        // Validar cidade
        if (formData.cidade.length < 1) {
            displayError(document.getElementById('cidade'), document.getElementById('cidade_error'));
            isValid = false;
        } else {
            hideError(document.getElementById('cidade'), document.getElementById('cidade_error'));
        }

        // Validar estado
        if (!/^[A-Z]{2}$/.test(formData.estado)) {
            displayError(document.getElementById('estado'), document.getElementById('estado_error'));
            isValid = false;
        } else {
            hideError(document.getElementById('estado'), document.getElementById('estado_error'));
        }

        return isValid;
    }

    function displayError(inputField, errorSpan) {
        inputField.style.borderColor = 'red';
        errorSpan.style.display = 'block';
    }

    function hideError(inputField, errorSpan) {
        inputField.style.borderColor = 'green';
        errorSpan.style.display = 'none';
    }

    function applyMasks() {
        VMasker(document.getElementById("cpf")).maskPattern("999.999.999-99");
        VMasker(document.getElementById("estado")).maskPattern("AA");
        VMasker(document.getElementById("telefone")).maskPattern("(99) 99999-9999");
    }

    loadScript("https://unpkg.com/vanilla-masker/build/vanilla-masker.min.js", applyMasks);

    function loadScript(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }
});