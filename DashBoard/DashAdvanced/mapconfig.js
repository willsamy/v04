// Inicializar o mapa
var map = L.map('map').setView([-7.614530, -72.899444], 13);

// Adicionar camada de base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
