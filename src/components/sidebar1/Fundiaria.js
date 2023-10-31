// Função para carregar os dados do GeoJSON
async function carregarGeoJSONData() {
    try {
        const response = await fetch('Aldeias_Indigenas.geojson');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao carregar o GeoJSON:', error);
        return null;
    }
}

// Função para criar o conteúdo do menu fundiário
function FundiariaMenuContent(data) {
    const menu = document.createElement('div');
    menu.style.padding = '10px';
    menu.style.border = '1px solid white';
    menu.style.backgroundColor = '#333';
    menu.style.color = 'white';
    menu.innerHTML = '<h2>Aldeias Fundiárias</h2>';

    data.features.forEach(feature => {
        const aldeiaNome = feature.properties.name;
        const item = document.createElement('div');
        item.innerHTML = aldeiaNome;
        menu.appendChild(item);
    });

    return menu;
}

// Função ContentBar1 modificada para incorporar o menu fundiário
async function ContentBar2() {
    const card = document.createElement('div');
    card.className = 'ui card fluid';
    card.innerHTML = `
        <div class="content">
            <div class="header">Banco de Dados de Mâncio Lima</div>
            <div class="meta">Informações Geoespaciais</div>
            <div class="description">
                <p>O município de Mâncio Lima, situado no estado do Acre, possui um vasto território geoespacial riquíssimo em informações. Este sistema foi desenvolvido para proporcionar acesso fácil e rápido a estes dados geoespaciais, permitindo aos usuários explorar diversas camadas de informações sobre a região.</p>
                <ul class="ui list">
                    <li><strong>Terras Indígenas:</strong> Detalhes sobre as terras demarcadas, tribos residentes e suas respectivas localizações.</li>
                    <li><strong>Logradouros:</strong> Mapeamento detalhado de ruas, avenidas, praças e outros locais de interesse.</li>
                    <li><strong>Informações Pertinentes:</strong> Outros dados de relevância sobre o município, como áreas de conservação, pontos turísticos, infraestrutura e mais.</li>
                </ul>
            </div>
        </div>
    `;

    const geojsonData = await carregarGeoJSONData();
    if (geojsonData) {
        const fundiariaMenuElement = FundiariaMenuContent(geojsonData);
        card.appendChild(fundiariaMenuElement);
    }

    return card;
}

// Exemplo de como usar:
document.addEventListener('DOMContentLoaded', () => {
    ContentBar2().then(content => {
        document.body.appendChild(content);
    });
});
