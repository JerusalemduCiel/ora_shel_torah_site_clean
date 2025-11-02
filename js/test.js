// TEST JAVASCRIPT SIMPLE
console.log('🧪 TEST.JS CHARGÉ');

// Afficher un message d'alerte au chargement
window.addEventListener('load', function() {
    console.log('🧪 PAGE CHARGÉE - TEST.JS FONCTIONNE');
    alert('🧪 TEST JAVASCRIPT - Si vous voyez cette alerte, le JavaScript fonctionne !');
});

// Test simple au clic
document.addEventListener('click', function() {
    console.log('🧪 CLIC DÉTECTÉ - JavaScript fonctionne');
});

// TEST SIMPLE - Ajouter un bouton de test
window.addEventListener('load', function() {
    const testButton = document.createElement('button');
    testButton.innerHTML = '🧪 BOUTON TEST';
    testButton.style.cssText = 'position: fixed; top: 10px; right: 10px; background: red; color: white; padding: 1rem; z-index: 99999; border: none; border-radius: 5px;';
    testButton.onclick = function() {
        alert('✅ BOUTON TEST FONCTIONNE !');
    };
    document.body.appendChild(testButton);
    
    console.log('🧪 BOUTON TEST AJOUTÉ');
});
