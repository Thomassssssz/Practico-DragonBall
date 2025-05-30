const apiBase = "https://dragonball-api.com/api/characters";
const container = document.getElementById("personajesContainer");
const form = document.getElementById("busquedaForm");
const input = document.getElementById("busquedaInput");
const mensaje = document.getElementById("mensaje");
const loader = document.getElementById("loader");

let pagina = 1;
let cargando = false;

document.addEventListener("DOMContentLoaded", () => {
cargarPersonajesIniciales();
});

form.addEventListener("submit", async (e) => {
e.preventDefault();
const termino = input.value.trim();
if (termino === "") {
    mostrarMensaje("Por favor ingresá un nombre.");
    return;
}

limpiarPersonajes();
mostrarLoader();

try {
    const res = await fetch(`${apiBase}?name=${termino}`);
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
    mostrarMensaje("No se encontraron personajes.");
    } else {
      renderizarPersonajes(data); // ✅ CORREGIDO: usar data directamente
    }
} catch (err) {
    mostrarMensaje("Ocurrió un error al consultar la API.");
    console.error(err);
} finally {
    ocultarLoader();
}
});

async function cargarPersonajesIniciales() {
mostrarLoader();
try {
    const res = await fetch(`${apiBase}?limit=20&page=${pagina}`);
    const data = await res.json();
    renderizarPersonajes(data.items);
    pagina++;
} catch (err) {
    console.error(err);
    mostrarMensaje("No se pudieron cargar los personajes.");
} finally {
    ocultarLoader();
}
}

function renderizarPersonajes(lista) {
lista.forEach((p) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-3";

    const card = document.createElement("div");
    card.className = "card h-100";
    card.innerHTML = `
    <img src="${p.image}" class="card-img-top" alt="${p.name}">
    <div class="card-body">
        <h5 class="card-title">${p.name}</h5>
        <p class="card-text"><strong>Raza:</strong> ${p.race}</p>
        <p class="card-text"><strong>Género:</strong> ${p.gender}</p>
    </div>
    `;

    card.addEventListener("click", () => mostrarModal(p.id));

    col.appendChild(card);
    container.appendChild(col);
});
}
