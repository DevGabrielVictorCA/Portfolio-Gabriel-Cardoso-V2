// VARIÁVEIS

// Menu
const btnMenu = document.querySelector('.btn-menu');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('header');
const voltarAoTopoBtn = document.getElementById('voltar-ao-topo');

let ultimoScroll = 0;

// Modal projeto
const meuModal = document.getElementById('modal-projeto');
const abrirModal = document.querySelectorAll('.abrir-projeto');
const fecharModal = document.getElementById('fechar-projeto');
const voltarModalBTN = document.getElementById('voltar-projeto');
const avancarModalBTN = document.getElementById('avancar-projeto'); 
const conteudoModal = document.querySelector('.conteudo-projeto')
const templateModal = document.querySelectorAll('.template-projeto')

let numeroModal = undefined;

// MENU
const toggleMenu = () => {
    const menuAberto = btnMenu.classList.toggle('itens-abertos');
    navbar.classList.toggle('itens-abertos');
    document.body.classList.toggle('itens-abertos');

    if (menuAberto) {
        header.classList.remove('escondido');
        header.classList.add('descoberto');
    }
};

const closeMenu = () => {
    btnMenu.classList.remove('itens-abertos');
    navbar.classList.remove('itens-abertos');
    document.body.classList.remove('itens-abertos');
};

btnMenu.addEventListener('click', toggleMenu);

navbar.addEventListener('click', (e) => {
    if (e.target.closest('.navlink')) closeMenu();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
});

// SCROLL
window.addEventListener('scroll', () => {
    const scrollAtual = window.scrollY;

    movimentoHeader(scrollAtual)
    voltarAoTopoBtn.classList.toggle('ativo', scrollAtual > 300)
});

// Voltar ao topo
voltarAoTopoBtn.addEventListener('click', ()=>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

// HEADER
function movimentoHeader(scrollAtual){
    if (document.body.classList.contains('itens-abertos')) return;

    if (scrollAtual <= 0) { // Remove as classes no topo
        header.classList.remove('descoberto', 'escondido');
        ultimoScroll = scrollAtual;
        return;
    }

    if (Math.abs(scrollAtual - ultimoScroll) < 5) return; // Microinterações

    if (scrollAtual <= 100) { // Altura minima
        header.classList.remove('escondido');
        ultimoScroll = scrollAtual;
        return;
    }

    if (scrollAtual > ultimoScroll) {
        // Descendo
        header.classList.add('escondido');
        header.classList.remove('descoberto');
    } else {
        // Subindo
        header.classList.remove('escondido');
        header.classList.add('descoberto');
    }

    ultimoScroll = scrollAtual;
}

// MODAL PROJETO
function renderModal(index){
    if (!templateModal[index]) return;

    conteudoModal.innerHTML = '';
    const clone = templateModal[index].content.cloneNode(true)
    conteudoModal.appendChild(clone)

    document.body.classList.add('itens-abertos');
}

abrirModal.forEach(botao => {
    botao.addEventListener('click', (e) => {
        numeroModal = Number(e.currentTarget.dataset.indexProjeto) || 0;
        renderModal(numeroModal);
        meuModal.showModal();

        requestAnimationFrame(() => {
            meuModal.classList.add("active");
        });
    });
});

fecharModal.addEventListener('click', ()=> {
    numeroModal = undefined;
    document.body.classList.remove('itens-abertos');
    meuModal.classList.remove("active");

    setTimeout(() => {
        meuModal.close();
    }, 300);
})

voltarModalBTN.addEventListener('click', ()=>{
    numeroModal--
    if(numeroModal < 0) numeroModal = templateModal.length - 1;
    
    renderModal(numeroModal)
})

avancarModalBTN.addEventListener('click', ()=>{
    numeroModal++
    if(numeroModal === templateModal.length) numeroModal = 0
        
    renderModal(numeroModal)
})
