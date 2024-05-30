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
        const newAnimal = {
            id: editMode ? currentAnimalId : animals.length + 1,
            name: document.getElementById('animalName').value,
            species: document.getElementById('animalSpecies').value,
            age: document.getElementById('animalAge').value
        };

        if (editMode) {
            const index = animals.findIndex(a => a.id == currentAnimalId);
            animals[index] = newAnimal;
        } else {
            animals.push(newAnimal);
        }

        renderAnimals();
        animalModal.style.display = 'none';
    });

    renderAnimals();
});
