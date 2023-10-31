function ContentBar1() {
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
  return card;
}
