// Objeto para armazenar as camadas GeoJSON
var geojsonLayers = {};

// Função para lidar com cada feature do GeoJSON
function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties.nome_aldei);
}

// Função para carregar GeoJSON
function loadGeoJSON(filename) {
    fetch(filename)
        .then(response => response.json())
        .then(data => {
            const geojsonLayer = L.geoJson(data, {
                onEachFeature: onEachFeature
            }).addTo(map);
            geojsonLayers[filename] = geojsonLayer;

            // Ajustar o zoom e a posição do mapa para caber na camada GeoJSON
            map.fitBounds(geojsonLayer.getBounds());
        })
        .catch(error => console.error('Erro ao carregar o GeoJSON:', error));
}

// Função para remover GeoJSON
function removeGeoJSON(filename) {
    const layer = geojsonLayers[filename];
    if (layer) {
        map.removeLayer(layer);
        delete geojsonLayers[filename];
    }
}

// Função para lidar com a seleção do checkbox
document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function() {
            const filename = this.value + '.geojson';
            if (this.checked) {
                loadGeoJSON(filename);
            } else {
                removeGeoJSON(filename);
            }
        });
    });
});
