// Assuming that a Leaflet map instance is available as 'map'

var layers = {}; // a layer object to store layers for each category
var currentLayer = null; // variable to store the currently selected layer

// Load the Aldeias_Indigenas layer from GeoServer
var aldeiasIndigenasLayer = L.tileLayer.wms("http://localhost:8080/geoserver/mlserver/wms", {
    layers: 'mlserver:ML_Aldeias_Indigenas.shp',
    format: 'image/png',
    version: '1.1.0',
    transparent: true,
    width: 768,
    height: 330,
    srs: 'EPSG:31978'
});

layers['Aldeias_Indigenas'] = aldeiasIndigenasLayer;

window.handleCategoryChange = function(event) {
  var value = event.target.value;

  // If there was a previously selected layer, remove it
  if (currentLayer) {
    map.removeLayer(currentLayer);
    currentLayer = null;
  }

  if (value === "") {
    // No category selected, don't show anything
  } else if (layers[value]) {
    // Layer already created for this category, just show it
    currentLayer = layers[value];
    map.addLayer(currentLayer);
  } else {
    // Layer not created for this category
    console.warn('Layer not available for selected category:', value);
  }
}

function ContentBar2() {
  const content = document.createElement('div');
  content.style.padding = '10px';
  content.innerHTML = `
    <h3>Categorias</h3>
    <select id="category-dropdown" onchange="handleCategoryChange(event)">
      <option value="">Selecione uma categoria</option>
      <option value="Aldeias_Indigenas">Aldeias Indígenas</option>
      <option value="category2">Categoria 2</option>
      <option value="category3">Categoria 3</option>
      <option value="category4">Categoria 4</option>
      <option value="category5">Categoria 5</option>
    </select>
  `;
  return content;
}