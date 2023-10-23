document.addEventListener('DOMContentLoaded', function() {
    let expandedState = null;
    const expandButtons = document.querySelectorAll('.expand-button');
    const topbar = document.getElementById('topbar');

    // Adicionar a classe quando estiver expandido
    topbar.classList.add('active');

    // Remover a classe quando não estiver expandido
    topbar.classList.remove('active');


    function hideAllExpanded() {
        document.querySelectorAll('.expanded-content').forEach(el => {
            el.style.width = '0';
            el.classList.remove('expanded');
        });
    }

    

    function handleTopbarState(isExpanded) {
        if (isExpanded) {
            // Se a barra estiver expandida, chame o action.
            topbar.action();
        } else {
            // Se a barra não estiver expandida, retorne ao estado normal.
            // Como um exemplo genérico, estou apenas mudando a cor de fundo. 
            // Adapte para a ação que você deseja executar.
            topbar.style.background = "white"; 
        }
    }

    expandButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            const expandId = this.id.replace('-button', '');

            if (expandedState === expandId) {
                const el = document.getElementById(`expanded-${expandId}`);
                el.style.width = '0';
                el.classList.remove('expanded');
                expandedState = null;
                handleTopbarState(false);
            } else {
                hideAllExpanded();

                setTimeout(() => {
                    const el = document.getElementById(`expanded-${expandId}`);
                    el.style.width = '250px';
                    el.classList.add('expanded');
                    expandedState = expandId;
                    handleTopbarState(true);
                }, 300);
            }
        });
    });

    const backButtons = document.querySelectorAll('.back-button');

    backButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
            hideAllExpanded();
            expandedState = null;
        });
    });

    document.querySelectorAll('.clickable-icon').forEach((icon) => {
        icon.addEventListener('mouseover', function() {
            this.querySelector('.tooltip-text').style.visibility = 'visible';
        });
        icon.addEventListener('mouseout', function() {
            this.querySelector('.tooltip-text').style.visibility = 'hidden';
        });
    });

    document.querySelectorAll('.clickable-icon').forEach((icon) => {
        const tooltip = icon.querySelector('.tooltip-text');
        const button = icon.querySelector('.expand-button');

        icon.addEventListener('mouseover', function() {
            const rect = button.getBoundingClientRect();
            tooltip.style.left = `${rect.left + window.scrollX}px`;
            tooltip.style.top = `${rect.top + window.scrollY}px`;
            tooltip.style.visibility = 'visible';
        });

        icon.addEventListener('mouseout', function() {
            tooltip.style.visibility = 'hidden';
        });
    });
});
