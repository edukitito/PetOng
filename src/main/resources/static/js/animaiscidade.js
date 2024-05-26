function fetchAnimals() {
    const cidade = document.getElementById('cidadeInput').value;
    if (!cidade) {
        alert("Por favor, digite o nome de uma cidade.");
        return;
    }

    fetch(`/animais/cidade/${cidade}`)
        .then(response => response.json())
        .then(data => displayAnimals(data))
        .catch(error => console.error('Erro ao buscar animais:', error));
}

function displayAnimals(animals) {
    const container = document.getElementById('animalsContainer');
    container.innerHTML = ''; // Clear previous results
    animals.forEach(animal => {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = `data:image/jpeg;base64,${animal.imagem}`;
        img.alt = 'Animal Image';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const nome = document.createElement('h5');
        nome.textContent = animal.nome;
        nome.className = 'card-title';

        const raca = document.createElement('p');
        raca.textContent = `Raça: ${animal.raca}`;

        const sexo = document.createElement('p');
        sexo.textContent = `Sexo: ${animal.sexo}`;

        const descricao = document.createElement('p');
        descricao.textContent = `Descrição: ${animal.descricao}`;

        const idade = document.createElement('p');
        idade.textContent = `Idade: ${animal.idade}`;

        const tipo = document.createElement('p');
        tipo.textContent = `Tipo: ${animal.tipo}`;

        const adoteBtn = document.createElement('button');
        adoteBtn.textContent = 'Adote';
        adoteBtn.className = 'adote-btn';
        adoteBtn.onclick = function() {
            alert(`Você está interessado em adotar ${animal.nome}!`);
        };

        cardBody.appendChild(nome);
        cardBody.appendChild(raca);
        cardBody.appendChild(sexo);
        cardBody.appendChild(descricao);
        cardBody.appendChild(idade);
        cardBody.appendChild(tipo);
        cardBody.appendChild(adoteBtn);
        card.appendChild(img);
        card.appendChild(cardBody);
        container.appendChild(card);
    });
}
