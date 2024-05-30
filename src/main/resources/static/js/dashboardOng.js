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

    const animals = [
        { id: 1, name: 'Rex', species: 'Dog', age: 5 },
        { id: 2, name: 'Mittens', species: 'Cat', age: 3 },
        // Outros animais
    ];

    function renderAnimals() {
        animalList.innerHTML = '';
        animals.forEach(animal => {
            const animalCard = document.createElement('div');
            animalCard.classList.add('animal-card');
            animalCard.innerHTML = `
                <h3>${animal.name}</h3>
                <p>Espécie: ${animal.species}</p>
                <p>Idade: ${animal.age}</p>
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

    function handleEditAnimal(event) {
        editMode = true;
        currentAnimalId = event.target.dataset.id;
        const animal = animals.find(a => a.id == currentAnimalId);
        if (animal) {
            document.getElementById('animalName').value = animal.name;
            document.getElementById('animalSpecies').value = animal.species;
            document.getElementById('animalAge').value = animal.age;
            modalTitle.textContent = 'Editar Animal';
            animalModal.style.display = 'block';
        }
    }

    function handleDeleteAnimal(event) {
        const animalId = event.target.dataset.id;
        const index = animals.findIndex(a => a.id == animalId);
        if (index > -1) {
            animals.splice(index, 1);
            renderAnimals();
        }
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
            })
            .catch(error => {
                document.getElementById('message').textContent = 'Erro ao cadastrar animal.';
                console.error('Erro:', error);
            });

        renderAnimals();
        animalModal.style.display = 'none';
    });

    renderAnimals();
});
