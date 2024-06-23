document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cadastro-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        validateAllFields();

        const isValid = form.checkValidity();
        let cnpj = document.getElementById('cnpj').value;
        cnpj = limparCNPJ(cnpj);

        if (isValid) {
            const data = {
                nome: document.getElementById('razao-social').value,
                descricao: document.getElementById('nome-fantasia').value,
                email: document.getElementById('email').value,
                telefone: document.getElementById('telefone').value,
                endereco: document.getElementById('endereco').value,
                cnpj: cnpj,
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
                    window.location.href = 'login.html';
                    sessionStorage.setItem(email, limparCNPJ(email));
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });

    const inputs = ['razao-social', 'nome-fantasia', 'cnpj', 'endereco', 'cidade', 'estado', 'telefone', 'email', 'pix', 'senha', 'confirmar-senha'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        input.addEventListener('blur', () => validateSingleInput(inputId));
        input.addEventListener('input', () => validateSingleInput(inputId));
        input.style.borderColor = '#ccc'; // Define a cor inicial da borda
    });

    function validateSingleInput(inputId) {
        const errorId = inputId + '-error';
        const inputField = document.getElementById(inputId);
        const errorSpan = document.getElementById(errorId);
        const inputValue = inputField.value;

        let isValid = true;
        let regexPattern;

        switch (inputId) {
            case 'razao-social':
            case 'nome-fantasia':
            case 'endereco':
            case 'cidade':
            case 'pix':
                isValid = inputValue.length > 0;
                break;
            case 'cnpj':
                regexPattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
                isValid = regexPattern.test(inputValue);
                break;
            case 'telefone':
                regexPattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
                isValid = regexPattern.test(inputValue);
                break;
            case 'email':
                regexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = regexPattern.test(inputValue);
                break;
            case 'estado':
                regexPattern = /^[A-Z]{2}$/;
                isValid = regexPattern.test(inputValue);
                break;
            case 'senha':
                regexPattern = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
                isValid = regexPattern.test(inputValue) && inputValue.length >= 8;
                break;
            case 'confirmar-senha':
                isValid = inputValue === document.getElementById('senha').value;
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

    function validateAllFields() {
        inputs.forEach(validateSingleInput);
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
        VMasker(document.getElementById("cnpj")).maskPattern("99.999.999/9999-99");
        VMasker(document.getElementById("telefone")).maskPattern("(99) 99999-9999");
        VMasker(document.getElementById("estado")).maskPattern("AA");
    }

    loadScript("https://unpkg.com/vanilla-masker/build/vanilla-masker.min.js", applyMasks);

    function loadScript(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.onload = callback;
        document.head.appendChild(script);
    }

    function limparCNPJ(cnpj) {
        return cnpj.replace(/\D/g, ''); // Remove tudo que não é dígito
    }
});