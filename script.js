// Animação: aparecer ao rolar (IntersectionObserver)
(function(){
    // Seleciona os cards e títulos para animar
    const selectors = ['.card', '.title', '.fade-in', '.reveal-on-scroll'];
    const elements = document.querySelectorAll(selectors.join(','));

    if (!elements.length) return;

    // Adiciona a classe base 'reveal' (que está no seu CSS com opacity: 0)
    elements.forEach(el => el.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Quando o elemento entra na tela, ganha opacity: 1
                    entry.target.classList.add('visible');
                    // Opcional: Parar de observar após aparecer (melhora performance)
                    io.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.10 }); // 10% do elemento visível dispara a animação

        elements.forEach(el => io.observe(el));
    } else {
        // Fallback para navegadores antigos: mostrar todos imediatamente
        elements.forEach(el => el.classList.add('visible'));
    }
})();