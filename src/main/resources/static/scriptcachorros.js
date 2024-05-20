document.addEventListener('DOMContentLoaded', function() {
    fetch('/animais')
        .then(response => response.json())
        .then(cachorros => {
            const container = document.getElementById('cachorros-container');
            cachorros.forEach(cachorro => {
                const card = document.createElement('div');
                card.className = 'card';

                const img = document.createElement('img');
                img.src = 'data:image/jpeg;base64,' + cachorro.imagem;
                img.alt = cachorro.nome;

                const content = document.createElement('div');
                content.className = 'card-content';

                const title = document.createElement('h2');
                title.textContent = cachorro.nome;

                const raca = document.createElement('p');
                raca.textContent = `Raça: ${cachorro.raca}`;

                const sexo = document.createElement('p');
                sexo.textContent = `Sexo: ${cachorro.sexo}`;

                const descricao = document.createElement('p');
                descricao.textContent = `Descrição: ${cachorro.descricao}`;

                const idade = document.createElement('p');
                idade.textContent = `Idade: ${cachorro.idade} anos`;

                content.appendChild(title);
                content.appendChild(raca);
                content.appendChild(sexo);
                content.appendChild(descricao);
                content.appendChild(idade);
                card.appendChild(img);
                card.appendChild(content);
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Erro ao carregar cachorros:', error));
});
