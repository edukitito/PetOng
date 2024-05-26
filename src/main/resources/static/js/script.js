document.getElementById('animalForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    var formData = new FormData();

    formData.append('nome', document.getElementById('nome').value);
    formData.append('raca', document.getElementById('raca').value);
    formData.append('sexo', document.getElementById('sexo').value);
    formData.append('descricao', document.getElementById('descricao').value);
    formData.append('idade', document.getElementById('idade').value);
    formData.append('tipo', document.getElementById('tipo').value);
    formData.append('proprietarioTipo', document.getElementById('proprietarioTipo').value);
    formData.append('proprietarioId', document.getElementById('proprietarioId').value);

    var imagemInput = document.getElementById('imagem');
    if (imagemInput.files.length > 0) {
        formData.append('imagem', imagemInput.files[0]);
    }

    fetch('/animais', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('message').textContent = 'Animal cadastrado com sucesso!';
            document.getElementById('animalForm').reset();
        })
        .catch(error => {
            document.getElementById('message').textContent = 'Erro ao cadastrar animal.';
            console.error('Erro:', error);
        });
});
