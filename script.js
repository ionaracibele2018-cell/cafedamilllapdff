const SENHA_ADMIN = "cafeDAmilla883982";

// COLOQUE O WHATSAPP DA LOJA AQUI
const WHATSAPP_DA_LOJA = "55SEUNUMERO";

const CHAVE_PRODUTOS = "cafeMillaProdutos";

const produtosIniciais = [

    // SALGADOS FITNESS

    {id: 1, nome: "Coxinha fit de macaxeira com frango", categoria: "Salgados fitness", preco: 8},
    {id: 2, nome: "Coxinha fit de macaxeira com carne de sol", categoria: "Salgados fitness", preco: 9},
    {id: 3, nome: "Pastel de grão-de-bico com frango cremoso", categoria: "Salgados fitness", preco: 8},
    {id: 4, nome: "Pastel de grão-de-bico com carne de sol", categoria: "Salgados fitness", preco: 9},
    {id: 5, nome: "Empada fit de frango", categoria: "Salgados fitness", preco: 8},
    {id: 6, nome: "Empada fit de carne de sol", categoria: "Salgados fitness", preco: 9},
    {id: 7, nome: "Empada fit de palmito e queijo", categoria: "Salgados fitness", preco: 9},
    {id: 8, nome: "Sanduíche natural", categoria: "Salgados fitness", preco: 15},
    {id: 9, nome: "Pão artesanal (sob encomenda)", categoria: "Salgados fitness", preco: null},
    {id: 10, nome: "Macaxeira, batata-doce ou jerimum", categoria: "Salgados fitness", preco: 25},

    // BOLOS FUNCIONAIS

    {id: 11, nome: "Bolo pequeno", categoria: "Bolos funcionais", preco: 25},
    {id: 12, nome: "Bolo médio", categoria: "Bolos funcionais", preco: 38},

    // SOBREMESAS SAUDÁVEIS

    {id: 13, nome: "Brownie de pote - doce de leite", categoria: "Sobremesas saudáveis", preco: 20},
    {id: 14, nome: "Brownie de pote - ganache 70%", categoria: "Sobremesas saudáveis", preco: 20},
    {id: 15, nome: "Brownie de pote - morangos e ganache", categoria: "Sobremesas saudáveis", preco: 22},
    {id: 16, nome: "Cocada cremosa", categoria: "Sobremesas saudáveis", preco: 20},
    {id: 17, nome: "Cookies funcionais (2 unidades)", categoria: "Sobremesas saudáveis", preco: 12},
    {id: 18, nome: "Cookie red velvet com gotas de chocolate branco", categoria: "Sobremesas saudáveis", preco: 15},
    {id: 19, nome: "Cookie FUDGE (10 unidades)", categoria: "Sobremesas saudáveis", preco: 18},
    {id: 20, nome: "Brownie na marmita", categoria: "Sobremesas saudáveis", preco: 15},
    {id: 21, nome: "Fatia de prestígio gelado", categoria: "Sobremesas saudáveis", preco: 25},

    // BEBIDAS

    {id: 22, nome: "Yo pro", categoria: "Bebidas", preco: 10},
    {id: 23, nome: "Refrigerante zero", categoria: "Bebidas", preco: 6},
    {id: 24, nome: "Capuccino", categoria: "Bebidas", preco: 7},
    {id: 25, nome: "Capuccino pequeno", categoria: "Bebidas", preco: 5},
    {id: 26, nome: "Água mineral", categoria: "Bebidas", preco: 3},
    {id: 27, nome: "Água com gás", categoria: "Bebidas", preco: 4},
    {id: 28, nome: "Suco natural", categoria: "Bebidas", preco: 7},
    {id: 29, nome: "Suco ao leite", categoria: "Bebidas", preco: 8}

];

let produtos = carregarProdutos();
let fotoTemporaria = "";

// CARREGAR PRODUTOS

function carregarProdutos() {

    try {
        const dados = localStorage.getItem(CHAVE_PRODUTOS);

        return dados ? JSON.parse(dados) : [...produtosIniciais];

    } catch (erro) {

        return [...produtosIniciais];

    }

}

function salvarDados() {

    try {

        localStorage.setItem(
            CHAVE_PRODUTOS,
            JSON.stringify(produtos)
        );

        return true;

    } catch (erro) {

        alert("Não foi possível salvar. Tente uma imagem menor.");

        return false;

    }

}

// CARDÁPIO

function mostrarCardapio() {

    const area = document.getElementById("cardapio");

    area.innerHTML = "";

    const categorias = [
        "Salgados fitness",
        "Bolos funcionais",
        "Sobremesas saudáveis",
        "Bebidas"
    ];

    categorias.forEach(categoria => {

        const itens = produtos.filter(
            p => p.categoria === categoria
        );

        if (!itens.length) return;

        const secao = document.createElement("section");

        secao.className = "categoria";

        const titulo = document.createElement("h3");

        titulo.textContent = categoria;

        secao.appendChild(titulo);

        itens.forEach(produto => {

            const linha = document.createElement("div");

            linha.className = "produto";

            const nome = document.createElement("span");

            nome.className = "produto-nome";

            nome.textContent = produto.nome;

            const preco = document.createElement("span");

            preco.className = "produto-preco";

            preco.textContent = produto.preco === null
                ? "Sob encomenda"
                : Number(produto.preco).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                });

            linha.append(nome, preco);

            secao.appendChild(linha);

        });

        area.appendChild(secao);

    });

    if (!area.children.length) {

        area.textContent = "Nosso cardápio está sendo atualizado. ♡";

    }

}

// LOGIN

function abrirLogin() {

    document.getElementById("modalLogin").classList.add("ativo");

}

function fecharModais() {

    document.querySelectorAll(".modal").forEach(modal => {

        modal.classList.remove("ativo");

    });

}

function entrarAdmin() {

    const senha = document.getElementById("senha").value;

    if (senha === SENHA_ADMIN) {

        document.getElementById("modalLogin").classList.remove("ativo");

        document.getElementById("modalAdmin").classList.add("ativo");

        document.getElementById("erroSenha").textContent = "";

        document.getElementById("senha").value = "";

        mostrarListaAdmin();

    } else {

        document.getElementById("erroSenha").textContent =
            "Senha incorreta. Tente novamente.";

    }

}

function sairAdmin() {

    limparFormulario();

    fecharModais();

}

// ADICIONAR E EDITAR PRODUTOS

function salvarProduto() {

    const id = document.getElementById("produtoId").value;

    const nome = document.getElementById("nomeProduto").value.trim();

    const categoria = document.getElementById("categoriaProduto").value;

    const valor = document.getElementById("precoProduto").value;

    if (!nome) {

        alert("Digite o nome do produto.");

        return;

    }

    if (valor !== "" && Number(valor) < 0) {

        alert("Digite um preço válido.");

        return;

    }

    const preco = valor === "" ? null : Number(valor);

    if (id) {

        const indice = produtos.findIndex(
            p => p.id === Number(id)
        );

        if (indice !== -1) {

            produtos[indice] = {

                ...produtos[indice],

                nome,
                categoria,
                preco,

                foto: fotoTemporaria || produtos[indice].foto || ""

            };

        }

    } else {

        produtos.push({

            id: Date.now(),

            nome,
            categoria,
            preco,

            foto: fotoTemporaria

        });

    }

    if (!salvarDados()) return;

    alert("Produto salvo com sucesso!");

    limparFormulario();

    mostrarCardapio();

    mostrarListaAdmin();

}

// EDITAR

function editarProduto(id) {

    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    document.getElementById("produtoId").value = produto.id;

    document.getElementById("nomeProduto").value = produto.nome;

    document.getElementById("categoriaProduto").value = produto.categoria;

    document.getElementById("precoProduto").value =
        produto.preco === null ? "" : produto.preco;

    fotoTemporaria = produto.foto || "";

    const preview = document.getElementById("previewFoto");

    if (fotoTemporaria) {

        preview.src = fotoTemporaria;

        preview.style.display = "block";

    } else {

        preview.style.display = "none";

    }

    document.getElementById("nomeProduto").focus();

}

// EXCLUIR

function excluirProduto(id) {

    if (!confirm("Deseja realmente excluir este produto?")) return;

    produtos = produtos.filter(p => p.id !== id);

    if (!salvarDados()) return;

    mostrarCardapio();

    mostrarListaAdmin();

}

// LIMPAR

function limparFormulario() {

    document.getElementById("produtoId").value = "";

    document.getElementById("nomeProduto").value = "";

    document.getElementById("precoProduto").value = "";

    document.getElementById("fotoProduto").value = "";

    fotoTemporaria = "";

    const preview = document.getElementById("previewFoto");

    preview.src = "";

    preview.style.display = "none";

}

// LISTA ADMINISTRATIVA

function mostrarListaAdmin() {

    const lista = document.getElementById("listaAdmin");

    lista.innerHTML = "";

    produtos.forEach(produto => {

        const item = document.createElement("div");

        item.className = "item-admin";

        if (produto.foto) {

            const imagem = document.createElement("img");

            imagem.src = produto.foto;

            imagem.alt = produto.nome;

            item.appendChild(imagem);

        }

        const info = document.createElement("div");

        info.className = "item-admin-info";

        const nome = document.createElement("strong");

        nome.textContent = produto.nome;

        const detalhes = document.createElement("p");

        detalhes.textContent = produto.categoria + " • " +

            (produto.preco === null
                ? "Sob encomenda"
                : "R$ " + Number(produto.preco).toFixed(2).replace(".", ","));

        info.append(nome, detalhes);

        const editar = document.createElement("button");

        editar.className = "editar";

        editar.textContent = "Editar";

        editar.onclick = () => editarProduto(produto.id);

        const excluir = document.createElement("button");

        excluir.className = "excluir";

        excluir.textContent = "Excluir";

        excluir.onclick = () => excluirProduto(produto.id);

        item.append(info, editar, excluir);

        lista.appendChild(item);

    });

}

// FOTOS

document.getElementById("fotoProduto").addEventListener("change", function() {

    const arquivo = this.files[0];

    if (!arquivo) return;

    if (!arquivo.type.startsWith("image/")) {

        alert("Selecione uma imagem válida.");

        this.value = "";

        return;

    }

    if (arquivo.size > 500 * 1024) {

        alert("Escolha uma foto de até 500 KB.");

        this.value = "";

        return;

    }

    const leitor = new FileReader();

    leitor.onload = function(evento) {

        fotoTemporaria = evento.target.result;

        const preview = document.getElementById("previewFoto");

        preview.src = fotoTemporaria;

        preview.style.display = "block";

    };

    leitor.readAsDataURL(arquivo);

});

// ENTREGA

function abrirEntrega() {

    document.getElementById("modalEntrega").classList.add("ativo");

    document.getElementById("erroEntrega").textContent = "";

}

function horarioDisponivel(horario) {

    if (!horario) return false;

    const [hora, minuto] = horario.split(":").map(Number);

    const minutos = hora * 60 + minuto;

    const manha = minutos >= 660 && minutos <= 740;

    const tarde = minutos >= 840 && minutos <= 1020;

    return manha || tarde;

}

function enviarEntrega() {

    const nome = document.getElementById("clienteNome").value.trim();

    const telefone = document.getElementById("clienteTelefone").value.trim();

    const endereco = document.getElementById("clienteEndereco").value.trim();

    const horario = document.getElementById("horarioEntrega").value;

    const erro = document.getElementById("erroEntrega");

    erro.textContent = "";

    if (!nome || !telefone || !endereco || !horario) {

        erro.textContent = "Preencha todos os campos para continuar.";

        return;

    }

    if (!/^[0-9()+\s-]{10,20}$/.test(telefone)) {

        erro.textContent = "Digite um telefone válido.";

        return;

    }

    if (!horarioDisponivel(horario)) {

        erro.textContent = "Entregas não disponíveis pra esse horário.";

        return;

    }

    if (WHATSAPP_DA_LOJA === "55SEUNUMERO") {

        erro.textContent =
            "Configure o WhatsApp da loja no arquivo script.js.";

        return;

    }

    const mensagem =

`Olá! Gostaria de solicitar uma entrega pelo Café da Milla.

Nome: ${nome}

Telefone: ${telefone}

Endereço: ${endereco}

Horário desejado: ${horario}

Aguardo a confirmação. Obrigado(a)!`;

    const link = "https://wa.me/" + WHATSAPP_DA_LOJA +
        "?text=" + encodeURIComponent(mensagem);

    window.open(link, "_blank");

}

// INICIALIZAÇÃO

mostrarCardapio();

document.querySelectorAll(".modal").forEach(modal => {

    modal.addEventListener("click", function(evento) {

        if (evento.target === modal) {

            fecharModais();

        }

    });

});