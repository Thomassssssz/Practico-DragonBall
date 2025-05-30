const apiBase = "https://dragonball-api.com/api/characters";
const container = document.getElementById("personajesContainer");
const form = document.getElementById("busquedaForm");
const input = document.getElementById("busquedaInput");
const mensaje = document.getElementById("mensaje");
const loader = document.getElementById("loader");

let pagina = 1;
let cargando = false;
