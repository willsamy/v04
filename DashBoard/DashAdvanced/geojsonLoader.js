// Object to store GeoJSON layers
var geojsonLayers = {};

// Function to handle each feature in the GeoJSON
function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties.nome_aldei);
}

// Function to load GeoJSON
function loadGeoJSON(filename) {
    fetch(filename)
        .then(response => response.json())
        .then(data => {
            const geojsonLayer = L.geoJson(data, {
                onEachFeature: onEachFeature
            }).addTo(map);
            geojsonLayers[filename] = geojsonLayer;

            // Adjust the map's zoom and position to fit the GeoJSON layer
            map.fitBounds(geojsonLayer.getBounds());
        })
        .catch(error => console.error('Error loading GeoJSON:', error));
}

// Function to remove GeoJSON
function removeGeoJSON(filename) {
    const layer = geojsonLayers[filename];
    if (layer) {
        map.removeLayer(layer);
        delete geojsonLayers[filename];
    }
}

// Function to handle dropdown menu selection
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(event) {
            const content = event.target.getAttribute('data-content');
            const filename = `ML_${content.replace(/\s+/g, '_')}.geojson`;
            if (geojsonLayers[filename]) {
                removeGeoJSON(filename);
            } else {
                loadGeoJSON(filename);
            }
        });
    });
});