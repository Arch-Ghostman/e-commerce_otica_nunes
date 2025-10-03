// Script para visualização 3D dos óculos usando model-viewer

// Função para criar o popup do model-viewer
function create3DViewerPopup() {
  const popup = document.createElement('div');
  popup.id = '3d-viewer-popup';
  popup.innerHTML = `
    <div class="popup-overlay" onclick="close3DViewer()">
      <div class="popup-content" onclick="event.stopPropagation()">
        <button class="close-btn" onclick="close3DViewer()">
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <div class="viewer-container">
          <model-viewer
            id="glasses-3d-model"
            src="./oculos3d.glb"
            alt="Visualização 3D dos Óculos"
            auto-rotate
            camera-controls
            environment-image="neutral"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%23999'%3ECarregando...%3C/text%3E%3C/svg%3E"
            loading="eager"
            reveal="auto"
            style="width: 100%; height: 100%; background-color: transparent;">
            <div class="progress-bar" slot="progress-bar">
              <div class="update-bar"></div>
            </div>
          </model-viewer>
        </div>
        <div class="viewer-controls">
          <p>Use o mouse para rotacionar e dar zoom no modelo 3D</p>
        </div>
      </div>
    </div>
  `;
  
  return popup;
}

// Função para abrir o visualizador 3D
function open3DViewer() {
  // Verificar se o popup já existe
  let popup = document.getElementById('3d-viewer-popup');
  
  if (!popup) {
    popup = create3DViewerPopup();
    document.body.appendChild(popup);
    
    // Adicionar estilos CSS se não existirem
    if (!document.getElementById('3d-viewer-styles')) {
      const styles = document.createElement('style');
      styles.id = '3d-viewer-styles';
      styles.textContent = `
        #3d-viewer-popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .popup-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .popup-content {
          position: relative;
          width: 90%;
          max-width: 800px;
          height: 80%;
          max-height: 600px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(0, 0, 0, 0.5);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10001;
          transition: all 0.3s ease;
        }
        
        .close-btn:hover {
          background: rgba(0, 0, 0, 0.7);
          transform: scale(1.1);
        }
        
        .close-btn ion-icon {
          color: white;
          font-size: 24px;
        }
        
        .viewer-container {
          flex: 1;
          position: relative;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border-radius: 20px 20px 0 0;
        }
        
        .viewer-controls {
          padding: 20px;
          text-align: center;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 0 0 20px 20px;
        }
        
        .viewer-controls p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }
        
        .progress-bar {
          display: block;
          width: 33%;
          height: 10%;
          max-height: 2%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate3d(-50%, -50%, 0);
          border-radius: 25px;
          box-shadow: 0px 3px 10px 3px rgba(0, 0, 0, 0.5), 0px 0px 5px 1px rgba(0, 0, 0, 0.6);
          border: 2px solid rgba(255, 255, 255, 0.9);
          background-color: rgba(0, 0, 0, 0.5);
        }
        
        .update-bar {
          background-color: rgba(255, 165, 0, 0.8);
          width: 0%;
          height: 100%;
          border-radius: 25px;
          float: left;
          transition: width 0.3s;
        }
        
        @media (max-width: 768px) {
          .popup-content {
            width: 95%;
            height: 85%;
          }
          
          .viewer-controls p {
            font-size: 12px;
          }
        }
      `;
      document.head.appendChild(styles);
    }
  }
  
  // Mostrar o popup com animação
  popup.style.display = 'flex';
  popup.style.opacity = '0';
  popup.style.transform = 'scale(0.8)';
  
  requestAnimationFrame(() => {
    popup.style.transition = 'all 0.3s ease';
    popup.style.opacity = '1';
    popup.style.transform = 'scale(1)';
  });
  
  // Prevenir scroll do body
  document.body.style.overflow = 'hidden';
}

// Função para fechar o visualizador 3D
function close3DViewer() {
  const popup = document.getElementById('3d-viewer-popup');
  
  if (popup) {
    popup.style.transition = 'all 0.3s ease';
    popup.style.opacity = '0';
    popup.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
      popup.style.display = 'none';
      // Restaurar scroll do body
      document.body.style.overflow = 'auto';
    }, 300);
  }
}

// Função para adicionar event listeners aos botões de visualização
function initialize3DViewer() {
  // Aguardar o DOM estar pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize3DViewer);
    return;
  }
  
  // Adicionar event listeners para todos os botões de visualização existentes
  const viewButtons = document.querySelectorAll('.btn-action[data-action="view"]');
  viewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      open3DViewer();
    });
  });
  
  // Observer para novos botões adicionados dinamicamente
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Element node
          const newViewButtons = node.querySelectorAll ? node.querySelectorAll('.btn-action[data-action="view"]') : [];
          newViewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              open3DViewer();
            });
          });
        }
      });
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Inicializar quando o script for carregado
initialize3DViewer();

// Exportar funções para uso global
if (typeof window !== 'undefined') {
  window.Viewer3D = {
    open3DViewer,
    close3DViewer,
    initialize3DViewer
  };
}