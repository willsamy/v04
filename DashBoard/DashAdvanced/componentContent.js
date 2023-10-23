document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function(event) {
        displayComponentContent(event.target.id); 
    });
});

function displayComponentContent(selectedID) {
    let contentContainer = document.getElementById('componentContent');
    let contentToDisplay = '';

    switch(selectedID) {
        case 'ML_Terras-Indigenas':
            contentToDisplay = '<p>Conteúdo sobre Terras Indígenas.</p>';
            break;
        case 'unidades-conservacao':
            contentToDisplay = '<p>Conteúdo sobre Unidades de Conservação.</p>';
            break;
        case 'assentamentos-rurais':
            contentToDisplay = '<p>Conteúdo sobre Assentamentos Rurais.</p>';
            break;
        case 'imoveis-rurais':
            contentToDisplay = '<p>Conteúdo sobre Imóveis Rurais (Inscritos no CAR).</p>';
            break;
        default:
            contentToDisplay = '<p>Selecione uma categoria para ver o conteúdo.</p>';
    }

    contentContainer.innerHTML = contentToDisplay;
}
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function(event) {
        const content = event.target.getAttribute('data-content');
        const filename = `ML_${content.replace(/\s+/g, '_')}.geojson`;
        loadGeoJSON(filename);
        displayComponentContent(content);
    });
});

function displayComponentContent(selectedContent) {
    let contentContainer = document.getElementById('componentContent');
    let contentToDisplay = `<p>Conteúdo sobre ${selectedContent}.</p>`;
    contentContainer.innerHTML = contentToDisplay;
}

