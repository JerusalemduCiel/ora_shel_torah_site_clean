/* ========================================
   MODALE CERTIFICATS HALAKHIQUES
   ======================================== */

(function() {
    'use strict';

    let modalInitialized = false;
    let overlayElement = null;

    /* ========================================
       INITIALISATION
       ======================================== */

    function init() {
        // Créer la modale dans le DOM
        createModal();

        // Intercepter le bouton "Voir nos certificats"
        interceptCertificatesButton();

        // Gérer la fermeture
        setupCloseHandlers();

        modalInitialized = true;
        console.log('✅ Modale certificats initialisée');
    }

    /* ========================================
       CRÉATION DE LA MODALE
       ======================================== */

    function createModal() {
        // Créer l'overlay
        const overlay = document.createElement('div');
        overlay.className = 'certificates-overlay';
        overlay.id = 'certificates-overlay';

        // Créer la modale
        const modal = document.createElement('div');
        modal.className = 'certificates-modal';

        modal.innerHTML = `
            <button class="certificates-close" aria-label="Fermer" type="button">×</button>
            
            <div class="certificates-content">
                <h2 class="certificates-title">Nos Certificats</h2>
                
                <!-- Certificat 1 : Conformité Halakhique -->
                <div class="certificate">
                    <h3 class="certificate-subtitle">Certificat de conformité halakhique (édition Jérusalem du Ciel)</h3>
                    
                    <div class="certificate-content">
                        <p>
                            Le présent document atteste que l'intégralité des contenus du jeu Jérusalem du Ciel — soit 1475 fiches (questions, réponses, analyses, dilemmes, énigmes et commentaires) — a été générée initialement à l'aide d'outils d'intelligence artificielle, puis relue et vérifiée systématiquement.
                        </p>
                        
                        <p><strong>Procédure appliquée :</strong></p>
                        <ul class="certificate-procedure">
                            <li>Lecture et contrôle de chaque fiche par un module de cohérence interne</li>
                            <li>Confrontation des formulations avec les sources halakhiques de référence : Torah écrite et Torah orale, Rambam (Mishné Torah), Choul'han Aroukh et ses commentateurs (Rema, Michna Beroura), Responsa classiques et contemporaines</li>
                            <li>Signalement des divergences éventuelles, soumises à une nouvelle vérification</li>
                            <li>Suppression définitive des 3 fiches jugées sujettes à controverse</li>
                        </ul>
                        
                        <p>
                            À l'issue de ce processus, le corpus restant ne contient aucun élément contraire aux textes normatifs et respecte les codes de la halakha dans ses dimensions les plus exigeantes.
                        </p>
                    </div>
                    
                    <div class="certificate-warning">
                        Ce jeu a une vocation pédagogique et ludique. Il ne saurait remplacer une décision halakhique. Pour toute question pratique, consultez votre Rav.
                    </div>
                </div>
                
                <!-- Séparateur -->
                <div class="certificate-separator"></div>
                
                <!-- Certificat 2 : Compatibilité Shabbat -->
                <div class="certificate">
                    <h3 class="certificate-subtitle">Compatibilité Shabbat – Règle générale</h3>
                    
                    <div class="certificate-content">
                        <p>
                            Les jeux édités par Ora Shel Torah ont été conçus pour être compatibles avec l'esprit et les lois du Shabbat.
                        </p>
                        
                        <p><strong>Halakhot et mélakhot prises en compte :</strong></p>
                        <ul class="certificate-halakhot">
                            <li><strong>Écriture / Effacement (kotev, mo'hek)</strong> : aucun écrit, tout se fait par jetons et pions</li>
                            <li><strong>Transactions</strong> : aucun argent ni gain matériel</li>
                            <li><strong>Électricité</strong> : aucune technologie requise</li>
                            <li><strong>Comptage</strong> : par jetons visibles, « plus / moins / égal » autorisé (Choul'han Aroukh O.H. 323 ; Michna Beroura 323:20)</li>
                            <li><strong>Muktze</strong> : cartes, dés et jetons sont des objets de jeu utilisables le Shabbat</li>
                        </ul>
                        
                        <p>
                            <strong>Conclusion :</strong> Aucune mélakha interdite n'est impliquée. Les jeux restent joyeux, éducatifs et shabbat-friendly, sans altérer la sainteté du jour.
                        </p>
                    </div>
                    
                    <div class="certificate-warning">
                        Pour toute question particulière, demandez conseil à votre Rav.
                    </div>
                </div>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        overlayElement = overlay;
    }

    /* ========================================
       INTERCEPTION DU BOUTON
       ======================================== */

    function interceptCertificatesButton() {
        // Chercher le bouton par texte et par attribut data-scroll-to
        const allButtons = document.querySelectorAll('button');
        allButtons.forEach(button => {
            // Vérifier par texte ou par attribut
            if (button.textContent.includes('Voir nos certificats') || 
                button.getAttribute('data-scroll-to') === 'certificats') {
                // Utiliser capture: true pour intercepter avant les autres handlers
                button.addEventListener('click', handleCertificatesClick, true);
            }
        });

        // Observer les nouveaux éléments ajoutés dynamiquement
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        if (node.tagName === 'BUTTON' && node.textContent.includes('Voir nos certificats')) {
                            node.addEventListener('click', handleCertificatesClick);
                        }
                        
                        // Vérifier les descendants
                        const buttons = node.querySelectorAll && node.querySelectorAll('button');
                        if (buttons) {
                            buttons.forEach(btn => {
                                if (btn.textContent.includes('Voir nos certificats') || 
                                    btn.getAttribute('data-scroll-to') === 'certificats') {
                                    btn.addEventListener('click', handleCertificatesClick, true);
                                }
                            });
                        }
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /* ========================================
       GESTION DES CLICS
       ======================================== */

    function handleCertificatesClick(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        // Ouvrir la modale
        showModal();

        return false;
    }

    /* ========================================
       AFFICHAGE/FERMETURE DE LA MODALE
       ======================================== */

    function showModal() {
        if (!overlayElement) {
            createModal();
        }

        // Afficher avec animation
        overlayElement.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            overlayElement.classList.add('active');
        }, 10);
    }

    function closeModal() {
        if (!overlayElement) return;

        overlayElement.classList.remove('active');
        document.body.style.overflow = '';

        setTimeout(() => {
            overlayElement.style.display = 'none';
        }, 300);
    }

    function setupCloseHandlers() {
        if (!overlayElement) return;

        // Bouton X
        const closeBtn = overlayElement.querySelector('.certificates-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Clic sur l'overlay (hors de la modale)
        overlayElement.addEventListener('click', (e) => {
            if (e.target === overlayElement) {
                closeModal();
            }
        });

        // Touche Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlayElement && overlayElement.classList.contains('active')) {
                closeModal();
            }
        });

        // Empêcher la propagation des clics dans la modale
        const modal = overlayElement.querySelector('.certificates-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    /* ========================================
       DÉMARRAGE
       ======================================== */

    // Attendre que le DOM soit prêt
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

