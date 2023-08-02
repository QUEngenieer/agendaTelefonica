const formContato = document.getElementById('form-contato');
const tabelaContatos = document.getElementById('tabela-contatos');
let contatos = [];

formContato.addEventListener('submit', function (e) {
    e.preventDefault();

    const inputNome = document.getElementById('nome');
    const inputTelefone = document.getElementById('telefone');
    const nome = inputNome.value;
    const telefone = inputTelefone.value;

    if (nomeJaExiste(nome)) {
        alert(`O nome "${nome}" já existe na lista de contatos.`);
        return;
    }

    if (numeroJaExiste(telefone)) {
        alert(`O número "${telefone}" já existe na lista de contatos.`);
        return;
    }

    if (telefone.length < 9 || telefone.length > 12) {
        alert('Digite o número de telefone corretamente.');
        return;
    }

    contatos.push({ nome, telefone });

    inputNome.value = '';
    inputTelefone.value = '';

    atualizarTabela();
});

function nomeJaExiste(nome) {
    return contatos.some((contato) => contato.nome === nome);
}

function numeroJaExiste(telefone) {
    return contatos.some((contato) => contato.telefone === telefone);
}

function editarContato(index) {
    const contato = contatos[index];

    const inputNome = document.getElementById('nome');
    const inputTelefone = document.getElementById('telefone');
    inputNome.value = contato.nome;
    inputTelefone.value = contato.telefone;

    contatos.splice(index, 1);

    atualizarTabela();
}

function excluirContato(index) {
    contatos.splice(index, 1);

    atualizarTabela();
}

function atualizarTabela() {
    tabelaContatos.innerHTML = '';

    contatos.forEach((contato, index) => {
        const linha = document.createElement('tr');
        const colunaNome = document.createElement('td');
        const colunaTelefone = document.createElement('td');
        const colunaAcoes = document.createElement('td');

        colunaNome.textContent = contato.nome;
        colunaTelefone.textContent = contato.telefone;

        const botaoEditar = document.createElement('button');
        const imagemEditar = document.createElement('img');
        imagemEditar.src = './imagens/lapis.png';
        imagemEditar.alt = 'Editar';
        botaoEditar.appendChild(imagemEditar);
        botaoEditar.addEventListener('click', () => editarContato(index));

        const botaoExcluir = document.createElement('button');
        const imagemExcluir = document.createElement('img');
        imagemExcluir.src = './imagens/lixeira.png';
        imagemExcluir.alt = 'Excluir';
        botaoExcluir.appendChild(imagemExcluir);
        botaoExcluir.addEventListener('click', () => excluirContato(index));

        colunaAcoes.appendChild(botaoEditar);
        colunaAcoes.appendChild(botaoExcluir);

        linha.appendChild(colunaNome);
        linha.appendChild(colunaTelefone);
        linha.appendChild(colunaAcoes);

        tabelaContatos.appendChild(linha);
    });
}
