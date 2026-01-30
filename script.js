// Carrossel de Projetos - adiciona checagens de existência de elementos
const carrossel = document.getElementById('carrossel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let scrollPosition = 0;
const scrollAmount = 500; // Distância de scroll por clique

if (carrossel) {
    // Atualizar posição quando fizer scroll manual
    carrossel.addEventListener('scroll', () => {
        scrollPosition = carrossel.scrollLeft;
    });
} else {
    console.warn('Elemento #carrossel não encontrado. Funções de carrossel desativadas.');
}

if (carrossel && prevBtn && nextBtn) {
    // Função para rolagem suave para esquerda (botão anterior)
    prevBtn.addEventListener('click', () => {
        scrollPosition = Math.max(0, scrollPosition - scrollAmount);
        carrossel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    });

    // Função para rolagem suave para direita (botão próximo)
    nextBtn.addEventListener('click', () => {
        scrollPosition = scrollPosition + scrollAmount;
        carrossel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    });
} else {
    if (!prevBtn || !nextBtn) console.warn('Botões do carrossel (#prevBtn ou #nextBtn) não encontrados.');
}
