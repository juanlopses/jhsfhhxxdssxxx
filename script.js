// Animaciones de entrada al hacer scroll
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

// Slider
const slides = document.querySelectorAll('.slide');
const prevSlideBtn = document.querySelector('.prev-slide');
const nextSlideBtn = document.querySelector('.next-slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

nextSlideBtn.addEventListener('click', nextSlide);
prevSlideBtn.addEventListener('click', prevSlide);
setInterval(nextSlide, 5000);
showSlide(currentSlide);

// Efecto parallax
window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.parallax-bg');
    const scrollPosition = window.pageYOffset;
    parallax.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});

// Carrito de compras
let cart = [];
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeModal = document.querySelector('.close-modal');
const checkoutBtn = document.getElementById('checkout');

function updateCart() {
    cartCount.textContent = cart.length;
    cartItems.innerHTML = cart.map(item => `<p>${item.name} - $${item.price}</p>`).join('');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total.toFixed(2);
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        cart.push({ name, price });
        updateCart();
        button.textContent = 'Añadido!';
        button.disabled = true;
        setTimeout(() => {
            button.textContent = 'Añadir al carrito';
            button.disabled = false;
        }, 1000);
    });
});

document.querySelector('.cart-icon').addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

checkoutBtn.addEventListener('click', () => {
    alert('Compra finalizada con éxito.');
    cart = [];
    updateCart();
    cartModal.style.display = 'none';
});

// Formulario de contacto
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const button = e.target.querySelector('button');
    button.textContent = 'Enviando...';
    setTimeout(() => {
        alert('Mensaje enviado con éxito.');
        button.textContent = 'Enviar mensaje';
        e.target.reset();
    }, 1000);
});

// Menú hamburguesa
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});
