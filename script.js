function toggleAnswer(id, button) {

    const answer = document.getElementById(id);
    const item = button.closest('.faq-item');
    const isOpen = answer.classList.toggle("show");
    const state = isOpen ? "open" : "closed";

    switch (state) {
        case "open":
            item && item.classList.add('active');
            button && button.classList.add('active');
            button.textContent = "Read Less";
            button.setAttribute('aria-expanded', 'true');
            break;
        case "closed":
        default:
            item && item.classList.remove('active');
            button && button.classList.remove('active');
            button.textContent = "Read More";
            button.setAttribute('aria-expanded', 'false');
            break;
    }

    const isExpanded = answer.classList.contains('show') && (button !== null);
    if (isExpanded || !(button && item)) {
        button && button.style.transform === 'scale(1.02)' ? button.style.transform = 'scale(1)' : null;
    }

}

function toggleContentList(listId, button) {
    const list = document.getElementById(listId);

    if (!list || !button) {
        return;
    }

    const isExpanded = list.classList.toggle('list-collapsed') === false;
    const state = isExpanded ? 'expanded' : 'collapsed';

    switch (listId) {
        case 'project-list':
        case 'research-list':
            switch (state) {
                case 'expanded':
                    button.textContent = 'See Less';
                    button.setAttribute('aria-expanded', 'true');
                    break;
                case 'collapsed':
                default:
                    button.textContent = 'See More';
                    button.setAttribute('aria-expanded', 'false');
                    break;
            }
            break;
        default:
            break;
    }
}

const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

if (slides.length > 0) {
    let currentSlide = 0;

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlide);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    setInterval(() => showSlide(currentSlide + 1), 5000);
}

const buttons = document.getElementById("btn1");
const target = document.getElementById("featuresfirst");

if (buttons && target) {
    buttons.addEventListener('click', () => {
        target.scrollIntoView({ behavior: "smooth" });
    });
}

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function searchSite() {
    const query = (searchInput.value || "").trim().toLowerCase();

    if (!query) {
        return;
    }

    let targetSection = null;

    switch (true) {
        case query.includes("home") || query.includes("featuresfirst"):
            targetSection = document.getElementById("initial");
            break;
        case query.includes("about") || query.includes("purpose"):
            targetSection = document.getElementById("purpose");
            break;
        case query.includes("portfolio") || query.includes("service"):
            targetSection = document.getElementById("portfolio");
            break;
        case query.includes("content") || query.includes("streaming"):
            targetSection = document.getElementById("streaming");
            break;
        case query.includes("mission"):
            targetSection = document.getElementById("Mission");
            break;
        case query.includes("vision"):
            targetSection = document.getElementById("Vision");
            break;
        case query.includes("contact"):
            targetSection = document.getElementById("contact");
            break;
        default:
            targetSection = document.getElementById("featuresfirst");
            break;
    }

    if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", searchSite);
    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            searchSite();
        }
    });
}

const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    heroVideo.playbackRate = 0.9;
}

const teamPortfolioSlides = Array.from(document.querySelectorAll('.team-portfolio-slide'));
const teamPortfolioDots = Array.from(document.querySelectorAll('.team-portfolio-dot'));
const teamPortfolioPrevious = document.querySelector('.portfolio-prev');
const teamPortfolioNext = document.querySelector('.portfolio-next');
const teamPortfolioCarousel = document.querySelector('.team-portfolio-carousel');
const portfolioLightbox = document.getElementById('portfolioLightbox');
const portfolioLightboxImage = document.querySelector('.portfolio-lightbox-image');
const portfolioLightboxClose = document.querySelector('.portfolio-lightbox-close');
let currentTeamPortfolio = 0;
let teamPortfolioTimer;

function showTeamPortfolio(index) {
    if (teamPortfolioSlides.length === 0) {
        return;
    }

    currentTeamPortfolio = (index + teamPortfolioSlides.length) % teamPortfolioSlides.length;

    teamPortfolioSlides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === currentTeamPortfolio;
        slide.classList.toggle('active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
    });

    teamPortfolioDots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === currentTeamPortfolio;
        dot.classList.toggle('active', isActive);
        if (isActive) {
            dot.setAttribute('aria-current', 'true');
        } else {
            dot.removeAttribute('aria-current');
        }
    });
}

function stopTeamPortfolioTimer() {
    window.clearInterval(teamPortfolioTimer);
}

function startTeamPortfolioTimer() {
    stopTeamPortfolioTimer();
    teamPortfolioTimer = window.setInterval(() => {
        showTeamPortfolio(currentTeamPortfolio + 1);
    }, 6000);
}

function restartTeamPortfolioTimer() {
    stopTeamPortfolioTimer();
    window.setTimeout(startTeamPortfolioTimer, 9000);
}

function openPortfolioLightbox(image) {
    if (!portfolioLightbox || !portfolioLightboxImage) {
        return;
    }

    portfolioLightboxImage.src = image.src;
    portfolioLightboxImage.alt = image.alt;
    portfolioLightbox.hidden = false;
    if (portfolioLightboxClose) {
        portfolioLightboxClose.focus();
    }
}

function closePortfolioLightbox() {
    if (portfolioLightbox) {
        portfolioLightbox.hidden = true;
    }
}

if (teamPortfolioSlides.length > 0 && teamPortfolioPrevious && teamPortfolioNext) {
    teamPortfolioPrevious.addEventListener('click', () => {
        showTeamPortfolio(currentTeamPortfolio - 1);
        restartTeamPortfolioTimer();
    });

    teamPortfolioNext.addEventListener('click', () => {
        showTeamPortfolio(currentTeamPortfolio + 1);
        restartTeamPortfolioTimer();
    });

    teamPortfolioDots.forEach((dot, dotIndex) => {
        dot.addEventListener('click', () => {
            showTeamPortfolio(dotIndex);
            restartTeamPortfolioTimer();
        });
    });

    teamPortfolioSlides.forEach((slide) => {
        const viewButton = slide.querySelector('.portfolio-view-button');
        const image = slide.querySelector('img');
        if (viewButton && image) {
            viewButton.addEventListener('click', () => openPortfolioLightbox(image));
        }
    });

    if (teamPortfolioCarousel) {
        teamPortfolioCarousel.addEventListener('mouseenter', stopTeamPortfolioTimer);
        teamPortfolioCarousel.addEventListener('mouseleave', startTeamPortfolioTimer);
        teamPortfolioCarousel.addEventListener('focusin', stopTeamPortfolioTimer);
        teamPortfolioCarousel.addEventListener('focusout', (event) => {
            if (!teamPortfolioCarousel.contains(event.relatedTarget)) {
                startTeamPortfolioTimer();
            }
        });
    }

    showTeamPortfolio(0);
    startTeamPortfolioTimer();
}

if (portfolioLightboxClose) {
    portfolioLightboxClose.addEventListener('click', closePortfolioLightbox);
}

document.querySelector('[data-close-portfolio]')?.addEventListener('click', closePortfolioLightbox);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && portfolioLightbox && !portfolioLightbox.hidden) {
        closePortfolioLightbox();
    }
});
