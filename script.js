/* ==========================================================
   SABOREANA
   Script Principal
========================================================== */

//==================================================
// CONFIGURAÇÃO
//==================================================

// Altere apenas estes valores quando quiser mudar os preços
const preco200 = 10.00;
const preco500 = 20.00;

// Número do WhatsApp
const numeroWhats = "5543991321383";

//==================================================
// PRODUTOS
//==================================================

const produtos = {

    "200": {
        nome: "Pudim Tradicional 200g",
        preco: preco200,
        quantidade: 0
    },

    "500": {
        nome: "Pudim Tradicional 500g",
        preco: preco500,
        quantidade: 0
    }

};

//==================================================
// FORMATAR MOEDA
//==================================================

function moeda(valor){

    return valor.toLocaleString("pt-BR",{

        style:"currency",

        currency:"BRL"

    });

}

//==================================================
// ALTERAR QUANTIDADE
//==================================================

function alterarQuantidade(id, valor){

    produtos[id].quantidade =
        Math.max(
            0,
            produtos[id].quantidade + valor
        );

    atualizarTela();

}

//==================================================
// ATUALIZAR TELA
//==================================================

function atualizarTela(){

    document.getElementById("preco200").textContent =
        preco200.toFixed(2).replace(".",",");

    document.getElementById("preco500").textContent =
        preco500.toFixed(2).replace(".",",");

    let total = 0;

    for(const id in produtos){

        const p = produtos[id];

        const subtotal =
            p.preco * p.quantidade;

        total += subtotal;

        document.getElementById("qtd"+id)
            .textContent = p.quantidade;

        document.getElementById("subtotal"+id)
            .textContent = moeda(subtotal);

        document.getElementById("resumo"+id)
            .textContent =
            `${p.quantidade} x ${moeda(p.preco)}`;

    }

    document.getElementById("totalGeral")
        .textContent = moeda(total);

}

//==================================================
// ENVIAR PEDIDO
//==================================================

function enviarPedido(){

    let texto =
`Olá!

Gostaria de fazer um pedido.

Pedido:

`;

    let possuiItem = false;

    let total = 0;

    for(const id in produtos){

        const p = produtos[id];

        if(p.quantidade > 0){

            possuiItem = true;

            texto +=
`• ${p.quantidade} ${p.nome}
`;

            total +=
                p.quantidade * p.preco;

        }

    }

    if(!possuiItem){

        alert(
            "Selecione pelo menos um produto."
        );

        return;

    }

    texto += `

Total: ${moeda(total)}

Obrigado!`;

    const url =
`https://wa.me/${numeroWhats}?text=${encodeURIComponent(texto)}`;

    window.open(
        url,
        "_blank"
    );

}

//==================================================
// INICIAR
//==================================================

atualizarTela();