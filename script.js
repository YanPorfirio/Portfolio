// Carrossel de Projetos - controla visibilidade dos botões conforme scroll
const carrossel = document.getElementById('carrossel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const scrollAmount = 400; // Distância de scroll por clique (ajustada)
const scrollUpdateDelay = 750; // Delay (ms) para atualizar visibilidade após clique (sincronizado com CSS)

if (!carrossel) {
    console.warn('Elemento #carrossel não encontrado. Funções de carrossel desativadas.');
} else {
    // Atualiza visibilidade dos botões com base na posição de scroll
    const updateButtons = () => {
        if (!prevBtn || !nextBtn) return;

        // Se não há overflow horizontal, esconder ambos os botões via classe
        if (carrossel.scrollWidth <= carrossel.clientWidth + 1) {
            prevBtn.classList.add('hidden');
            nextBtn.classList.add('hidden');
            return;
        }

        // Mostrar/ocultar botão anterior via classe
        if (carrossel.scrollLeft <= 5) {
            prevBtn.classList.add('hidden');
        } else {
            prevBtn.classList.remove('hidden');
        }

        // Mostrar/ocultar botão próximo via classe
        if (carrossel.scrollLeft + carrossel.clientWidth >= carrossel.scrollWidth - 5) {
            nextBtn.classList.add('hidden');
        } else {
            nextBtn.classList.remove('hidden');
        }
    };

    // Atualiza enquanto o usuário faz scroll manual
    carrossel.addEventListener('scroll', updateButtons);
    // Atualiza em redimensionamento (janelas responsivas)
    window.addEventListener('resize', updateButtons);
    // Estado inicial
    updateButtons();

    // Rolagem suave para esquerda
    prevBtn.addEventListener('click', () => {
        const newPos = Math.max(0, carrossel.scrollLeft - scrollAmount);
        carrossel.scrollTo({ left: newPos, behavior: 'smooth' });
        // Atualiza após a animação começar (pequeno delay)
        setTimeout(updateButtons, scrollUpdateDelay);
    });

    // Rolagem suave para direita
    nextBtn.addEventListener('click', () => {
        const maxScroll = carrossel.scrollWidth - carrossel.clientWidth;
        const newPos = Math.min(maxScroll, carrossel.scrollLeft + scrollAmount);
        carrossel.scrollTo({ left: newPos, behavior: 'smooth' });
        setTimeout(updateButtons, scrollUpdateDelay);
    });
}


// Animação: aparecer ao rolar (IntersectionObserver) - só primeira vez
(function(){
    const selectors = ['.card', '.title', '.image'];
    const elements = document.querySelectorAll(selectors.join(','));
    if (!elements.length) return;
    elements.forEach(el => el.classList.add('reveal'));
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.15 });
        elements.forEach(el => io.observe(el));
    } else {
        // fallback: mostrar todos
        elements.forEach(el => el.classList.add('visible'));
    }
})();
