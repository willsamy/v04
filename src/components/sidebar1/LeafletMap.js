class LeafletMap extends HTMLElement {
  static currentMap = null; // Propriedade estática para acessar o mapa atual

  constructor() {
      super();
      this.map = null;
  }

  connectedCallback() {
      const mapContainer = document.createElement('div');
      mapContainer.style.height = '100%'; // Você pode ajustar a altura conforme necessário
      mapContainer.id = 'map'; // Id para identificar o contêiner do mapa
      this.appendChild(mapContainer);

      this.initializeMap();

      // Modificando o zoom da interface
      const zoomContainer = document.createElement('div');
      zoomContainer.id = 'zoom'; 
      zoomContainer.style.position = 'absolute'; 
      zoomContainer.style.bottom = '50%'; 
      zoomContainer.style.right = '10px'; 
      zoomContainer.style.zIndex = '1000';
      this.appendChild(zoomContainer);

      // Adicionando botões de zoom
      const zoomInBtn = document.createElement('button');
      zoomInBtn.innerHTML = '+';
      zoomInBtn.style.display = 'block';
      zoomInBtn.onclick = () => this.map.zoomIn();

      const zoomOutBtn = document.createElement('button');
      zoomOutBtn.innerHTML = '-';
      zoomOutBtn.style.display = 'block';
      zoomOutBtn.onclick = () => this.map.zoomOut();

      zoomContainer.appendChild(zoomInBtn);
      zoomContainer.appendChild(zoomOutBtn);
  }

  initializeMap() {
      // Inicializa o mapa
      this.map = L.map('map').setView([20, 0], 2); // Ponto inicial no mundo

      // Adiciona o layer de tile (basemap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      // Após um intervalo, faz a transição para Mâncio Lima
      setTimeout(() => {
          this.map.flyTo([-7.61453, -72.89583], 14); // Coordenadas de Mâncio Lima e nível de zoom
      }, 2000); // Intervalo de 2 segundos

      LeafletMap.currentMap = this.map; // Atribui a instância do mapa à propriedade estática
  }
}

// Registro do componente customizado
window.customElements.define('leaflet-map', LeafletMap);
