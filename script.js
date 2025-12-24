document.addEventListener("DOMContentLoaded", () => {
  // ===== Animação de entrada das seções =====
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.2 });

  sections.forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
  });

  // ===== Lightbox =====
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const closeBtn = document.querySelector(".lightbox .close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const galleryImages = document.querySelectorAll(".galeria img");
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = "block";
    document.body.style.overflow = "hidden"; // trava scroll
    updateLightbox();
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto"; // libera scroll
  }

  function updateLightbox() {
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
      lightboxImg.src = galleryImages[currentIndex].src;
      lightboxCaption.innerText = galleryImages[currentIndex].alt;
      lightboxImg.style.opacity = 1;
    }, 200);
  }

  function showImage(index) {
    if (index >= galleryImages.length) index = 0;
    if (index < 0) index = galleryImages.length - 1;
    currentIndex = index;
    updateLightbox();
  }

  // Abrir lightbox ao clicar
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  // Navegação e fechamento
  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
  nextBtn.addEventListener("click", () => showImage(currentIndex + 1));
  window.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });

  // Teclado
  document.addEventListener("keydown", e => {
    if (lightbox.style.display === "block") {
      if (e.key === "ArrowLeft") showImage(currentIndex - 1);
      else if (e.key === "ArrowRight") showImage(currentIndex + 1);
      else if (e.key === "Escape") closeLightbox();
    }
  });

  // ===== Estilos para animação das seções =====
  const style = document.createElement("style");
  style.innerHTML = `
    .hidden { opacity: 0; transform: translateY(50px); transition: all 0.6s ease-out; }
    .show { opacity: 1; transform: translateY(0); }
    #lightbox img { transition: opacity 0.3s ease; }
  `;
  document.head.appendChild(style);
});

const cardsContainer = document.getElementById('cards');
const eventosSalvos = JSON.parse(localStorage.getItem('eventos')) || [];

// Salvar no localStorage
function salvarEventos() {
  localStorage.setItem('eventos', JSON.stringify(eventosSalvos));
}

// Renderizar os eventos
function renderEventos() {
  cardsContainer.innerHTML = '';
  eventosSalvos.forEach((evento, index) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <h3>${evento.titulo}</h3>
      <p>📅 ${evento.data}</p>
      <p>📍 ${evento.local}</p>
      <button class="excluir" onclick="excluirEvento(${index})">Excluir</button>
    `;
    cardsContainer.appendChild(div);
  });
}

// Excluir evento
function excluirEvento(index) {
  if (confirm('Tem certeza que deseja excluir este evento?')) {
    eventosSalvos.splice(index, 1);
    salvarEventos();
    renderEventos();
  }
}

// Adicionar evento
document.getElementById('formEvento').addEventListener('submit', e => {
  e.preventDefault();
  const titulo = document.getElementById('titulo').value;
  const data = document.getElementById('data').value;
  const local = document.getElementById('local').value;

  const novoEvento = { titulo, data, local };
  eventosSalvos.push(novoEvento);
  salvarEventos();
  renderEventos();

  e.target.reset();
});

// Inicializa a renderização
renderEventos();

const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");
const closeMenu = document.getElementById("closeMenu");
const overlay = document.getElementById("overlay");

menuToggle.addEventListener("click", () => {
  sideMenu.classList.add("active");
  overlay.classList.add("active");
});

closeMenu.addEventListener("click", closeAll);
overlay.addEventListener("click", closeAll);

function closeAll() {
  sideMenu.classList.remove("active");
  overlay.classList.remove("active");
}

// Fechar menu ao clicar em qualquer link do menu lateral
const sideMenuLinks = sideMenu.querySelectorAll("a");

sideMenuLinks.forEach(link => {
  link.addEventListener("click", () => {
    closeAll();
  });
});
