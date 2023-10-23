var map = L.map('map').setView([-7.6141, -72.8958], 12); // Coordenadas de Mâncio Lima

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var geojsonLayers = {};

function onEachFeature(feature, layer) {
  layer.bindPopup(feature.properties.nome_aldei);

  // Atualizar o conteúdo do elemento 'componentContent'
  const componentContent = document.getElementById("componentContent");
  let content = `<h5 style="color: black;">Nome da Aldeia: ${feature.properties.nome_aldei}</h5>`;

  // Adicionar informações extras
  for (const [key, value] of Object.entries(feature.properties)) {
    if (key !== 'nome_aldei') { // Já mostramos o nome, então pule
      content += `<p style="color: black;"><strong>${key}:</strong> ${value}</p>`;
    }
  }

  componentContent.innerHTML = content;
}



function loadGeoJSON(filename) {
  fetch(filename)
    .then(response => response.json())
    .then(data => {
      const geojsonLayer = L.geoJson(data, {
        onEachFeature: onEachFeature
      }).addTo(map);
      geojsonLayers[filename] = geojsonLayer;
      map.fitBounds(geojsonLayer.getBounds());
    })
    .catch(error => console.error('Erro ao carregar o GeoJSON:', error));
}

function removeGeoJSON(filename) {
  const layer = geojsonLayers[filename];
  if (layer) {
    map.removeLayer(layer);
    delete geojsonLayers[filename];
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach(item => {
    item.addEventListener("click", function() {
      const filename = this.getAttribute("value") + '.geojson';
      if (geojsonLayers[filename]) {
        removeGeoJSON(filename);
      } else {
        loadGeoJSON(filename);
      }
    });
  });
});
