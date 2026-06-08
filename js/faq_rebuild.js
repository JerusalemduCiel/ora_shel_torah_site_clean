// ============================================================
// FAQ — Collection Lumières d'Israël (rebuild complet)
// Remplace l'ancien tableau `const faqData = [...]` dans faq.html
// Catégories (clés) : ost | livres | pratique | commande
// 19 entrées — PT/MOH/L'Année couverts, JDC retiré, dé-gamifié
// ============================================================

const faqData = [

  // === ORA SHEL TORAH ===
  {
    category: 'ost',
    question: `Qu'est-ce qu'Ora Shel Torah ?`,
    answer: `<p>Ora Shel Torah signifie « La Lumière de la Torah ». C'est une maison d'édition née du désir de transmettre l'héritage juif sous une forme accessible : le livre.</p>
<p>Notre mission : ouvrir les portes de la sagesse juive à tous — enfants comme adultes, débutants comme initiés — à travers des ouvrages clairs, rigoureux et beaux.</p>
<p><strong>Notre conviction :</strong> la Torah n'est pas réservée aux érudits. Un livre bien fait peut devenir une porte d'entrée vers l'étude, la mémoire et la réflexion.</p>`
  },
  {
    category: 'ost',
    question: `Qui a créé Ora Shel Torah ?`,
    answer: `<p><strong>Michael Lumbroso</strong>, fondateur d'Ora Shel Torah, est un baal techouva (juif de retour) qui a redécouvert le judaïsme à 54 ans.</p>
<p>Ni rabbin ni érudit, simplement animé par le désir d'apprendre et de transmettre, il a conçu cette collection pour ses enfants — et pour toutes les familles qui veulent renouer avec leur héritage sans présupposer d'érudition.</p>
<p><strong>Son message :</strong> « Ne pas attendre 54 ans pour découvrir son héritage. »</p>
<div class="info-box">
<p>💡 <strong>L'histoire du 770 :</strong> lorsque Michael a reçu son numéro d'enregistrement professionnel se terminant par « 770 » (l'adresse historique du Rabbi de Loubavitch), il y a vu un signe confirmant sa mission.</p>
</div>`
  },
  {
    category: 'ost',
    question: `Qu'est-ce que la collection Lumières d'Israël ?`,
    answer: `<p>Lumières d'Israël est la collection de livres patrimoniaux d'Ora Shel Torah. Elle compte aujourd'hui trois tomes :</p>
<ul>
<li><strong>Tome I — La Parole Transmise</strong> : 118 grandes figures qui ont façonné l'histoire et la pensée juives (296 pages).</li>
<li><strong>Tome II — Minhag ou Halakha</strong> : distinguer la loi (Halakha) de la coutume (Minhag), sources classiques à l'appui (18 chapitres, 344 pages).</li>
<li><strong>Tome III — L'Année d'Israël</strong> : le cycle des fêtes juives selon les quatre chemins de lecture du PaRDeS (552 pages).</li>
</ul>`
  },

  // === LES LIVRES ===
  {
    category: 'livres',
    question: `Qu'est-ce que La Parole Transmise ? (Tome I)`,
    answer: `<p>Premier tome de la collection, <strong>La Parole Transmise</strong> réunit 118 grandes figures qui ont porté et transmis la tradition juive au fil des siècles.</p>
<p>Chaque figure est présentée dans son contexte et son apport, pour saisir la chaîne de transmission qui relie les générations — et mettre des visages et des récits sur l'histoire de la pensée juive. (296 pages.)</p>`
  },
  {
    category: 'livres',
    question: `Qu'est-ce que Minhag ou Halakha ? (Tome II)`,
    answer: `<p>Deuxième tome, <strong>Minhag ou Halakha</strong> passe dix-huit pratiques juives au crible d'une question simple et vertigineuse : est-ce la Loi (Halakha) ou la coutume (Minhag) ?</p>
<p>Pour chaque cas, sources classiques à l'appui, le chapitre rend son verdict. Un ouvrage d'étude clair et honnête — quelque 150 lois et usages — pour comprendre ce que l'on fait, et pourquoi. (18 chapitres, 344 pages, relié.)</p>`
  },
  {
    category: 'livres',
    question: `Peut-on découvrir Minhag ou Halakha en ligne ?`,
    answer: `<p>Oui. Une version interactive en ligne permet d'explorer Minhag ou Halakha avant ou en complément du livre : on parcourt les cas et l'on teste son intuition (Halakha, Minhag, ou autre ?). Elle est accessible depuis la page du livre.</p>`
  },
  {
    category: 'livres',
    question: `Qu'est-ce que L'Année d'Israël ? (Tome III)`,
    answer: `<p>Troisième tome, <strong>L'Année d'Israël</strong> parcourt le cycle complet des fêtes juives, de Roch Hachana à Tou BeAv.</p>
<p>Chaque fête est abordée selon les quatre chemins de lecture du PaRDeS, pour la vivre à la fois dans son récit, son foyer, sa liturgie et son sens profond. Un grand ouvrage relié de 552 pages, compagnon de toute l'année juive.</p>`
  },
  {
    category: 'livres',
    question: `Que sont les 4 chemins de lecture PaRDeS ?`,
    answer: `<p>Le PaRDeS est une grille classique de lecture à quatre niveaux. L'Année d'Israël s'en inspire pour offrir quatre façons de traverser chaque fête :</p>
<ul>
<li><strong>Peshat — le récit</strong> : l'histoire et le sens premier de la fête.</li>
<li><strong>Remez — le foyer</strong> : les coutumes et les gestes à la maison.</li>
<li><strong>Drash — la liturgie</strong> : prières et textes de l'office.</li>
<li><strong>Sod — le sens</strong> : la dimension intérieure et mystique.</li>
</ul>
<p>On peut suivre un seul chemin ou les quatre, selon son envie et son moment.</p>`
  },
  {
    category: 'livres',
    question: `Pourquoi L'Année est-elle en pré-commande ?`,
    answer: `<p>L'Année d'Israël est un ouvrage exigeant à fabriquer (grand format relié, dorure, jaquette, marque-pages). La pré-commande nous permet de lancer l'impression au plus juste, et vous garantit votre exemplaire ainsi que la priorité d'expédition — à un tarif avantageux par rapport au prix après sortie.</p>`
  },

  // === QUESTIONS PRATIQUES ===
  {
    category: 'pratique',
    question: `Vos livres sont-ils compatibles Shabbat ?`,
    answer: `<p>Oui. Un livre se lit et se feuillette sans difficulté à Shabbat : aucune écriture, aucune électronique, aucune mécanique problématique. Nos ouvrages sont pensés comme des compagnons d'étude et de partage pour le Shabbat et les fêtes.</p>
<p>Pour toute question propre à votre pratique, consultez votre Rav.</p>`
  },
  {
    category: 'pratique',
    question: `Sur quelles sources s'appuient les livres ?`,
    answer: `<p>Les contenus s'appuient sur le corpus classique de la tradition, dans la perspective séfarade orthodoxe :</p>
<ul>
<li>le <strong>Tanakh</strong> et le <strong>Talmud</strong> (Bavli et Yerushalmi) ;</li>
<li>la <strong>Mishné Torah</strong> du Rambam ;</li>
<li>le <strong>Choul'han Aroukh</strong> de Rabbi Yossef Caro et ses commentateurs ;</li>
<li>les grandes autorités séfarades de référence : le <strong>Ben Ich 'Haï</strong> (Rabbi Yossef Hayim de Bagdad), le <strong>Kaf Hahayim</strong> (Rabbi Yaakov Hayim Sofer) et le <strong>Yalkout Yossef</strong> (Rabbi Ovadia Yossef).</li>
</ul>
<p>Chaque contenu est rattaché à ses sources, pour que le lecteur puisse vérifier et approfondir par lui-même.</p>`
  },
  {
    category: 'pratique',
    question: `Comment les contenus sont-ils vérifiés ?`,
    answer: `<p>Chaque contenu est établi à partir des sources classiques citées plus haut, recoupé, puis relu par un étudiant de kollel au regard de ces mêmes sources, afin d'écarter tout élément contraire aux textes normatifs orthodoxes séfarades.</p>
<div class="info-box important">
<p><strong>Important :</strong> ces ouvrages ont une vocation pédagogique ; ils ne constituent pas une décision rabbinique (psak). Pour toute question pratique, consultez votre Rav.</p>
</div>`
  },
  {
    category: 'pratique',
    question: `Faut-il des connaissances préalables ?`,
    answer: `<p><strong>Non</strong> — c'est même l'esprit de la collection : conçue par un autodidacte, pour des lecteurs de tous niveaux.</p>
<p>Les débutants y trouvent des bases claires ; les pratiquants, des aspects méconnus et des sources à approfondir. On apprend à son rythme, sans prérequis.</p>`
  },
  {
    category: 'pratique',
    question: `En quelles langues les livres existent-ils ?`,
    answer: `<p>Actuellement en <strong>français</strong>. Des versions anglaise et hébraïque sont envisagées selon la demande. Si une autre langue vous intéresse, écrivez-nous.</p>`
  },
  {
    category: 'pratique',
    question: `Proposez-vous des tarifs pour les communautés et les écoles ?`,
    answer: `<p>Oui, pour les commandes groupées — communautés, écoles juives, yeshivot, bibliothèques, associations familiales.</p>
<p>Écrivez-nous à <a href="mailto:contact@orasheltorah.com">contact@orasheltorah.com</a> pour un devis adapté.</p>`
  },

  // === COMMANDE & LIVRAISON ===
  {
    category: 'commande',
    question: `Comment commander ou précommander ?`,
    answer: `<p>Les livres sont en vente directe sur notre site, sans intermédiaire — ce qui nous permet de garder des prix accessibles.</p>
<p>Les tomes disponibles s'achètent immédiatement ; <strong>L'Année d'Israël</strong> est en pré-commande, qui garantit votre exemplaire et la priorité d'expédition. Le paiement est sécurisé.</p>`
  },
  {
    category: 'commande',
    question: `Quels sont les modes de livraison et les frais ?`,
    answer: `<ul>
<li><strong>France métropolitaine</strong> : Colissimo, frais fixes de 7,59 €. Point relais <strong>Mondial Relay</strong> également disponible (tarif indiqué au paiement).</li>
<li><strong>Click &amp; Collect</strong> : retrait gratuit chez Blush General Store — 7 rue Ney, 69006 Lyon (du mardi au samedi, 10 h–19 h).</li>
<li><strong>Israël, États-Unis et autres destinations</strong> : écrivez-nous à <a href="mailto:contact@orasheltorah.com">contact@orasheltorah.com</a> pour un devis.</li>
</ul>`
  },
  {
    category: 'commande',
    question: `Comment annuler ma pré-commande ?`,
    answer: `<p>Une pré-commande peut être annulée tant que votre commande n'a pas été expédiée : écrivez-nous à <a href="mailto:contact@orasheltorah.com">contact@orasheltorah.com</a> et nous procédons au remboursement.</p>`
  },
  {
    category: 'commande',
    question: `Et si mon livre arrive abîmé ?`,
    answer: `<p>Si votre exemplaire arrive endommagé, écrivez-nous à <a href="mailto:contact@orasheltorah.com">contact@orasheltorah.com</a> (idéalement avec une photo) et nous vous envoyons un remplacement. Le détail figure sur notre page Retours &amp; remboursements.</p>`
  }

];


// ============================================================
// BARRE DE FILTRES — remplace les boutons existants (.filters)
// ============================================================
/*
<div class="filters">
    <button class="filter-btn active" data-filter="all">Tout voir</button>
    <button class="filter-btn" data-filter="ost">Ora Shel Torah</button>
    <button class="filter-btn" data-filter="livres">Les livres</button>
    <button class="filter-btn" data-filter="pratique">Questions pratiques</button>
    <button class="filter-btn" data-filter="commande">Commande &amp; livraison</button>
</div>
*/


// ============================================================
// getCategoryName — mapping à utiliser (adapter à la forme existante)
// ============================================================
/*
const names = {
    'ost': 'Ora Shel Torah',
    'livres': 'Les livres',
    'pratique': 'Questions pratiques',
    'commande': 'Commande & livraison'
};
// retour: names[category] || category
*/
