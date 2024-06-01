document.addEventListener('DOMContentLoaded', function() {
    const animalList = document.getElementById('animalList');
    const loadingSpinner = document.getElementById('loading-spinner');
    const animalModal = document.getElementById('animalModal');
    const deleteConfirmModal = document.getElementById('deleteConfirmModal');
    const closeBtn = document.querySelectorAll('.closeBtn');
    const addAnimalBtn = document.getElementById('addAnimalBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const animalForm = document.getElementById('animalForm');
    const modalTitle = document.getElementById('modalTitle');
    const imagemPreview = document.getElementById('imagemPreview');
    const imagemAtualInput = document.getElementById('imagemAtual');
    let editMode = false;
    let currentAnimalId = null;
    let animals = [];
    let animalIdToDelete = null;

    function showLoadingSpinner() {
        loadingSpinner.style.display = 'block';
        animalList.style.display = 'none';
    }

    function hideLoadingSpinner() {
        loadingSpinner.style.display = 'none';
        animalList.style.display = 'flex';
    }

    function renderAnimals() {
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

        hideLoadingSpinner();
    }

    function fetchAnimals() {
        showLoadingSpinner();
        fetch(`/animais/A/${sessionStorage.getItem('email')}`)
            .then(response => response.json())
            .then(data => {
                animals = data;
                renderAnimals();
            })
            .catch(error => {
                console.error('Erro ao carregar animais:', error);
                hideLoadingSpinner();
            });
    }

    function handleEditAnimal(event) {
        editMode = true;
        currentAnimalId = event.target.dataset.id;
        const animal = animals.find(a => a.id == currentAnimalId);
        if (animal) {
            document.getElementById('animalName').value = animal.nome;
            document.getElementById('tipo').value = animal.tipo;
            document.getElementById('animalAge').value = animal.idade;
            document.getElementById('raca').value = animal.raca;
            document.getElementById('sexo').value = animal.sexo;
            document.getElementById('descricao').value = animal.descricao;

            if (animal.imagem) {
                imagemPreview.src = `data:image/jpeg;base64,${animal.imagem}`;
                imagemPreview.style.display = 'block';
                imagemAtualInput.value = animal.imagem;  // Salvar a imagem atual no campo oculto
            } else {
                imagemPreview.style.display = 'none';
                imagemAtualInput.value = '';  // Limpar o campo oculto se não houver imagem
            }

            modalTitle.textContent = 'Editar Animal';
            animalModal.style.display = 'block';
        }
    }

    function handleDeleteAnimal(event) {
        animalIdToDelete = event.target.dataset.id;
        deleteConfirmModal.style.display = 'block';
    }

    confirmDeleteBtn.addEventListener('click', function() {
        showLoadingSpinner();
        fetch(`/animais/${animalIdToDelete}`, {
            method: 'DELETE'
        })
            .then(() => {
                animals = animals.filter(a => a.id != animalIdToDelete);
                renderAnimals();
                deleteConfirmModal.style.display = 'none';
            })
            .catch(error => {
                console.error('Erro ao excluir animal:', error);
                hideLoadingSpinner();
                deleteConfirmModal.style.display = 'none';
            });
    });

    cancelDeleteBtn.addEventListener('click', function() {
        deleteConfirmModal.style.display = 'none';
    });

    addAnimalBtn.addEventListener('click', function() {
        editMode = false;
        currentAnimalId = null;
        animalForm.reset();
        modalTitle.textContent = 'Adicionar Animal';
        animalModal.style.display = 'block';
        imagemPreview.style.display = 'none';
        imagemAtualInput.value = '';  // Limpar o campo oculto ao adicionar um novo animal
    });

    closeBtn.forEach(btn => {
        btn.addEventListener('click', function() {
            animalModal.style.display = 'none';
            deleteConfirmModal.style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target == animalModal || event.target == deleteConfirmModal) {
            animalModal.style.display = 'none';
            deleteConfirmModal.style.display = 'none';
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
        } else if (editMode && imagemAtualInput.value) {
            // Se estiver no modo de edição e não houver uma nova imagem selecionada, envie a imagem atual
            var byteCharacters = atob(imagemAtualInput.value);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            var blob = new Blob([byteArray], {type: 'image/jpeg'});
            formData.append('imagem', blob, 'imagem.jpg');
        }

        const url = editMode ? `/animais/${currentAnimalId}` : '/animais';
        const method = editMode ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (editMode) {
                    const index = animals.findIndex(a => a.id == currentAnimalId);
                    animals[index] = data;
                } else {
                    animals.push(data);
                }
                renderAnimals();
                animalModal.style.display = 'none';
            })
            .catch(error => {
                document.getElementById('message').textContent = `Erro ao ${editMode ? 'atualizar' : 'cadastrar'} animal.`;
                console.error('Erro:', error);
                hideLoadingSpinner();
            });
    });

    fetchAnimals();
});