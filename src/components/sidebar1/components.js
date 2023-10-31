// Create TopBar component
function TopBar() {
  const element = document.createElement('div');
  element.style.width = '350px';
  element.style.height = '50px';
  element.style.position = 'fixed';
  element.style.left = '0';
  element.style.top = '0';
  element.style.backgroundColor = '#ddd';
  element.innerHTML = '<h2 style="margin: 0; padding: 10px; text-align: center;">TopBar</h2>';
  return element;
}

// Register the TopBar component
window.customElements.define('top-bar', class extends HTMLElement {
  connectedCallback() {
    this.appendChild(TopBar());
  }
});


function Sidebar() {
  const element = document.createElement('div');
  let activeBar = null;
  let activeIcon = null;

  element.style.width = '50px';
  element.style.height = '100%';
  element.style.position = 'fixed';
  element.style.left = '0';
  element.style.top = '50px';
  element.style.backgroundColor = '#fff';

  const icons = [
    { class: "fas fa-home", title: "Home" },
    { class: "fas fa-road", title: "Fundiaria" },
    { class: "fas fa-archway", title: "Infra-Logística" },
    { class: "fas fa-seedling", title: "Cobertura do Sólo" },
    { class: "fas fa-tree", title: "Sistemas Produtivos" }
  ];

  icons.forEach((icon, index) => {
    const iconWrapper = document.createElement('div');
    iconWrapper.style.width = '50px';
    iconWrapper.style.height = '50px';
    iconWrapper.style.display = 'flex';
    iconWrapper.style.justifyContent = 'center';
    iconWrapper.style.alignItems = 'center';
    iconWrapper.style.cursor = 'pointer';
    iconWrapper.style.transition = 'background 0.3s';

    const actionBar = document.createElement('div');
    actionBar.style.width = '0';
    actionBar.style.height = '100%';
    actionBar.style.position = 'fixed';
    actionBar.style.left = '50px';
    actionBar.style.top = '50px';
    actionBar.style.backgroundColor = '#ccc';
    actionBar.style.transition = 'width 0.5s';
    actionBar.id = `actionBar-${index}`;

    const iconElement = document.createElement('i');
    iconElement.className = icon.class;
    iconElement.title = icon.title;
    iconWrapper.appendChild(iconElement);

    iconWrapper.onclick = () => {
      if (activeBar) {
        while (activeBar.firstChild) {
          activeBar.removeChild(activeBar.firstChild);
        }
        activeBar.style.width = '0';
        activeIcon.style.borderLeft = 'none';
        activeIcon.style.backgroundColor = 'transparent';
      }

      if (activeBar !== actionBar) {
        setTimeout(() => {
          actionBar.style.width = '250px';
          iconWrapper.style.backgroundColor = '#eee';
          iconWrapper.style.borderLeft = '5px solid orange';
          activeBar = actionBar;
          activeIcon = iconWrapper;

          let detailContent;
          switch (index) {
            case 0:
              detailContent = ContentBar1();
              break;
            case 1:
              detailContent = ContentBar2();
              break;
            case 2:
              detailContent = ContentBar3();
              break;
            case 3:
              detailContent = ContentBar4();
              break;
            case 4:
              detailContent = ContentBar5();
              break;
            default:
              detailContent = document.createElement('div');
              detailContent.innerHTML = 'Conteúdo não definido';
          }
          actionBar.appendChild(detailContent);
        }, 500);
      } else {
        activeBar = null;
        activeIcon = null;
      }
    };

    element.appendChild(iconWrapper);
    element.appendChild(actionBar);
  });

  return element;
}

window.customElements.define('my-sidebar', class extends HTMLElement {
  connectedCallback() {
    this.appendChild(Sidebar());
  }
});