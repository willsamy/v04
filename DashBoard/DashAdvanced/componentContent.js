document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function(event) {
        displayComponentContent(event.target.getAttribute('value'));
    });
});

function displayComponentContent(selectedID) {
    let contentContainer = document.getElementById('componentContent');
    let contentToDisplay = '';

    switch(selectedID) {
        case 'ML_Terras_Indigenas':
            contentToDisplay = '<p style="color: black;">Conteúdo sobre Terras Indígenas.</p>';
            break;
        case 'ML_UnidadesDeConservação':
            contentToDisplay = '<p style="color: black;">Conteúdo sobre Unidades de Conservação.</p>';
            break;
        case 'MLAseentamentosINCRA':
            contentToDisplay = '<p style="color: black;">Conteúdo sobre Assentamentos Rurais.</p>';
            break;
        case 'ML_Imoveis_Incra':
            contentToDisplay = '<p style="color: black;">Conteúdo sobre Imóveis Rurais (Inscritos no CAR).</p>';
            break;
        default:
            contentToDisplay = '<p style="color: black;">Selecione uma categoria para ver o conteúdo.</p>';
    }

    contentContainer.innerHTML = contentToDisplay;
}

document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function(event) {
        const content = event.target.getAttribute('value');
        const filename = `ML_${content.replace(/\s+/g, '_')}.geojson`;
        loadGeoJSON(filename);
        displayComponentContent(content);
    });
});

function loadGeoJSON(filename) {
  fetch(filename)
    .then(response => response.json())
    .then(data => {
      const geojsonLayer = L.geoJson(data, {
        onEachFeature: onEachFeature
      }).addTo(map);
      geojsonLayers[filename] = geojsonLayer;
      map.fitBounds(geojsonLayer.getBounds());

      // Atualizar o componentContent com informações do primeiro recurso
      if (data.features.length > 0) {
        const firstFeature = data.features[0];
        const componentContent = document.getElementById("componentContent");
        componentContent.innerHTML = `<h5 style="color: black;">Nome da Aldeia: ${firstFeature.properties.nome_aldei}</h5>`;
      }
    })
    .catch(error => console.error('Erro ao carregar o GeoJSON:', error));
}
