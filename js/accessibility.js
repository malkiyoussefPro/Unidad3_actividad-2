class AccessibilityControls {
    constructor() {
        this.initializeToggleButton();
        this.initializeMenu();
        this.loadSavedPreferences();
        this.setupKeyboardShortcut();
    }

    initializeToggleButton() {
        const button = document.createElement('button');
        button.className = 'accessibility-toggle-btn';
        button.setAttribute('aria-label', 'Abrir menú de accesibilidad');
        button.innerHTML = '<i class="fas fa-hands-helping"></i>';
        document.body.appendChild(button);
    }

    initializeMenu() {
        const menu = document.createElement('div');
        menu.className = 'accessibility-menu';
        menu.innerHTML = `
            <h2>Opciones de Accesibilidad <span class="close-btn"><i class="fas fa-times"></i></span></h2>
            <div class="accessibility-options">
                <div class="option-group">
                    <h3>Tamaño del Texto</h3>
                    <div class="font-controls">
                        <button data-size="small">Pequeño</button>
                        <button data-size="medium" class="active">Mediano</button>
                        <button data-size="large">Grande</button>
                    </div>
                </div>
                <div class="option-group">
                    <h3>Espaciado</h3>
                    <div class="spacing-controls">
                        <button data-spacing="normal" class="active">Normal</button>
                        <button data-spacing="large">Grande</button>
                    </div>
                </div>
                <div class="option-group">
                    <h3>Contraste</h3>
                    <div class="contrast-controls">
                        <button data-contrast="normal" class="active">Normal</button>
                        <button data-contrast="dark">Alto Contraste</button>
                        <button data-contrast="light">Bajo Contraste</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(menu);
        this.setupEventListeners();
    }

    setupEventListeners() {
        const toggleBtn = document.querySelector('.accessibility-toggle-btn');
        const menu = document.querySelector('.accessibility-menu');
        const closeBtn = menu.querySelector('.close-btn');

        toggleBtn.addEventListener('click', () => {
            menu.classList.toggle('show');
            toggleBtn.setAttribute('aria-expanded', menu.classList.contains('show'));
        });

        closeBtn.addEventListener('click', () => {
            menu.classList.remove('show');
            toggleBtn.setAttribute('aria-expanded', 'false');
        });

        // Gestionnaire pour les boutons de taille de texte
        const fontButtons = menu.querySelectorAll('.font-controls button');
        fontButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.updateActiveButton(fontButtons, button);
                this.applyFontSize(button.dataset.size);
            });
        });

        // Gestionnaire pour les boutons d'espacement
        const spacingButtons = menu.querySelectorAll('.spacing-controls button');
        spacingButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.updateActiveButton(spacingButtons, button);
                this.applySpacing(button.dataset.spacing);
            });
        });

        // Gestionnaire pour les boutons de contraste
        const contrastButtons = menu.querySelectorAll('.contrast-controls button');
        contrastButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.updateActiveButton(contrastButtons, button);
                this.applyContrast(button.dataset.contrast);
            });
        });
    }

    updateActiveButton(buttons, activeButton) {
        buttons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    applyFontSize(size) {
        document.documentElement.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
        if (size !== 'medium') {
            document.documentElement.classList.add(`font-size-${size}`);
        }
        this.savePreference('fontSize', size);
    }

    applySpacing(spacing) {
        document.documentElement.classList.remove('line-height-normal', 'line-height-large');
        document.documentElement.classList.remove('word-spacing-normal', 'word-spacing-large');
        document.documentElement.classList.remove('letter-spacing-normal', 'letter-spacing-large');
        
        if (spacing === 'large') {
            document.documentElement.classList.add('line-height-large');
            document.documentElement.classList.add('word-spacing-large');
            document.documentElement.classList.add('letter-spacing-large');
        }
        this.savePreference('spacing', spacing);
    }

    applyContrast(contrast) {
        document.documentElement.classList.remove('contrast-normal', 'contrast-dark', 'contrast-light');
        if (contrast !== 'normal') {
            document.documentElement.classList.add(`contrast-${contrast}`);
        }
        this.savePreference('contrast', contrast);
    }

    savePreference(key, value) {
        const preferences = this.getPreferences();
        preferences[key] = value;
        localStorage.setItem('accessibilityPreferences', JSON.stringify(preferences));
    }

    getPreferences() {
        const saved = localStorage.getItem('accessibilityPreferences');
        return saved ? JSON.parse(saved) : {};
    }

    loadSavedPreferences() {
        const preferences = this.getPreferences();
        
        if (preferences.fontSize) {
            this.applyFontSize(preferences.fontSize);
            const fontButton = document.querySelector(`[data-size="${preferences.fontSize}"]`);
            if (fontButton) {
                this.updateActiveButton(document.querySelectorAll('.font-controls button'), fontButton);
            }
        }

        if (preferences.spacing) {
            this.applySpacing(preferences.spacing);
            const spacingButton = document.querySelector(`[data-spacing="${preferences.spacing}"]`);
            if (spacingButton) {
                this.updateActiveButton(document.querySelectorAll('.spacing-controls button'), spacingButton);
            }
        }

        if (preferences.contrast) {
            this.applyContrast(preferences.contrast);
            const contrastButton = document.querySelector(`[data-contrast="${preferences.contrast}"]`);
            if (contrastButton) {
                this.updateActiveButton(document.querySelectorAll('.contrast-controls button'), contrastButton);
            }
        }
    }

    setupKeyboardShortcut() {
        document.addEventListener('keydown', (e) => {
            // Ctrl + Alt + A pour ouvrir/fermer le menu
            if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
                const menu = document.querySelector('.accessibility-menu');
                const toggleBtn = document.querySelector('.accessibility-toggle-btn');
                menu.classList.toggle('show');
                toggleBtn.setAttribute('aria-expanded', menu.classList.contains('show'));
            }
        });
    }
}

// Initialiser les contrôles d'accessibilité quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    new AccessibilityControls();
});
