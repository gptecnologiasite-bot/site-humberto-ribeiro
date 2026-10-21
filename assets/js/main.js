// ========================================
// HUMBERTO RIBEIRO - MAIN JS
// ========================================

// Mobile Menu
const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');
const menuOverlay = document.getElementById('menuOverlay');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileNav.classList.add('open');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (mobileClose) {
    mobileClose.addEventListener('click', closeMenu);
}

if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMenu);
}

function closeMenu() {
    mobileNav.classList.remove('open');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Mobile submenu toggle
document.querySelectorAll('.td-mobile-menu .has-sub > a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
    });
});

// Search toggle
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');

if (searchToggle) {
    searchToggle.addEventListener('click', () => {
        searchBar.classList.toggle('active');
        if (searchBar.classList.contains('active')) {
            searchInput.focus();
        }
    });
}

if (searchClose) {
    searchClose.addEventListener('click', () => {
        searchBar.classList.remove('active');
    });
}

// Scroll to top
const scrollUp = document.getElementById('scrollUp');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollUp.classList.add('visible');
    } else {
        scrollUp.classList.remove('visible');
    }
});

if (scrollUp) {
    scrollUp.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Trending bar navigation
const trendPrev = document.querySelector('.td-trend-prev');
const trendNext = document.querySelector('.td-trend-next');
const trendText = document.querySelector('.td-trending-text');

const trendingItems = [
    'O Fim da Espionagem no PC: Como Instalar o Vendefoul Wolf, o Sistema Leve e Sem Telemetria',
    'Novo Samsung Internet para PC com Galaxy AI: O Fim do Google Chrome?',
    'Como Criar o Pen Drive Técnico Definitivo em 2026: A Ferramenta que Salva Qualquer PC',
    'Como Reviver Seu PC Antigo com Bodhi Linux: O Sistema que Usa Menos de 1GB de RAM',
    'Droid Up: Como Ativar o Modo DeX / Desktop em Qualquer Smartphone Android pelo PC',
    'Quick CPU: Como Aumentar a Velocidade do Processador e Ativar o Turbo Boost no Windows'
];

let trendIndex = 0;

if (trendPrev && trendNext && trendText) {
    trendPrev.addEventListener('click', () => {
        trendIndex = (trendIndex - 1 + trendingItems.length) % trendingItems.length;
        trendText.textContent = trendingItems[trendIndex];
        trendText.style.opacity = '0';
        setTimeout(() => {
            trendText.style.opacity = '1';
        }, 150);
    });

    trendNext.addEventListener('click', () => {
        trendIndex = (trendIndex + 1) % trendingItems.length;
        trendText.textContent = trendingItems[trendIndex];
        trendText.style.opacity = '0';
        setTimeout(() => {
            trendText.style.opacity = '1';
        }, 150);
    });

    // Auto-rotate every 5 seconds
    setInterval(() => {
        trendIndex = (trendIndex + 1) % trendingItems.length;
        trendText.textContent = trendingItems[trendIndex];
    }, 5000);
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenu();
        if (searchBar) searchBar.classList.remove('active');
    }
});

// Animate posts on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.td-post:not(.td-post-text)').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

// Make text posts visible immediately
document.querySelectorAll('.td-post-text').forEach(el => {
    el.style.opacity = '1';
    el.style.animation = 'none';
});
