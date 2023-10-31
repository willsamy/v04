function ContentBar2() {
  const content = document.createElement('div');
  content.style.padding = '10px';
  content.innerHTML = `
    <h3>Conteúdo da Barra 2</h3>
    <p>Informações da barra 2.</p>
    <select>
      <option value="aldeias">Mostrar aldeias</option>
      <option value="outras">Outras opções</option>
    </select>
    <div id="map"></div>
  `;
  
  let map;
  let geojsonLayer;

  fetch('Aldeias_Indigenas.geojson')
    .then(response => response.json())
    .then(data => {

        map = L.map('map').setView([0, 0], 2);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        }).addTo(map);
    
        geojsonLayer = L.geoJSON(data).addTo(map);
    });

  return content;
}