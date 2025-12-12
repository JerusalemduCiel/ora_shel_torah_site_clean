/**
 * GLOSSAIRE INTERACTIF
 * Ora Shel Torah
 * 
 * Fonctionnalités :
 * - Recherche temps réel (terme français + hébreu)
 * - Filtres par catégorie
 * - Navigation alphabétique
 * - Animation des cartes
 */

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // ÉLÉMENTS DOM
    // =============================================
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearch');
    const resultsCount = document.getElementById('resultsCount');
    const glossaireList = document.getElementById('glossaireList');
    const noResults = document.getElementById('noResults');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const alphaButtons = document.querySelectorAll('.alpha-btn');
    const catButtons = document.querySelectorAll('.cat-btn');

    // =============================================
    // ÉTAT
    // =============================================
    let currentSearch = '';
    let currentLetter = 'all';
    let currentCategory = 'all';

    // =============================================
    // INITIALISATION
    // =============================================
    renderGlossaire();
    updateAvailableLetters();

    // =============================================
    // EVENT LISTENERS
    // =============================================
    
    // Recherche temps réel
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            currentSearch = e.target.value.toLowerCase().trim();
            if (clearSearchBtn) {
                clearSearchBtn.classList.toggle('visible', currentSearch.length > 0);
            }
            renderGlossaire();
        });
    }

    // Effacer la recherche
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
            if (searchInput) {
                searchInput.value = '';
                currentSearch = '';
                clearSearchBtn.classList.remove('visible');
                renderGlossaire();
                searchInput.focus();
            }
        });
    }

    // Navigation alphabétique
    alphaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            currentLetter = this.dataset.letter;
            alphaButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderGlossaire();
        });
    });

    // Filtres par catégorie
    catButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            currentCategory = this.dataset.category;
            catButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderGlossaire();
            updateAvailableLetters();
        });
    });

    // Réinitialiser les filtres
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            resetAllFilters();
        });
    }

    // =============================================
    // FONCTIONS
    // =============================================

    /**
     * Filtrer les termes selon les critères actifs
     */
    function filterTermes() {
        if (!window.GLOSSAIRE_DATA) {
            console.error('GLOSSAIRE_DATA non chargé');
            return [];
        }

        return GLOSSAIRE_DATA.filter(terme => {
            // Filtre par recherche
            if (currentSearch) {
                const searchMatch = 
                    terme.terme.toLowerCase().includes(currentSearch) ||
                    (terme.hebreu && terme.hebreu.includes(currentSearch)) ||
                    terme.definition.toLowerCase().includes(currentSearch);
                if (!searchMatch) return false;
            }

            // Filtre par lettre
            if (currentLetter !== 'all') {
                const firstLetter = terme.terme.charAt(0).toUpperCase();
                if (firstLetter !== currentLetter) return false;
            }

            // Filtre par catégorie
            if (currentCategory !== 'all') {
                // Gérer les catégories combinées (fetes + fetes_autres)
                if (currentCategory === 'fetes') {
                    if (terme.categorie !== 'fetes' && terme.categorie !== 'fetes_autres') return false;
                } else {
                    if (terme.categorie !== currentCategory) return false;
                }
            }

            return true;
        });
    }

    /**
     * Générer le HTML pour un terme
     */
    function createTermeCard(terme) {
        const cat = window.GLOSSAIRE_CATEGORIES && window.GLOSSAIRE_CATEGORIES[terme.categorie] 
            ? window.GLOSSAIRE_CATEGORIES[terme.categorie] 
            : { label: terme.categorie, icon: '📌' };
        
        return `
            <article class="terme-card">
                <header class="terme-header">
                    <h3 class="terme-nom">${terme.terme}</h3>
                    ${terme.hebreu ? `<span class="terme-hebreu">${terme.hebreu}</span>` : ''}
                </header>
                <p class="terme-definition">${terme.definition}</p>
                <span class="terme-category">
                    <span class="cat-icon">${cat.icon}</span>
                    ${cat.label}
                </span>
            </article>
        `;
    }

    /**
     * Générer le séparateur de lettre
     */
    function createLetterSeparator(letter) {
        return `
            <div class="letter-separator" id="letter-${letter}">
                <span>${letter}</span>
            </div>
        `;
    }

    /**
     * Afficher le glossaire filtré
     */
    function renderGlossaire() {
        if (!glossaireList) return;

        const filteredTermes = filterTermes();
        
        // Mettre à jour le compteur
        if (resultsCount) {
            resultsCount.textContent = filteredTermes.length;
        }

        // Gérer l'affichage "aucun résultat"
        if (filteredTermes.length === 0) {
            glossaireList.style.display = 'none';
            if (noResults) {
                noResults.style.display = 'block';
            }
            return;
        }

        glossaireList.style.display = 'grid';
        if (noResults) {
            noResults.style.display = 'none';
        }

        // Trier alphabétiquement
        filteredTermes.sort((a, b) => a.terme.localeCompare(b.terme, 'fr'));

        // Construire le HTML avec séparateurs de lettres
        let html = '';
        let currentFirstLetter = '';

        filteredTermes.forEach((terme, index) => {
            const firstLetter = terme.terme.charAt(0).toUpperCase();
            
            // Ajouter un séparateur si nouvelle lettre (sauf si on filtre par lettre)
            if (currentLetter === 'all' && firstLetter !== currentFirstLetter) {
                currentFirstLetter = firstLetter;
                html += createLetterSeparator(firstLetter);
            }

            html += createTermeCard(terme);
        });

        glossaireList.innerHTML = html;

        // Animation d'entrée
        const cards = glossaireList.querySelectorAll('.terme-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.03}s`;
        });
    }

    /**
     * Mettre à jour les lettres disponibles dans la nav alphabétique
     */
    function updateAvailableLetters() {
        if (!window.GLOSSAIRE_DATA) return;

        // Récupérer les termes filtrés par catégorie seulement
        const termesForLetters = GLOSSAIRE_DATA.filter(terme => {
            if (currentCategory === 'all') return true;
            if (currentCategory === 'fetes') {
                return terme.categorie === 'fetes' || terme.categorie === 'fetes_autres';
            }
            return terme.categorie === currentCategory;
        });

        // Trouver les lettres disponibles
        const availableLetters = new Set(
            termesForLetters.map(t => t.terme.charAt(0).toUpperCase())
        );

        // Mettre à jour les boutons
        alphaButtons.forEach(btn => {
            const letter = btn.dataset.letter;
            if (letter === 'all') {
                btn.classList.remove('disabled');
            } else {
                btn.classList.toggle('disabled', !availableLetters.has(letter));
            }
        });
    }

    /**
     * Réinitialiser tous les filtres
     */
    function resetAllFilters() {
        // Reset recherche
        if (searchInput) {
            searchInput.value = '';
            currentSearch = '';
        }
        if (clearSearchBtn) {
            clearSearchBtn.classList.remove('visible');
        }

        // Reset lettre
        currentLetter = 'all';
        alphaButtons.forEach(b => b.classList.remove('active'));
        const allBtn = document.querySelector('.alpha-btn[data-letter="all"]');
        if (allBtn) {
            allBtn.classList.add('active');
        }

        // Reset catégorie
        currentCategory = 'all';
        catButtons.forEach(b => b.classList.remove('active'));
        const allCatBtn = document.querySelector('.cat-btn[data-category="all"]');
        if (allCatBtn) {
            allCatBtn.classList.add('active');
        }

        // Re-render
        renderGlossaire();
        updateAvailableLetters();
    }

    // =============================================
    // RACCOURCIS CLAVIER
    // =============================================
    document.addEventListener('keydown', function(e) {
        // Ctrl+K ou / pour focus sur la recherche
        if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement !== searchInput)) {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }

        // Escape pour effacer la recherche
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            if (currentSearch && searchInput) {
                searchInput.value = '';
                currentSearch = '';
                if (clearSearchBtn) {
                    clearSearchBtn.classList.remove('visible');
                }
                renderGlossaire();
            } else if (searchInput) {
                searchInput.blur();
            }
        }
    });

});

