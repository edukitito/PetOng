document.addEventListener('DOMContentLoaded', function() {
    //Elementos do HTML
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
    //Variaveis utilizadas
    let editMode = false;
    let currentAnimalId = null;
    let animals = [];
    let animalIdToDelete = null;

    //Gerenciamento do loading
    function showLoadingSpinner() {
        loadingSpinner.style.display = 'block';
        animalList.style.display = 'none';
    }

    function hideLoadingSpinner() {
        loadingSpinner.style.display = 'none';
        animalList.style.display = 'flex';
    }

    //Rendeniza os animais do modal
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

    //Função que busca os animais no backend
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

    function carregarDados() {
        showLoadingSpinner();
        fetch(`/ongs/cnpj/${sessionStorage.getItem('email')}`)
            .then(response => response.json())
            .then(data => {
                sessionStorage.setItem('ongId', data.ongid);
                renderAnimals();
            })
            .catch(error => {
                console.error('Erro ao carregar animais:', error);
                hideLoadingSpinner();
            });
    }

    //Função que monta o modal com as informações do animal para a edição
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

    //Função usada para deletar o Animal mostrando o modal de confirmação
    function handleDeleteAnimal(event) {
        animalIdToDelete = event.target.dataset.id;
        deleteConfirmModal.style.display = 'block';
    }



    //Função que envia o delete para o backend
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

    //Função para tirar o modal de deletar
    cancelDeleteBtn.addEventListener('click', function() {
        deleteConfirmModal.style.display = 'none';
    });

    //Modal para criar um animal
    addAnimalBtn.addEventListener('click', function() {
        editMode = false;
        currentAnimalId = null;
        animalForm.reset();
        modalTitle.textContent = 'Adicionar Animal';
        animalModal.style.display = 'block';
        imagemPreview.style.display = 'none';
        imagemAtualInput.value = '';  // Limpar o campo oculto ao adicionar um novo animal
    });

    //Fechamento de modais
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

    //Envia para o backend o animal passando como adição ou como edição
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

        // Expressão lambda para identificar se o edit mode está ativo e fazer uma ação
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

    // Faz o carregamento dos animais
    fetchAnimals();
    carregarDados();
});

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do HTML
    const modifyDataBtn = document.getElementById('modifyDataBtn');
    const modifyDataModal = document.getElementById('modifyDataModal');
    const modifyDataForm = document.getElementById('modifyDataForm');

    // Função para abrir o modal de modificação de dados da ONG e preencher o formulário
    modifyDataBtn.addEventListener('click', function() {
        // Buscar dados atuais da ONG no backend
        fetch(`/ongs/${sessionStorage.getItem('ongId')}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('ongNome').value = data.nome;
                document.getElementById('ongDescricao').value = data.descricao;
                document.getElementById('ongEmail').value = data.email;
                document.getElementById('ongTelefone').value = data.telefone;
                document.getElementById('ongEndereco').value = data.endereco;
                document.getElementById('ongCidade').value = data.cidade;
                document.getElementById('ongEstado').value = data.estado;
                document.getElementById('ongCnpj').value = data.cnpj;
                document.getElementById('ongPix').value = data.pix;
                document.getElementById('ongSenha').value = data.senha;
                modifyDataModal.style.display = 'block';
            })
            .catch(error => console.error('Erro ao carregar dados da ONG:', error));
    });

    // Fechar o modal de modificação de dados
    document.querySelectorAll('.closeBtn').forEach(btn => {
        btn.addEventListener('click', function() {
            modifyDataModal.style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target == modifyDataModal) {
            modifyDataModal.style.display = 'none';
        }
    });

    // Enviar dados atualizados da ONG para o backend
    modifyDataForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = {
            nome: document.getElementById('ongNome').value,
            descricao: document.getElementById('ongDescricao').value,
            email: document.getElementById('ongEmail').value,
            telefone: document.getElementById('ongTelefone').value,
            endereco: document.getElementById('ongEndereco').value,
            cidade: document.getElementById('ongCidade').value,
            estado: document.getElementById('ongEstado').value,
            cnpj: document.getElementById('ongCnpj').value,
            pix: document.getElementById('ongPix').value,
            senha: document.getElementById('ongSenha').value
        };

        fetch(`/ongs/${sessionStorage.getItem('ongId')}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Dados da ONG atualizados:', data);
                modifyDataModal.style.display = 'none';
                // Atualizar a página ou exibir uma mensagem de sucesso
            })
            .catch(error => console.error('Erro ao atualizar dados da ONG:', error));
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    const deleteAccountConfirmModal = document.getElementById('deleteAccountConfirmModal');
    const confirmAccountDeleteBtn = document.getElementById('confirmAccountDeleteBtn');
    const cancelBtns = document.querySelectorAll('.cancelBtn');
    const closeBtns = document.querySelectorAll('.closeBtn');

    // Abre o modal de confirmação de exclusão de conta
    deleteAccountBtn.addEventListener('click', function() {
        deleteAccountConfirmModal.style.display = 'block';
    });

    // Confirma a exclusão da conta
    confirmAccountDeleteBtn.addEventListener('click', function() {
        // Chame a API ou o método para deletar a conta aqui
        fetch(`/ongs/${sessionStorage.getItem('ongId')}`, {
            method: 'DELETE'
        }).then(response => {
            // Tratar a resposta
            if (response.ok) {
                // Redirecionar para a página de login ou inicial após a exclusão
                window.location.href = '/login.html';
            } else {
                alert('Erro ao tentar excluir a conta.');
            }
            deleteAccountConfirmModal.style.display = 'none';
        }).catch(error => {
            console.error('Erro ao excluir conta:', error);
            deleteAccountConfirmModal.style.display = 'none';
        });
    });

    // Fecha o modal de confirmação
    cancelBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            deleteAccountConfirmModal.style.display = 'none';
        });
    });

    // Fecha o modal se clicar no botão de fechar
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });

    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target.className === 'modal') {
            event.target.style.display = 'none';
        }
    });
});
