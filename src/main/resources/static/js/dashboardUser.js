document.addEventListener('DOMContentLoaded', function() {
    const animalList = document.getElementById('animalList');
    const loadingSpinner = document.getElementById('loading-spinner');
    const searchForm = document.getElementById('searchForm');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');
    const tipoInput = document.getElementById('tipo');

    // Funções para mostrar e esconder o spinner de carregamento
    function showLoadingSpinner() {
        loadingSpinner.style.display = 'block';
        animalList.style.display = 'none';
    }

    function hideLoadingSpinner() {
        loadingSpinner.style.display = 'none';
        animalList.style.display = 'flex';
    }

    // Renderiza os animais no DOM
    function renderAnimals(animals) {
        animalList.innerHTML = ''; // Limpa a lista anterior
        animals.forEach(animal => {
            const animalCard = document.createElement('div');
            animalCard.classList.add('animal-card');
            const imageSrc = animal.imagem ? `data:image/jpeg;base64,${animal.imagem}` : 'https://via.placeholder.com/150';

            animalCard.innerHTML = `
                <img src="${imageSrc}" alt="Imagem de ${animal.nome}" class="animal-image">
                <div class="content">
                    <h3>${animal.nome}</h3>
                    <p>Raça: ${animal.raca}</p>
                    <p>Espécie: ${animal.tipo}</p>
                    <p>Sexo: ${animal.sexo}</p>
                    <p>Idade: ${animal.idade} anos</p>
                    <p>Descrição: ${animal.descricao}</p>
                </div>
                <div class="card-actions">
                    <button class="adopt-btn" data-id="${animal.id}">Adotar</button>
                </div>
            `;
            animalList.appendChild(animalCard);
        });

        // Adiciona eventos de clique nos botões de adoção
        document.querySelectorAll('.adopt-btn').forEach(button => {
            button.addEventListener('click', handleAdoptAnimal);
        });

        hideLoadingSpinner();
    }

    // Fetch para buscar animais com parâmetros de query
    function fetchAnimals(queryParams = '') {
        showLoadingSpinner();
        fetch(`/animais/search${queryParams}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha ao carregar dados.');
                }
                return response.json();
            })
            .then(data => renderAnimals(data))
            .catch(error => {
                console.error('Erro ao carregar animais:', error);
                hideLoadingSpinner();
            });
    }

    // Trata o evento de adoção
    function handleAdoptAnimal(event) {
        const animalId = event.target.dataset.id;
        alert(`Iniciar processo de adoção para o animal com ID: ${animalId}`);
    }

    // Trata o envio do formulário de busca
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(searchForm);

        if (!tipoInput.value) {
            formData.delete('tipo');
        }

        if (!cidadeInput.value && !estadoInput.value) {
            formData.delete('cidade');
            formData.delete('estado');
        }

        const queryParams = new URLSearchParams(formData).toString();
        fetchAnimals(`?${queryParams}`);
    });

    // Adiciona lógica para desativar campos conflitantes
    cidadeInput.addEventListener('input', function() {
        estadoInput.disabled = !!cidadeInput.value.trim();
    });

    estadoInput.addEventListener('input', function() {
        cidadeInput.disabled = !!estadoInput.value.trim();
    });

    // Inicia carregando todos os animais
    fetchAnimals();
});