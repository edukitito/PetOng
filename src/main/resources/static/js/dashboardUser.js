document.addEventListener('DOMContentLoaded', function() {
    const animalList = document.getElementById('animalList');
    const loadingSpinner = document.getElementById('loading-spinner');
    const searchForm = document.getElementById('searchForm');
    const cidadeInput = document.getElementById('cidade');
    const estadoInput = document.getElementById('estado');
    const tipoInput = document.getElementById('tipo');

    const adoptConfirmModal = document.getElementById('adoptConfirmModal');
    const animalDetails = document.getElementById('animalDetails');
    const deleteAccountConfirmModal = document.getElementById('deleteAccountConfirmModal');
    const modifyDataModal = document.getElementById('modifyDataModal');
    const modifyDataForm = document.getElementById('modifyDataForm');
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    const confirmAccountDeleteBtn = document.getElementById('confirmAccountDeleteBtn');
    const modifyDataBtn = document.getElementById('modifyDataBtn');
    const closeBtns = document.querySelectorAll('.closeBtn');
    const cancelBtns = document.querySelectorAll('.cancelBtn');

    // Inicialmente esconde todos os modais
    function hideAllModals() {
        adoptConfirmModal.style.display = 'none';
        deleteAccountConfirmModal.style.display = 'none';
        modifyDataModal.style.display = 'none';
    }

    hideAllModals();

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
        fetch(`/animais/details/${animalId}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    showAdoptModal(data);
                } else {
                    alert('Erro ao carregar detalhes do animal.');
                }
            })
            .catch(error => console.error('Erro ao carregar detalhes do animal:', error));
    }

    // Exibe o modal de confirmação de adoção
    function showAdoptModal(data) {
        animalDetails.innerHTML = `
            <img src="data:image/jpeg;base64,${data.animalImagem}" alt="Imagem de ${data.animalNome}">
            <p><strong>Nome:</strong> ${data.animalNome}</p>
            <p><strong>Raça:</strong> ${data.animalRaca}</p>
            <p><strong>Sexo:</strong> ${data.animalSexo}</p>
            <p><strong>Descrição:</strong> ${data.animalDescricao}</p>
            <p><strong>Idade:</strong> ${data.animalIdade} anos</p>
            <p><strong>Tipo:</strong> ${data.animalTipo}</p>
            <h3>Dados da ONG</h3>
            <p><strong>Nome:</strong> ${data.ongNome}</p>
            <p><strong>Descrição:</strong> ${data.ongDescricao}</p>
            <p><strong>Email:</strong> ${data.ongEmail}</p>
            <p><strong>Telefone:</strong> ${data.ongTelefone}</p>
            <p><strong>Endereço:</strong> ${data.ongEndereco}</p>
            <p><strong>Cidade:</strong> ${data.ongCidade}</p>
            <p><strong>Estado:</strong> ${data.ongEstado}</p>
        `;
        adoptConfirmModal.style.display = 'block';
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

    function carregarDados() {
        showLoadingSpinner();
        fetch(`/users/email/${sessionStorage.getItem('email')}`)
            .then(response => response.json())
            .then(data => {
                sessionStorage.setItem('userId', data.id);
            })
            .catch(error => {
                console.error('Erro ao carregar user:', error);
                hideLoadingSpinner();
            });
    }

    // Inicia carregando todos os animais
    fetchAnimals();
    carregarDados();

    // Abre o modal de confirmação de exclusão de conta
    deleteAccountBtn.addEventListener('click', function() {
        deleteAccountConfirmModal.style.display = 'block';
    });

    // Confirma a exclusão da conta
    confirmAccountDeleteBtn.addEventListener('click', function() {
        fetch(`/users/${sessionStorage.getItem('userId')}`, {
            method: 'DELETE'
        }).then(response => {
            if (response.ok) {
                alert('Conta excluída');
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

    // Abre o modal de modificação de dados do usuário
    modifyDataBtn.addEventListener('click', function() {
        modifyDataModal.style.display = 'block';
        fetch(`/users/${sessionStorage.getItem('userId')}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('nome').value = data.nome;
                document.getElementById('email').value = data.email;
                document.getElementById('senha').value = data.senha;
                document.getElementById('telefone').value = data.telefone;
                document.getElementById('cpf').value = data.cpf;
                document.getElementById('endereco').value = data.endereco;
                document.getElementById('cidadeUser').value = data.cidade;
                document.getElementById('estadoUser').value = data.estado;
                document.getElementById('nickname').value = data.nickname;
            })
            .catch(error => console.error('Erro ao carregar dados do usuário:', error));
    });

    // Fecha o modal de modificação de dados
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            modifyDataModal.style.display = 'none';
            adoptConfirmModal.style.display = 'none';
            deleteAccountConfirmModal.style.display = 'none';
        });
    });

    cancelBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            modifyDataModal.style.display = 'none';
            adoptConfirmModal.style.display = 'none';
            deleteAccountConfirmModal.style.display = 'none';
        });
    });

    // Submete os dados modificados do usuário
    modifyDataForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(modifyDataForm);
        const data = Object.fromEntries(formData);

        fetch(`/users/${sessionStorage.getItem('userId')}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    alert('Dados atualizados com sucesso!');
                    modifyDataModal.style.display = 'none';
                } else {
                    alert('Erro ao atualizar dados.');
                }
            })
            .catch(error => console.error('Erro ao atualizar dados do usuário:', error));
    });

    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        if (event.target === modifyDataModal) {
            modifyDataModal.style.display = 'none';
        } else if (event.target === adoptConfirmModal) {
            adoptConfirmModal.style.display = 'none';
        } else if (event.target === deleteAccountConfirmModal) {
            deleteAccountConfirmModal.style.display = 'none';
        }
    });
});