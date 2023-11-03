class LayerMap extends HTMLElement {
  connectedCallback() {
    const observableId = this.getAttribute('observableId'); // get observable id
    const scriptUrl = `path_to_scripts/${observableId}.js`; // construct path from id

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.addEventListener('load', () => {
      if (typeof window[observableId] === 'function') {
        window[observableId]();
      }
    });
    document.body.appendChild(script);
  }
}

// Register the component
window.customElements.define('dynamic-executor', DynamicExecutor);