class LeafletMap extends HTMLElement {
  static currentMap = null; // Static property to access the current map

  constructor() {
    super();
    this.map = null;
  }

  connectedCallback() {
    const mapContainer = document.createElement('div');
    mapContainer.style.height = '100%'; // You can adjust the height as needed
    mapContainer.id = 'map'; // Id to identify the map container
    this.appendChild(mapContainer);

    this.initializeMap();
  }

  initializeMap() {
    // Initialize the map
    this.map = L.map('map', {zoomControl: false}).setView([20, 0], 2); // Initial point in the world

    // Add the tile layer (basemap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // After a delay, transition to Mâncio Lima
    setTimeout(() => {
      this.map.flyTo([-7.61453, -72.89583], 14); // Mâncio Lima coordinates and zoom level
    }, 2000); // 2-second delay

    LeafletMap.currentMap = this.map; // Assign the map instance to the static property
  }
}

// Custom component registration
window.customElements.define('leaflet-map', LeafletMap);