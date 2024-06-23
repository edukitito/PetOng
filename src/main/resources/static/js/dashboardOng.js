document.addEventListener('DOMContentLoaded', function() {
    const animalList = document.getElementById('animalList');
    const adoptionList = document.getElementById('adoptionList');
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
    const modifyDataBtn = document.getElementById('modifyDataBtn');
    const modifyDataModal = document.getElementById('modifyDataModal');
    const modifyDataForm = document.getElementById('modifyDataForm');
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    const deleteAccountConfirmModal = document.getElementById('deleteAccountConfirmModal');
    const confirmAccountDeleteBtn = document.getElementById('confirmAccountDeleteBtn');
    const cancelBtns = document.querySelectorAll('.cancelBtn');
    const adocoesBtn = document.getElementById('adocoesBtn');
    const mainTitle = document.getElementById('main-title');
    const dashboardBtn = document.getElementById('dashboardBtn');

    let editMode = false;
    let currentAnimalId = null;
    let animals = [];
    let adocoes = [];
    let animalIdToDelete = null;

    function showLoadingSpinner() {
        if (loadingSpinner) {
            loadingSpinner.style.display = 'block';
        }
        if (animalList) {
            animalList.style.display = 'none';
        }
        if (adoptionList) {
            adoptionList.style.display = 'none';
        }
    }

    function hideLoadingSpinner() {
        if (loadingSpinner) {
            loadingSpinner.style.display = 'none';
        }
        if (animalList) {
            animalList.style.display = 'flex';
        }
        if (adoptionList) {
            adoptionList.style.display = 'flex';
        }
    }

    function renderAnimals() {
        mainTitle.textContent = 'Meus Animais';
        if (adoptionList) {
            adoptionList.style.display = 'none';
            adoptionList.innerHTML = ''; // Limpa o conteúdo da lista de animais
        }
        if (animalList) {
            animalList.style.display = 'flex';
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
        }

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

    function renderAdocoes() {
        mainTitle.textContent = 'Adoções';
        if (animalList) {
            animalList.style.display = 'none';
            animalList.innerHTML = ''; // Limpa o conteúdo da lista de animais
        }
        if (adoptionList) {
            adoptionList.style.display = 'flex';
            adoptionList.innerHTML = ''; // Limpa o conteúdo da lista de adoções
            adocoes.forEach(adocao => {
                const adoptionCard = document.createElement('div');
                adoptionCard.classList.add('adoption-card');
                let imageSrc = '';
                if (adocao.animal.imagem) {
                    imageSrc = `data:image/jpeg;base64,${adocao.animal.imagem}`;
                } else {
                    imageSrc = 'https://via.placeholder.com/150'; // URL válida para a imagem de placeholder
                }
                adoptionCard.innerHTML = `
                <img src="${imageSrc}" alt="${adocao.animal.nome}">
                <h3>${adocao.animal.nome}</h3>
                <p>Raça: ${adocao.animal.raca}</p>
                <p>Espécie: ${adocao.animal.tipo}</p>
                <p>Sexo: ${adocao.animal.sexo}</p>
                <p>Idade: ${adocao.animal.idade} anos</p>
                <p>Descrição: ${adocao.animal.descricao}</p>
                <p>Usuário: ${adocao.usuario.nome}</p>
                <p>Email: ${adocao.usuario.email}</p>
                <p>Telefone: ${adocao.usuario.telefone}</p>
                <div class="status-section" style="color: ${adocao.statusAdocao === 'PENDENTE' ? 'red' : 'black'};">
                    <label for="statusAdocao">Status:</label>
                    <select class="statusAdocao" data-id="${adocao.id}">
                        <option value="PENDENTE" ${adocao.statusAdocao === 'PENDENTE' ? 'selected' : ''}>PENDENTE</option>
                        <option value="EM_ANDAMENTO" ${adocao.statusAdocao === 'EM_ANDAMENTO' ? 'selected' : ''}>EM ANDAMENTO</option>
                        <option value="CONCLUIDA" ${adocao.statusAdocao === 'CONCLUIDA' ? 'selected' : ''}>CONCLUÍDA</option>
                        <option value="CANCELADA" ${adocao.statusAdocao === 'CANCELADA' ? 'selected' : ''}>CANCELADA</option>
                    </select>
                </div>
                <div class="stage-section">
                    <label for="etapaAdocao">Etapa:</label>
                    <select class="etapaAdocao" data-id="${adocao.id}">
                        <option value="INICIO" ${adocao.etapaAdocao === 'INICIO' ? 'selected' : ''}>INÍCIO</option>
                        <option value="ENTREVISTA" ${adocao.etapaAdocao === 'ENTREVISTA' ? 'selected' : ''}>ENTREVISTA</option>
                        <option value="DOCUMENTACAO" ${adocao.etapaAdocao === 'DOCUMENTACAO' ? 'selected' : ''}>DOCUMENTAÇÃO</option>
                        <option value="ENTREGA" ${adocao.etapaAdocao === 'ENTREGA' ? 'selected' : ''}>ENTREGA</option>
                    </select>
                </div>
            `;
                adoptionList.appendChild(adoptionCard);
            });

            document.querySelectorAll('.statusAdocao').forEach(select => {
                select.addEventListener('change', handleChangeStatus);
            });

            document.querySelectorAll('.etapaAdocao').forEach(select => {
                select.addEventListener('change', handleChangeStage);
            });
        }

        hideLoadingSpinner();
    }

    function fetchAdocoes() {
        showLoadingSpinner();
        fetch(`/adocoes/ong/${sessionStorage.getItem('ongId')}`)
            .then(response => response.json())
            .then(data => {
                adocoes = data;
                renderAdocoes();
            })
            .catch(error => {
                console.error('Erro ao carregar adoções:', error);
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
                imagemAtualInput.value = animal.imagem;
            } else {
                imagemPreview.style.display = 'none';
                imagemAtualInput.value = '';
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
        imagemAtualInput.value = '';
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

    function carregarDados() {
        showLoadingSpinner();
        fetch(`/ongs/cnpj/${sessionStorage.getItem('email')}`)
            .then(response => response.json())
            .then(data => {
                sessionStorage.setItem('ongId', data.ongid);
                renderAnimals();
            })
            .catch(error => {
                console.error('Erro ao carregar dados da ONG:', error);
                hideLoadingSpinner();
            });
    }

    carregarDados();

    modifyDataBtn.addEventListener('click', function() {
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
            })
            .catch(error => console.error('Erro ao atualizar dados da ONG:', error));
    });

    deleteAccountBtn.addEventListener('click', function() {
        deleteAccountConfirmModal.style.display = 'block';
    });

    confirmAccountDeleteBtn.addEventListener('click', function() {
        fetch(`/ongs/${sessionStorage.getItem('ongId')}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
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

    cancelBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            deleteAccountConfirmModal.style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target.className === 'modal') {
            event.target.style.display = 'none';
        }
    });

    function handleChangeStatus(event) {
        const adocaoId = event.target.dataset.id;
        const newStatus = event.target.value;

        fetch(`/adocoes/${adocaoId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ statusAdocao: newStatus })
        })
            .then(response => {
                if (response.ok) {
                    alert('Status de adoção atualizado com sucesso!');
                } else {
                    alert('Erro ao atualizar status da adoção.');
                }
            })
            .catch(error => console.error('Erro ao atualizar status da adoção:', error));
    }

    function handleChangeStage(event) {
        const adocaoId = event.target.dataset.id;
        const newStage = event.target.value;

        fetch(`/adocoes/${adocaoId}/etapa`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ etapaAdocao: newStage })
        })
            .then(response => {
                if (response.ok) {
                    alert('Etapa de adoção atualizada com sucesso!');
                } else {
                    alert('Erro ao atualizar etapa da adoção.');
                }
            })
            .catch(error => console.error('Erro ao atualizar etapa da adoção:', error));
    }

    adocoesBtn.addEventListener('click', function() {
        animalList.style.display = 'none';
        fetchAdocoes();
    });

    dashboardBtn.addEventListener('click', function() {
        fetchAnimals();
    });
});