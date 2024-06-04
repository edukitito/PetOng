document.addEventListener('DOMContentLoaded', function() {
    const animalList = document.getElementById('animalList');
    const loadingSpinner = document.getElementById('loading-spinner');
    const searchForm = document.getElementById('searchForm');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');
    const tipoInput = document.getElementById('tipo');

    function showLoadingSpinner() {
        loadingSpinner.style.display = 'block';
        animalList.style.display = 'none';
    }

    function hideLoadingSpinner() {
        loadingSpinner.style.display = 'none';
        animalList.style.display = 'flex';
    }

    function renderAnimals(animals) {
        animalList.innerHTML = '';
        animals.forEach(animal => {
            const animalCard = document.createElement('div');
            animalCard.classList.add('animal-card');
            let imageSrc = '';
            if (animal.imagem) {
                imageSrc = `data:image/jpeg;base64,${animal.imagem}`;
            } else {
                imageSrc = 'https://via.placeholder.com/150'; // URL válida para a imagem de placeholder
            }
            animalCard.innerHTML = `
                <img src="${imageSrc}" alt="${animal.nome}">
                <h3>${animal.nome}</h3>
                <p>Raça: ${animal.raca}</p>
                <p>Espécie: ${animal.tipo}</p>
                <p>Sexo: ${animal.sexo}</p>
                <p>Idade: ${animal.idade} anos</p>
                <p>Descrição: ${animal.descricao}</p>
                <div class="card-actions">
                    <button class="adopt-btn" data-id="${animal.id}">Adotar</button>
                </div>
            `;
            animalList.appendChild(animalCard);
        });

        document.querySelectorAll('.adopt-btn').forEach(button => {
            button.addEventListener('click', handleAdoptAnimal);
        });

        hideLoadingSpinner();
    }

    function fetchAnimals(queryParams = '') {
        showLoadingSpinner();
        fetch(`/animais/search${queryParams}`)
            .then(response => response.json())
            .then(data => {
                renderAnimals(data);
            })
            .catch(error => {
                console.error('Erro ao carregar animais:', error);
                hideLoadingSpinner();
            });
    }

    function handleAdoptAnimal(event) {
        const animalId = event.target.dataset.id;
        alert(`Iniciar processo de adoção para o animal com ID: ${animalId}`);
    }

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(searchForm);

        // Verifique se o campo "Tipo" está vazio e remova-o se estiver
        if (!tipoInput.value) {
            formData.delete('tipo'); // Remover o campo "tipo" do FormData se estiver vazio
        }

        const queryParams = new URLSearchParams(formData).toString();
        fetchAnimals(`?${queryParams}`);
    });

    // Adicione os ouvintes de evento para desativar os campos
    cidadeInput.addEventListener('input', function() {
        estadoInput.disabled = !!cidadeInput.value;
    });

    estadoInput.addEventListener('input', function() {
        cidadeInput.disabled = !!estadoInput.value;
    });

    fetchAnimals();
});