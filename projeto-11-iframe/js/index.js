class PortfolioManager {
    constructor() {
        this.data = null;
        this.currentIndex = -1;
        this.allItems = []; // Todos os itens em ordem sequencial
        this.currentSection = 'home'; // 'home', 'markdown', 'iframe'
        
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.setupEventListeners();
            this.renderSidebar();
            this.showHomePage();
        } catch (error) {
            console.error('Erro ao inicializar:', error);
            this.showError('Erro ao carregar dados dos projetos');
        }
    }

    async loadData() {
        try {
            const response = await fetch('projeto-11-iframe/data/projetos.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.data = await response.json();
            this.buildAllItemsList();
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            throw error;
        }
    }

    buildAllItemsList() {
        this.allItems = [];
        
        // Adicionar módulos
        if (this.data.modulos) {
            this.data.modulos.forEach(modulo => {
                this.allItems.push({
                    type: 'modulo',
                    title: modulo.titulo,
                    link: modulo.link,
                    data: modulo
                });
            });
        }

        // Adicionar projetos
        if (this.data.projetos) {
            this.data.projetos.forEach(projeto => {
                if (projeto.projetos && projeto.projetos.length > 0) {
                    projeto.projetos.forEach(subProjeto => {
                        this.allItems.push({
                            type: 'projeto',
                            title: `${projeto.titulo} - ${subProjeto.titulo}`,
                            link: subProjeto.link,
                            data: projeto,
                            subData: subProjeto
                        });
                    });
                }
            });
        }

        // Adicionar extras
        if (this.data.extras) {
            this.data.extras.forEach(extra => {
                this.allItems.push({
                    type: 'extra',
                    title: extra.titulo,
                    link: extra.link,
                    data: extra
                });
            });
        }
    }

    setupEventListeners() {
        // Botão Home
        const homeButton = document.getElementById('homeButton');
        if (homeButton) {
            homeButton.addEventListener('click', () => this.showHomePage());
        }

        // Botões de navegação
        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');
        
        if (prevButton) {
            prevButton.addEventListener('click', () => this.navigatePrevious());
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => this.navigateNext());
        }
    }

    renderSidebar() {
        this.renderModulos();
        this.renderProjetos();
        this.renderExtras();
    }

    renderModulos() {
        const container = document.getElementById('sidebarModulos');
        if (!container || !this.data.modulos) return;

        container.innerHTML = '';
        
        this.data.modulos.forEach(modulo => {
            const moduloElement = this.createModuloElement(modulo);
            container.appendChild(moduloElement);
        });
    }

    createModuloElement(modulo) {
        const div = document.createElement('div');
        div.className = 'p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200';
        
        div.innerHTML = `
            <div class="flex items-center">
                <span class="text-2xl mr-3">${modulo.icone}</span>
                <div class="flex-1">
                    <h4 class="font-medium text-gray-800">${modulo.titulo}</h4>
                    <p class="text-sm text-gray-600">${modulo.descricao}</p>
                </div>
            </div>
        `;

        div.addEventListener('click', () => this.loadModulo(modulo));
        
        return div;
    }

    renderProjetos() {
        const container = document.getElementById('sidebarProjetos');
        if (!container || !this.data.projetos) return;

        container.innerHTML = '';
        
        this.data.projetos.forEach(projeto => {
            const projetoElement = this.createProjetoElement(projeto);
            container.appendChild(projetoElement);
        });
    }

    createProjetoElement(projeto) {
        const div = document.createElement('div');
        div.className = 'border border-gray-200 rounded-lg overflow-hidden';
        
        // Header do projeto
        const header = document.createElement('div');
        header.className = 'p-3 bg-gray-50 border-b border-gray-200';
        header.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <span class="text-xl mr-2">${projeto.icone}</span>
                    <div>
                        <h4 class="font-medium text-gray-800">${projeto.titulo}</h4>
                        <p class="text-xs text-gray-600">${projeto.descricao}</p>
                    </div>
                </div>
                <svg class="w-4 h-4 text-gray-400 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
        `;

        // Lista de sub-projetos
        const content = document.createElement('div');
        content.className = 'hidden';
        
        if (projeto.projetos && projeto.projetos.length > 0) {
            projeto.projetos.forEach(subProjeto => {
                const subProjetoDiv = document.createElement('div');
                subProjetoDiv.className = 'p-2 hover:bg-gray-50 cursor-pointer border-t border-gray-100 first:border-t-0';
                subProjetoDiv.innerHTML = `
                    <div class="text-sm font-medium text-gray-700">${subProjeto.titulo}</div>
                `;
                
                subProjetoDiv.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.loadProjeto(subProjeto.link, projeto, subProjeto);
                });
                
                content.appendChild(subProjetoDiv);
            });
        }

        // Toggle do accordion
        header.addEventListener('click', () => {
            const isHidden = content.classList.contains('hidden');
            const arrow = header.querySelector('svg');
            
            if (isHidden) {
                content.classList.remove('hidden');
                arrow.style.transform = 'rotate(180deg)';
            } else {
                content.classList.add('hidden');
                arrow.style.transform = 'rotate(0deg)';
            }
        });

        div.appendChild(header);
        div.appendChild(content);
        
        return div;
    }

    renderExtras() {
        const container = document.getElementById('sidebarExtras');
        if (!container || !this.data.extras) return;

        container.innerHTML = '';
        
        this.data.extras.forEach(extra => {
            const extraElement = this.createExtraElement(extra);
            container.appendChild(extraElement);
        });
    }

    createExtraElement(extra) {
        const div = document.createElement('div');
        div.className = 'p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 cursor-pointer transition-all duration-200';
        
        div.innerHTML = `
            <div class="flex items-center">
                <span class="text-2xl mr-3">${extra.icone}</span>
                <div class="flex-1">
                    <h4 class="font-medium text-gray-800">${extra.titulo}</h4>
                    <p class="text-sm text-gray-600">${extra.descricao}</p>
                </div>
            </div>
        `;

        div.addEventListener('click', () => this.loadExtra(extra));
        
        return div;
    }

    async loadModulo(modulo) {
        this.setCurrentIndex('modulo', modulo.link);
        this.updateNavigationButtons();
        this.updateContentTitle(modulo.titulo, modulo.descricao);
        
        try {
            const readmePath = `${modulo.link}/README.md`;
            const response = await fetch(readmePath);
            
            if (response.ok) {
                const markdownContent = await response.text();
                this.showMarkdownContent(markdownContent);
            } else {
                this.showMarkdownContent(`# ${modulo.titulo}\n\n${modulo.descricao}\n\n*Conteúdo em desenvolvimento...*`);
            }
        } catch (error) {
            console.error('Erro ao carregar módulo:', error);
            this.showMarkdownContent(`# ${modulo.titulo}\n\n${modulo.descricao}\n\n*Erro ao carregar conteúdo.*`);
        }
    }

    loadProjeto(link, projeto, subProjeto) {
        this.setCurrentIndex('projeto', link);
        this.updateNavigationButtons();
        this.updateContentTitle(`${projeto.titulo} - ${subProjeto.titulo}`, projeto.descricao);
        this.showIframeContent(link);
    }

    loadExtra(extra) {
        this.setCurrentIndex('extra', extra.link);
        this.updateNavigationButtons();
        this.updateContentTitle(extra.titulo, extra.descricao);
        
        if (extra.link.endsWith('/')) {
            // Se termina com /, tentar carregar README.md
            this.loadExtraMarkdown(extra);
        } else {
            // Caso contrário, carregar como iframe
            this.showIframeContent(extra.link);
        }
    }

    async loadExtraMarkdown(extra) {
        try {
            const readmePath = `${extra.link}README.md`;
            const response = await fetch(readmePath);
            
            if (response.ok) {
                const markdownContent = await response.text();
                this.showMarkdownContent(markdownContent);
            } else {
                // Se não tem README, carregar como iframe mesmo
                this.showIframeContent(extra.link);
            }
        } catch (error) {
            console.error('Erro ao carregar extra:', error);
            this.showIframeContent(extra.link);
        }
    }

    setCurrentIndex(type, link) {
        const index = this.allItems.findIndex(item => 
            item.type === type && item.link === link
        );
        this.currentIndex = index;
    }

    showHomePage() {
        this.currentIndex = -1;
        this.currentSection = 'home';
        this.updateNavigationButtons();
        this.updateContentTitle('Bem-vindo à Trilha de Aprendizado', 'Selecione um módulo ou projeto para começar');
        
        // Esconder outros conteúdos
        document.getElementById('markdownContent').classList.add('hidden');
        document.getElementById('iframeContent').classList.add('hidden');
        
        // Mostrar página inicial
        document.getElementById('homePage').classList.remove('hidden');
    }

    showMarkdownContent(markdown) {
        this.currentSection = 'markdown';
        
        // Esconder outros conteúdos
        document.getElementById('homePage').classList.add('hidden');
        document.getElementById('iframeContent').classList.add('hidden');
        
        // Mostrar conteúdo markdown
        const markdownContainer = document.getElementById('markdownContainer');
        const markdownContent = document.getElementById('markdownContent');
        
        if (markdownContainer && markdownContent) {
            try {
                markdownContainer.innerHTML = marked.parse(markdown);
                markdownContent.classList.remove('hidden');
            } catch (error) {
                console.error('Erro ao processar markdown:', error);
                markdownContainer.innerHTML = `<div class="text-red-600">Erro ao processar conteúdo markdown.</div>`;
                markdownContent.classList.remove('hidden');
            }
        }
    }

    showIframeContent(link) {
        this.currentSection = 'iframe';
        
        // Esconder outros conteúdos
        document.getElementById('homePage').classList.add('hidden');
        document.getElementById('markdownContent').classList.add('hidden');
        
        // Mostrar loading e iframe
        const iframeContent = document.getElementById('iframeContent');
        const loadingIndicator = document.getElementById('loadingIndicator');
        const projectFrame = document.getElementById('projectFrame');
        
        if (iframeContent && loadingIndicator && projectFrame) {
            iframeContent.classList.remove('hidden');
            loadingIndicator.classList.remove('hidden');
            projectFrame.classList.add('hidden');
            
            // Carregar iframe
            projectFrame.src = link;
            
            // Esconder loading quando carregar
            projectFrame.onload = () => {
                loadingIndicator.classList.add('hidden');
                projectFrame.classList.remove('hidden');
            };
            
            // Em caso de erro, mostrar mensagem
            projectFrame.onerror = () => {
                loadingIndicator.innerHTML = `
                    <div class="text-center">
                        <div class="text-red-600 text-xl mb-2">❌ Erro ao carregar projeto</div>
                        <p class="text-gray-600">Não foi possível carregar: ${link}</p>
                    </div>
                `;
            };
        }
    }

    updateContentTitle(title, subtitle) {
        const titleElement = document.getElementById('contentTitle');
        const subtitleElement = document.getElementById('contentSubtitle');
        
        if (titleElement) titleElement.textContent = title;
        if (subtitleElement) subtitleElement.textContent = subtitle;
    }

    updateNavigationButtons() {
        const prevButton = document.getElementById('prevButton');
        const nextButton = document.getElementById('nextButton');
        
        if (!prevButton || !nextButton) return;
        
        if (this.currentIndex === -1) {
            // Página inicial - esconder botões
            prevButton.classList.add('hidden');
            nextButton.classList.add('hidden');
        } else {
            // Mostrar/esconder baseado na posição
            if (this.currentIndex > 0) {
                prevButton.classList.remove('hidden');
            } else {
                prevButton.classList.add('hidden');
            }
            
            if (this.currentIndex < this.allItems.length - 1) {
                nextButton.classList.remove('hidden');
            } else {
                nextButton.classList.add('hidden');
            }
        }
    }

    navigatePrevious() {
        if (this.currentIndex > 0) {
            const prevItem = this.allItems[this.currentIndex - 1];
            this.navigateToItem(prevItem);
        }
    }

    navigateNext() {
        if (this.currentIndex < this.allItems.length - 1) {
            const nextItem = this.allItems[this.currentIndex + 1];
            this.navigateToItem(nextItem);
        }
    }

    navigateToItem(item) {
        switch (item.type) {
            case 'modulo':
                this.loadModulo(item.data);
                break;
            case 'projeto':
                this.loadProjeto(item.link, item.data, item.subData);
                break;
            case 'extra':
                this.loadExtra(item.data);
                break;
        }
    }

    showError(message) {
        const errorHtml = `
            <div class="max-w-2xl mx-auto text-center p-8">
                <div class="text-red-600 text-6xl mb-4">❌</div>
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Ops! Algo deu errado</h2>
                <p class="text-gray-600 mb-6">${message}</p>
                <button onclick="location.reload()" class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200">
                    🔄 Tentar Novamente
                </button>
            </div>
        `;
        
        document.getElementById('markdownContainer').innerHTML = errorHtml;
        this.showMarkdownContent('');
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioManager();
});
