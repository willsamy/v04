// Função para criar e exibir o overlay
function showOverlay(feature) {
    // Criar o elemento overlay se ainda não existir
    let overlay = document.getElementById("infoOverlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "infoOverlay";
        overlay.style.position = "absolute";
        overlay.style.top = "10%";
        overlay.style.left = "10%";
        overlay.style.width = "80%";
        overlay.style.height = "80%";
        overlay.style.backgroundColor = "white";
        overlay.style.overflow = "auto";
        overlay.style.zIndex = 1000;
        overlay.style.padding = "20px";
        overlay.style.border = "1px solid black";
        document.body.appendChild(overlay);
    }

    // Preencher o overlay com informações
    let content = "<h2>Informações Adicionais</h2>";
    for (const [key, value] of Object.entries(feature.properties)) {
        content += `<strong>${key}:</strong> ${value}<br>`;
    }
    overlay.innerHTML = content;

    // Adicionar botão para fechar o overlay
    const closeButton = document.createElement("button");
    closeButton.textContent = "Fechar";
    closeButton.onclick = function () {
        overlay.style.display = "none";
    };
    overlay.appendChild(closeButton);

    // Exibir o overlay
    overlay.style.display = "block";
}

// Modificar a função onEachFeature para incluir o link "Ver mais"
function onEachFeature(feature, layer) {
    const popupContent = `
        <strong>Nome da Aldeia:</strong> ${feature.properties.nome_aldei}
        <br>
        <a href="javascript:void(0);" data-feature='${JSON.stringify(feature)}' class="showOverlayLink">Ver mais</a>
    `;
    layer.bindPopup(popupContent);
}

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("showOverlayLink")) {
        const feature = JSON.parse(event.target.getAttribute("data-feature"));
        showOverlay(feature);
    }
});
