document.addEventListener('DOMContentLoaded', function() {
    const animalList = document.getElementById('animalList');
    const animalModal = document.getElementById('animalModal');
    const closeBtn = document.querySelector('.closeBtn');
    const addAnimalBtn = document.getElementById('addAnimalBtn');
    const editAnimalBtn = document.getElementById('editAnimalBtn');
    const animalForm = document.getElementById('animalForm');
    const modalTitle = document.getElementById('modalTitle');
    let editMode = false;
    let currentAnimalId = null;
    let animals = [];

    function renderAnimals() {
        animalList.innerHTML = '';
        animals.forEach(animal => {
            const animalCard = document.createElement('div');
            animalCard.classList.add('animal-card');
            // Verificação do valor de animal.imagem
            let imageSrc = '';
            if (animal.imagem) {
                if (animal.imagem.startsWith('data:image')) {
                    imageSrc = animal.imagem;
                } else {
                    imageSrc = `data:image/jpeg;base64,${animal.imagem}`;
                }
            } else {
                // Placeholder para quando não houver imagem
                imageSrc = 'placeholder-image-url.jpg';
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
                    <button class="edit-btn" data-id="${animal.id}">Editar</button>
                    <button class="delete-btn" data-id="${animal.id}">Excluir</button>
                </div>
            `;
            animalList.appendChild(animalCard);
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', handleEditAnimal);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', handleDeleteAnimal);
        });
    }

    function fetchAnimals() {
        fetch(`/animais/A/${sessionStorage.getItem('email')}`)
            .then(response => response.json())
            .then(data => {
                animals = data;  // Preenchendo a variável animals com os dados recebidos
                renderAnimals();
            })
            .catch(error => console.error('Erro ao carregar animais:', error));
    }

    function handleEditAnimal(event) {
        editMode = true;
        currentAnimalId = event.target.dataset.id;
        const animal = animals.find(a => a.id == currentAnimalId);
        if (animal) {
            document.getElementById('animalName').value = animal.nome;
            document.getElementById('animalSpecies').value = animal.especie;
            document.getElementById('animalAge').value = animal.idade;
            modalTitle.textContent = 'Editar Animal';
            animalModal.style.display = 'block';
        }
    }

    function handleDeleteAnimal(event) {
        const animalId = event.target.dataset.id;
        fetch(`/animais/${animalId}`, {
            method: 'DELETE'
        })
            .then(() => {
                fetchAnimals();
            })
            .catch(error => console.error('Erro ao excluir animal:', error));
    }

    addAnimalBtn.addEventListener('click', function() {
        editMode = false;
        currentAnimalId = null;
        animalForm.reset();
        modalTitle.textContent = 'Adicionar Animal';
        animalModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        animalModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == animalModal) {
            animalModal.style.display = 'none';
        }
    });

    animalForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var formData = new FormData();
        formData.append('nome', document.getElementById('animalName').value);
        formData.append('raca', document.getElementById('raca').value);
        formData.append('sexo', document.getElementById('sexo').value);
        formData.append('descricao', document.getElementById('descricao').value);
        formData.append('idade', document.getElementById('animalAge').value);
        formData.append('tipo', document.getElementById('tipo').value);
        formData.append('email', sessionStorage.getItem('email'));
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
                fetchAnimals();  // Atualiza a lista de animais após a criação de um novo animal
            })
            .catch(error => {
                document.getElementById('message').textContent = 'Erro ao cadastrar animal.';
                console.error('Erro:', error);
            });

        animalModal.style.display = 'none';
    });

    fetchAnimals();
});