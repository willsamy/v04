document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function(event) {
        displayComponentContent(event.target.id); 
    });
});

function displayComponentContent(selectedID) {
    let contentContainer = document.getElementById('componentContent');
    let contentToDisplay = '';

    switch(selectedID) {
        case 'terras-indigenas':
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
