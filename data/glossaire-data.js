/**
 * DONNÉES DU GLOSSAIRE HÉBREU
 * Ora Shel Torah - Plus de 200 termes
 * 
 * Structure :
 * {
 *   terme: "Nom français",
 *   hebreu: "Nom hébreu (optionnel)",
 *   definition: "Définition claire",
 *   categorie: "identifiant-categorie"
 * }
 */

const GLOSSAIRE_CATEGORIES = {
    textes: { label: "Textes fondamentaux", icon: "📜" },
    etude: { label: "Méthodes d'étude", icon: "📖" },
    prieres: { label: "Prières et offices", icon: "🙏" },
    quotidien: { label: "Pratiques quotidiennes", icon: "✡️" },
    cacherout: { label: "Cacherout", icon: "🍽️" },
    shabbat: { label: "Shabbat", icon: "🕯️" },
    fetes: { label: "Fêtes de pèlerinage", icon: "🎉" },
    fetes_autres: { label: "Autres fêtes", icon: "🎊" },
    halakha: { label: "Halakha et Minhag", icon: "⚖️" },
    spirituel: { label: "Concepts spirituels", icon: "✨" },
    midot: { label: "Midot - Qualités morales", icon: "💛" },
    mitsvot: { label: "Pratiques et Mitsvot", icon: "🤝" },
    cycle: { label: "Cycle de vie", icon: "🔄" },
    lieux: { label: "Lieux et institutions", icon: "🏛️" },
    temple: { label: "Le Temple", icon: "🕍" },
    personnages: { label: "Personnages", icon: "👤" },
    interdits: { label: "Interdits", icon: "⚠️" },
    agricole: { label: "Lois agricoles", icon: "🌾" },
    histoire: { label: "Périodes historiques", icon: "📅" },
    expressions: { label: "Expressions usuelles", icon: "💬" }
};

const GLOSSAIRE_DATA = [
    // =============================================
    // A. TEXTES FONDAMENTAUX
    // =============================================
    { terme: "Torah", hebreu: "תורה", definition: "Les cinq livres de Moïse, enseignement divin transmis au Sinaï", categorie: "textes" },
    { terme: "Tanakh", hebreu: "תנ״ך", definition: "Bible hébraïque : Torah, Neviim (Prophètes), Ketouvim (Écrits)", categorie: "textes" },
    { terme: "Mishnah", hebreu: "משנה", definition: "Première compilation de la Loi orale par Rabbi Yehouda HaNassi (IIe s.)", categorie: "textes" },
    { terme: "Talmud", hebreu: "תלמוד", definition: "Discussions des Sages expliquant la Mishnah (Babylone et Jérusalem)", categorie: "textes" },
    { terme: "Guemara", hebreu: "גמרא", definition: "Commentaire araméen de la Mishnah, partie centrale du Talmud", categorie: "textes" },
    { terme: "Midrash", hebreu: "מדרש", definition: "Récits et explications homilétiques sur la Torah", categorie: "textes" },
    { terme: "Zohar", hebreu: "זוהר", definition: "Livre central de la Kabbale, attribué à Rabbi Shimon bar Yohaï", categorie: "textes" },
    { terme: "Siddour", hebreu: "סידור", definition: "Livre de prières quotidiennes", categorie: "textes" },
    { terme: "Sefer Torah", hebreu: "ספר תורה", definition: "Rouleau manuscrit de la Torah, objet le plus sacré", categorie: "textes" },
    { terme: "Choul'han Aroukh", hebreu: "שולחן ערוך", definition: "Code de loi juive de Rabbi Yossef Karo (XVIe s.)", categorie: "textes" },
    { terme: "Paracha", hebreu: "פרשה", definition: "Section hebdomadaire de la Torah lue le Shabbat", categorie: "textes" },
    { terme: "Dvar Torah", hebreu: "דבר תורה", definition: "Enseignement ou réflexion sur un texte de la Torah", categorie: "textes" },
    { terme: "Psouk", hebreu: "פסוק", definition: "Verset biblique", categorie: "textes" },
    { terme: "Perek", hebreu: "פרק", definition: "Chapitre d'un texte sacré", categorie: "textes" },
    { terme: "Massekhet", hebreu: "מסכת", definition: "Traité du Talmud", categorie: "textes" },

    // =============================================
    // B. MÉTHODES D'ÉTUDE
    // =============================================
    { terme: "Pshat", hebreu: "פשט", definition: "Sens littéral, première lecture du texte", categorie: "etude" },
    { terme: "Remez", hebreu: "רמז", definition: "Allusion, sens caché derrière les mots", categorie: "etude" },
    { terme: "Drash", hebreu: "דרש", definition: "Interprétation homilétique, enseignement moral", categorie: "etude" },
    { terme: "Sod", hebreu: "סוד", definition: "Sens mystique, secrets de la Kabbale", categorie: "etude" },
    { terme: "PaRDeS", hebreu: "פרדס", definition: "Les 4 niveaux d'interprétation (Pshat, Remez, Drash, Sod)", categorie: "etude" },
    { terme: "Pilpoul", hebreu: "פלפול", definition: "Dialectique talmudique, art du débat logique", categorie: "etude" },
    { terme: "Havruta", hebreu: "חברותא", definition: "Étude en binôme, tradition d'apprentissage dialogué", categorie: "etude" },
    { terme: "Siyoum", hebreu: "סיום", definition: "Célébration marquant la fin de l'étude d'un traité", categorie: "etude" },
    { terme: "Talmud Torah", hebreu: "תלמוד תורה", definition: "L'étude de la Torah, commandement fondamental", categorie: "etude" },
    { terme: "Lishma", hebreu: "לשמה", definition: "Étude désintéressée, pour l'amour de la Torah", categorie: "etude" },
    { terme: "Guematria", hebreu: "גימטריה", definition: "Calcul de la valeur numérique des lettres hébraïques", categorie: "etude" },

    // =============================================
    // C. PRIÈRES ET OFFICES
    // =============================================
    { terme: "Tefila", hebreu: "תפילה", definition: "Prière, dialogue avec Dieu", categorie: "prieres" },
    { terme: "Shaharit", hebreu: "שחרית", definition: "Prière du matin", categorie: "prieres" },
    { terme: "Minha", hebreu: "מנחה", definition: "Prière de l'après-midi", categorie: "prieres" },
    { terme: "Arvit / Maariv", hebreu: "ערבית / מעריב", definition: "Prière du soir", categorie: "prieres" },
    { terme: "Amida / Shemoné Esré", hebreu: "עמידה / שמונה עשרה", definition: "Prière centrale récitée debout (18 bénédictions)", categorie: "prieres" },
    { terme: "Shema Israël", hebreu: "שמע ישראל", definition: "Proclamation de l'unicité divine, prière fondamentale", categorie: "prieres" },
    { terme: "Kaddish", hebreu: "קדיש", definition: "Prière de sanctification, récitée notamment en deuil", categorie: "prieres" },
    { terme: "Hallel", hebreu: "הלל", definition: "Psaumes de louange récités les jours de fête", categorie: "prieres" },
    { terme: "Berakha", hebreu: "ברכה", definition: "Bénédiction", categorie: "prieres" },
    { terme: "Amen", hebreu: "אמן", definition: "Réponse affirmative aux bénédictions", categorie: "prieres" },
    { terme: "Minyan", hebreu: "מניין", definition: "Quorum de 10 hommes pour la prière publique", categorie: "prieres" },
    { terme: "Kavana", hebreu: "כוונה", definition: "Intention, concentration dans la prière", categorie: "prieres" },

    // =============================================
    // D. OBJETS ET PRATIQUES QUOTIDIENNES
    // =============================================
    { terme: "Tefilin", hebreu: "תפילין", definition: "Phylactères portés à la prière du matin", categorie: "quotidien" },
    { terme: "Talit", hebreu: "טלית", definition: "Châle de prière avec tsitsit aux quatre coins", categorie: "quotidien" },
    { terme: "Tsitsit", hebreu: "ציצית", definition: "Franges rituelles rappelant les commandements", categorie: "quotidien" },
    { terme: "Mezouza", hebreu: "מזוזה", definition: "Parchemin sacré fixé aux montants des portes", categorie: "quotidien" },
    { terme: "Kippa", hebreu: "כיפה", definition: "Couvre-chef porté par respect envers Dieu", categorie: "quotidien" },
    { terme: "Modé Ani", hebreu: "מודה אני", definition: "Prière de gratitude au réveil", categorie: "quotidien" },
    { terme: "Netilat Yadayim", hebreu: "נטילת ידיים", definition: "Ablution rituelle des mains", categorie: "quotidien" },
    { terme: "Birkat Hamazon", hebreu: "ברכת המזון", definition: "Bénédiction après le repas", categorie: "quotidien" },
    { terme: "Mikvé", hebreu: "מקווה", definition: "Bain rituel de purification", categorie: "quotidien" },

    // =============================================
    // E. CACHEROUT
    // =============================================
    { terme: "Kashrout", hebreu: "כשרות", definition: "Ensemble des lois alimentaires juives", categorie: "cacherout" },
    { terme: "Casher / Kosher", hebreu: "כשר", definition: "Conforme aux lois alimentaires", categorie: "cacherout" },
    { terme: "Tarèf / Treif", hebreu: "טרף", definition: "Non conforme, interdit à la consommation", categorie: "cacherout" },
    { terme: "Bassari", hebreu: "בשרי", definition: "Catégorie viande", categorie: "cacherout" },
    { terme: "Halavi", hebreu: "חלבי", definition: "Catégorie lactée", categorie: "cacherout" },
    { terme: "Parve", hebreu: "פרווה", definition: "Neutre (ni viande ni lait)", categorie: "cacherout" },
    { terme: "Shehita", hebreu: "שחיטה", definition: "Abattage rituel", categorie: "cacherout" },
    { terme: "Hallah", hebreu: "חלה", definition: "Prélèvement de la pâte / Pain tressé du Shabbat", categorie: "cacherout" },

    // =============================================
    // F. SHABBAT
    // =============================================
    { terme: "Shabbat", hebreu: "שבת", definition: "Jour de repos sacré, du vendredi soir au samedi soir", categorie: "shabbat" },
    { terme: "Kiddouch", hebreu: "קידוש", definition: "Sanctification du Shabbat sur le vin", categorie: "shabbat" },
    { terme: "Havdala", hebreu: "הבדלה", definition: "Cérémonie de clôture du Shabbat", categorie: "shabbat" },
    { terme: "Nerot Shabbat", hebreu: "נרות שבת", definition: "Bougies allumées pour accueillir le Shabbat", categorie: "shabbat" },
    { terme: "Oneg Shabbat", hebreu: "עונג שבת", definition: "Plaisir du Shabbat, joie de ce jour", categorie: "shabbat" },
    { terme: "Kavod Shabbat", hebreu: "כבוד שבת", definition: "Honneur dû au Shabbat (préparatifs)", categorie: "shabbat" },
    { terme: "Motsei Shabbat", hebreu: "מוצאי שבת", definition: "Sortie du Shabbat (samedi soir)", categorie: "shabbat" },
    { terme: "Erev Shabbat", hebreu: "ערב שבת", definition: "Veille du Shabbat (vendredi)", categorie: "shabbat" },

    // =============================================
    // G. FÊTES DE PÈLERINAGE
    // =============================================
    { terme: "Pessa'h", hebreu: "פסח", definition: "Pâque juive, commémoration de la sortie d'Égypte", categorie: "fetes" },
    { terme: "Matsa", hebreu: "מצה", definition: "Pain azyme mangé à Pessa'h", categorie: "fetes" },
    { terme: "Maror", hebreu: "מרור", definition: "Herbes amères symbolisant l'esclavage", categorie: "fetes" },
    { terme: "Seder", hebreu: "סדר", definition: "Repas rituel de Pessa'h", categorie: "fetes" },
    { terme: "Haggada", hebreu: "הגדה", definition: "Récit de la sortie d'Égypte lu au Seder", categorie: "fetes" },
    { terme: "Afikoman", hebreu: "אפיקומן", definition: "Morceau de matsa caché et partagé en fin de Seder", categorie: "fetes" },
    { terme: "Chavouot", hebreu: "שבועות", definition: "Fête des Semaines, don de la Torah", categorie: "fetes" },
    { terme: "Bikourim", hebreu: "ביכורים", definition: "Prémices offertes au Temple à Chavouot", categorie: "fetes" },
    { terme: "Tikkoun", hebreu: "תיקון", definition: "Veillée d'étude la nuit de Chavouot", categorie: "fetes" },
    { terme: "Souccot", hebreu: "סוכות", definition: "Fête des Cabanes, rappelant les 40 ans au désert", categorie: "fetes" },
    { terme: "Souccah", hebreu: "סוכה", definition: "Cabane où l'on habite pendant Souccot", categorie: "fetes" },
    { terme: "Loulav", hebreu: "לולב", definition: "Branche de palmier des quatre espèces", categorie: "fetes" },
    { terme: "Etrog", hebreu: "אתרוג", definition: "Cédrat des quatre espèces", categorie: "fetes" },
    { terme: "Ushpizin", hebreu: "אושפיזין", definition: "Invités spirituels accueillis dans la Souccah", categorie: "fetes" },
    { terme: "Simhat Torah", hebreu: "שמחת תורה", definition: "Fête de la joie de la Torah", categorie: "fetes" },

    // =============================================
    // H. JOURS REDOUTABLES ET AUTRES FÊTES
    // =============================================
    { terme: "Rosh Hashana", hebreu: "ראש השנה", definition: "Nouvel An juif, jour du jugement divin", categorie: "fetes_autres" },
    { terme: "Shofar", hebreu: "שופר", definition: "Corne de bélier sonnée à Rosh Hashana", categorie: "fetes_autres" },
    { terme: "Yom Kippour", hebreu: "יום כיפור", definition: "Jour du Grand Pardon, jeûne et expiation", categorie: "fetes_autres" },
    { terme: "Vidouï", hebreu: "וידוי", definition: "Confession des fautes", categorie: "fetes_autres" },
    { terme: "Kapparot", hebreu: "כפרות", definition: "Rite expiatoire avant Yom Kippour", categorie: "fetes_autres" },
    { terme: "Hanoukka", hebreu: "חנוכה", definition: "Fête des Lumières, victoire des Maccabées", categorie: "fetes_autres" },
    { terme: "Hanoukia", hebreu: "חנוכיה", definition: "Chandelier à 9 branches de Hanoukka", categorie: "fetes_autres" },
    { terme: "Pourim", hebreu: "פורים", definition: "Fête commémorant le salut par Esther", categorie: "fetes_autres" },
    { terme: "Meguila", hebreu: "מגילה", definition: "Rouleau d'Esther lu à Pourim", categorie: "fetes_autres" },
    { terme: "Mishloach Manot", hebreu: "משלוח מנות", definition: "Envoi de mets à Pourim", categorie: "fetes_autres" },
    { terme: "Matanot LaEvyonim", hebreu: "מתנות לאביונים", definition: "Dons aux pauvres à Pourim", categorie: "fetes_autres" },
    { terme: "Lag BaOmer", hebreu: "ל״ג בעומר", definition: "33e jour du Omer, feux et réjouissances", categorie: "fetes_autres" },
    { terme: "Tou BiShvat", hebreu: "ט״ו בשבט", definition: "Nouvel An des arbres", categorie: "fetes_autres" },
    { terme: "Tisha BeAv", hebreu: "תשעה באב", definition: "Jeûne commémorant la destruction du Temple", categorie: "fetes_autres" },
    { terme: "Yom Tov", hebreu: "יום טוב", definition: "Jour de fête", categorie: "fetes_autres" },
    { terme: "Hol HaMoed", hebreu: "חול המועד", definition: "Jours intermédiaires des fêtes", categorie: "fetes_autres" },
    { terme: "Omer", hebreu: "עומר", definition: "Compte de 49 jours entre Pessa'h et Chavouot", categorie: "fetes_autres" },

    // =============================================
    // I. HALAKHA ET MINHAG
    // =============================================
    { terme: "Halakha", hebreu: "הלכה", definition: "Loi religieuse juive, règle obligatoire", categorie: "halakha" },
    { terme: "Minhag", hebreu: "מנהג", definition: "Coutume communautaire, tradition non obligatoire", categorie: "halakha" },
    { terme: "Min HaTorah", hebreu: "מן התורה", definition: "Obligation d'origine biblique", categorie: "halakha" },
    { terme: "Min DeRabanan", hebreu: "מדרבנן", definition: "Obligation d'origine rabbinique", categorie: "halakha" },
    { terme: "Averah", hebreu: "עבירה", definition: "Transgression, faute", categorie: "halakha" },
    { terme: "Assour", hebreu: "אסור", definition: "Interdit", categorie: "halakha" },
    { terme: "Moutar", hebreu: "מותר", definition: "Permis", categorie: "halakha" },
    { terme: "Middat Hassidout", hebreu: "מידת חסידות", definition: "Mesure de piété allant au-delà de la loi", categorie: "halakha" },
    { terme: "Posek", hebreu: "פוסק", definition: "Décisionnaire en matière de Halakha", categorie: "halakha" },
    { terme: "Dayan", hebreu: "דיין", definition: "Juge rabbinique", categorie: "halakha" },

    // =============================================
    // J. CONCEPTS SPIRITUELS
    // =============================================
    { terme: "Emouna", hebreu: "אמונה", definition: "Foi, confiance profonde en Dieu", categorie: "spirituel" },
    { terme: "Bitachon", hebreu: "בטחון", definition: "Confiance sereine en la providence divine", categorie: "spirituel" },
    { terme: "Teshouva", hebreu: "תשובה", definition: "Repentir, retour vers Dieu", categorie: "spirituel" },
    { terme: "Kedousha", hebreu: "קדושה", definition: "Sainteté, consécration", categorie: "spirituel" },
    { terme: "Yetser Hatov", hebreu: "יצר הטוב", definition: "Inclination au bien", categorie: "spirituel" },
    { terme: "Yetser Hara", hebreu: "יצר הרע", definition: "Inclination au mal, tentation", categorie: "spirituel" },
    { terme: "Neshama", hebreu: "נשמה", definition: "Âme", categorie: "spirituel" },
    { terme: "Olam Haba", hebreu: "עולם הבא", definition: "Monde à venir", categorie: "spirituel" },
    { terme: "Olam Hazeh", hebreu: "עולם הזה", definition: "Ce monde-ci", categorie: "spirituel" },
    { terme: "Mashiah", hebreu: "משיח", definition: "Le Messie attendu", categorie: "spirituel" },
    { terme: "Geula", hebreu: "גאולה", definition: "Rédemption", categorie: "spirituel" },
    { terme: "Shekhina", hebreu: "שכינה", definition: "Présence divine", categorie: "spirituel" },
    { terme: "Hashgaha Pratit", hebreu: "השגחה פרטית", definition: "Providence divine individuelle", categorie: "spirituel" },
    { terme: "Kiddush Hashem", hebreu: "קידוש השם", definition: "Sanctification du Nom divin", categorie: "spirituel" },
    { terme: "Hillul Hashem", hebreu: "חילול השם", definition: "Profanation du Nom divin", categorie: "spirituel" },
    { terme: "Segoula", hebreu: "סגולה", definition: "Vertu protectrice, remède spirituel", categorie: "spirituel" },
    { terme: "Heshbon Nefesh", hebreu: "חשבון נפש", definition: "Examen de conscience", categorie: "spirituel" },

    // =============================================
    // K. MIDOT - QUALITÉS MORALES
    // =============================================
    { terme: "Midot", hebreu: "מידות", definition: "Traits de caractère à cultiver", categorie: "midot" },
    { terme: "Hessed", hebreu: "חסד", definition: "Bonté gratuite, bienveillance", categorie: "midot" },
    { terme: "Tsedaka", hebreu: "צדקה", definition: "Justice, don aux nécessiteux", categorie: "midot" },
    { terme: "Emet", hebreu: "אמת", definition: "Vérité", categorie: "midot" },
    { terme: "Anava", hebreu: "ענווה", definition: "Humilité", categorie: "midot" },
    { terme: "Simha", hebreu: "שמחה", definition: "Joie", categorie: "midot" },
    { terme: "Savlanout", hebreu: "סבלנות", definition: "Patience", categorie: "midot" },
    { terme: "Tsniout", hebreu: "צניעות", definition: "Pudeur, modestie", categorie: "midot" },
    { terme: "Kavod", hebreu: "כבוד", definition: "Respect, honneur", categorie: "midot" },
    { terme: "Hakarat Hatov", hebreu: "הכרת הטוב", definition: "Reconnaissance, gratitude", categorie: "midot" },
    { terme: "Ahavat Israël", hebreu: "אהבת ישראל", definition: "Amour du prochain juif", categorie: "midot" },
    { terme: "Rodef Shalom", hebreu: "רודף שלום", definition: "Celui qui poursuit la paix", categorie: "midot" },
    { terme: "Derech Eretz", hebreu: "דרך ארץ", definition: "Savoir-vivre, bonnes manières", categorie: "midot" },
    { terme: "Nedivout", hebreu: "נדיבות", definition: "Générosité", categorie: "midot" },
    { terme: "Panim Yafot", hebreu: "פנים יפות", definition: "Accueil chaleureux, bonne mine", categorie: "midot" },

    // =============================================
    // L. PRATIQUES ET MITSVOT
    // =============================================
    { terme: "Mitsvah", hebreu: "מצווה", definition: "Commandement divin (613 au total)", categorie: "mitsvot" },
    { terme: "Brit Mila", hebreu: "ברית מילה", definition: "Circoncision au 8e jour", categorie: "mitsvot" },
    { terme: "Bar / Bat Mitsvah", hebreu: "בר / בת מצווה", definition: "Majorité religieuse (13/12 ans)", categorie: "mitsvot" },
    { terme: "Pidyon HaBen", hebreu: "פדיון הבן", definition: "Rachat du premier-né", categorie: "mitsvot" },
    { terme: "Bikour Holim", hebreu: "ביקור חולים", definition: "Visite aux malades", categorie: "mitsvot" },
    { terme: "Hakhnasat Orhim", hebreu: "הכנסת אורחים", definition: "Hospitalité", categorie: "mitsvot" },
    { terme: "Hashavat Aveida", hebreu: "השבת אבידה", definition: "Restitution d'un objet perdu", categorie: "mitsvot" },
    { terme: "Pikouah Nefesh", hebreu: "פיקוח נפש", definition: "Sauver une vie (priorité absolue)", categorie: "mitsvot" },
    { terme: "Nichoum Avelim", hebreu: "ניחום אבלים", definition: "Consolation des endeuillés", categorie: "mitsvot" },
    { terme: "Tefilat HaDerekh", hebreu: "תפילת הדרך", definition: "Prière du voyageur", categorie: "mitsvot" },
    { terme: "Kibboud Av VaEm", hebreu: "כיבוד אב ואם", definition: "Honorer ses parents", categorie: "mitsvot" },
    { terme: "Seoudat Mitsvah", hebreu: "סעודת מצווה", definition: "Repas accompagnant une mitsvah", categorie: "mitsvot" },

    // =============================================
    // M. CYCLE DE VIE ET DEUIL
    // =============================================
    { terme: "Houppa", hebreu: "חופה", definition: "Dais nuptial, cérémonie de mariage", categorie: "cycle" },
    { terme: "Ketouba", hebreu: "כתובה", definition: "Contrat de mariage juif", categorie: "cycle" },
    { terme: "Sheva Berakhot", hebreu: "שבע ברכות", definition: "Sept bénédictions du mariage", categorie: "cycle" },
    { terme: "Levaya", hebreu: "לוויה", definition: "Enterrement, accompagnement du défunt", categorie: "cycle" },
    { terme: "Shiva", hebreu: "שבעה", definition: "Sept jours de deuil", categorie: "cycle" },
    { terme: "Sheloshim", hebreu: "שלושים", definition: "Trente jours de deuil", categorie: "cycle" },
    { terme: "Yahrzeit", hebreu: "יארצייט", definition: "Anniversaire du décès", categorie: "cycle" },
    { terme: "Kadish Yatom", hebreu: "קדיש יתום", definition: "Kaddish des endeuillés", categorie: "cycle" },
    { terme: "Aliya LaTorah", hebreu: "עלייה לתורה", definition: "Montée à la Torah", categorie: "cycle" },

    // =============================================
    // N. LIEUX ET INSTITUTIONS
    // =============================================
    { terme: "Beit Knesset", hebreu: "בית כנסת", definition: "Synagogue", categorie: "lieux" },
    { terme: "Beit Midrash", hebreu: "בית מדרש", definition: "Maison d'étude", categorie: "lieux" },
    { terme: "Beit Din", hebreu: "בית דין", definition: "Tribunal rabbinique", categorie: "lieux" },
    { terme: "Yeshiva", hebreu: "ישיבה", definition: "École talmudique", categorie: "lieux" },
    { terme: "Kollel", hebreu: "כולל", definition: "Institut d'étude pour hommes mariés", categorie: "lieux" },
    { terme: "Beit HaMikdash", hebreu: "בית המקדש", definition: "Le Temple de Jérusalem", categorie: "lieux" },
    { terme: "Kotel", hebreu: "כותל", definition: "Mur occidental", categorie: "lieux" },
    { terme: "Eretz Israël", hebreu: "ארץ ישראל", definition: "Terre d'Israël", categorie: "lieux" },

    // =============================================
    // O. LE TEMPLE ET SES ÉLÉMENTS
    // =============================================
    { terme: "Kodesh HaKodashim", hebreu: "קודש הקודשים", definition: "Saint des Saints", categorie: "temple" },
    { terme: "Menorah", hebreu: "מנורה", definition: "Chandelier à 7 branches du Temple", categorie: "temple" },
    { terme: "Mizbe'ah", hebreu: "מזבח", definition: "Autel des sacrifices", categorie: "temple" },
    { terme: "Lekhem HaPanim", hebreu: "לחם הפנים", definition: "Pains de proposition", categorie: "temple" },
    { terme: "Ephod", hebreu: "אפוד", definition: "Vêtement du Grand Prêtre", categorie: "temple" },
    { terme: "Kohen", hebreu: "כהן", definition: "Prêtre, descendant d'Aaron", categorie: "temple" },
    { terme: "Kohen Gadol", hebreu: "כהן גדול", definition: "Grand Prêtre", categorie: "temple" },
    { terme: "Levi", hebreu: "לוי", definition: "Membre de la tribu de Lévi", categorie: "temple" },
    { terme: "Birkat Kohanim", hebreu: "ברכת כהנים", definition: "Bénédiction sacerdotale", categorie: "temple" },

    // =============================================
    // P. PERSONNAGES ET FIGURES
    // =============================================
    { terme: "Avraham Avinou", hebreu: "אברהם אבינו", definition: "Abraham notre père, premier patriarche", categorie: "personnages" },
    { terme: "Yitshak", hebreu: "יצחק", definition: "Isaac, deuxième patriarche", categorie: "personnages" },
    { terme: "Yaakov", hebreu: "יעקב", definition: "Jacob/Israël, troisième patriarche", categorie: "personnages" },
    { terme: "Moshe Rabbeinou", hebreu: "משה רבנו", definition: "Moïse notre maître", categorie: "personnages" },
    { terme: "David HaMelekh", hebreu: "דוד המלך", definition: "Le roi David", categorie: "personnages" },
    { terme: "Shlomo HaMelekh", hebreu: "שלמה המלך", definition: "Le roi Salomon", categorie: "personnages" },
    { terme: "Eliyahou HaNavi", hebreu: "אליהו הנביא", definition: "Le prophète Élie", categorie: "personnages" },
    { terme: "Hillel", hebreu: "הלל", definition: "Sage du Ier siècle, fondateur d'une école", categorie: "personnages" },
    { terme: "Shammaï", hebreu: "שמאי", definition: "Sage contemporain de Hillel", categorie: "personnages" },
    { terme: "Rav", hebreu: "רב", definition: "Rabbin, maître spirituel", categorie: "personnages" },
    { terme: "Tzaddik", hebreu: "צדיק", definition: "Juste, homme vertueux", categorie: "personnages" },
    { terme: "Talmid Hakham", hebreu: "תלמיד חכם", definition: "Érudit en Torah", categorie: "personnages" },
    { terme: "Ba'al Teshouva", hebreu: "בעל תשובה", definition: "Celui qui revient à la pratique", categorie: "personnages" },

    // =============================================
    // Q. INTERDITS ET AVERTISSEMENTS
    // =============================================
    { terme: "Lashon Hara", hebreu: "לשון הרע", definition: "Médisance, même si c'est vrai", categorie: "interdits" },
    { terme: "Rekhilout", hebreu: "רכילות", definition: "Colportage, ragots", categorie: "interdits" },
    { terme: "Lo Tignov", hebreu: "לא תגנוב", definition: "Tu ne voleras pas", categorie: "interdits" },
    { terme: "Bal Tash'hit", hebreu: "בל תשחית", definition: "Ne pas détruire/gaspiller", categorie: "interdits" },
    { terme: "Tsa'ar Ba'alei Hayim", hebreu: "צער בעלי חיים", definition: "Souffrance des animaux (interdite)", categorie: "interdits" },
    { terme: "Gaava", hebreu: "גאווה", definition: "Orgueil (défaut à éviter)", categorie: "interdits" },
    { terme: "Ka'as", hebreu: "כעס", definition: "Colère (à maîtriser)", categorie: "interdits" },
    { terme: "Sina'at Hinam", hebreu: "שנאת חינם", definition: "Haine gratuite", categorie: "interdits" },

    // =============================================
    // R. LOIS AGRICOLES ET SOCIALES
    // =============================================
    { terme: "Peah", hebreu: "פאה", definition: "Coin du champ laissé aux pauvres", categorie: "agricole" },
    { terme: "Leket", hebreu: "לקט", definition: "Glanes laissées aux pauvres", categorie: "agricole" },
    { terme: "Shikh'ha", hebreu: "שכחה", definition: "Gerbes oubliées laissées aux pauvres", categorie: "agricole" },
    { terme: "Maasser", hebreu: "מעשר", definition: "Dîme prélevée sur les récoltes", categorie: "agricole" },
    { terme: "Shemita", hebreu: "שמיטה", definition: "Année sabbatique (tous les 7 ans)", categorie: "agricole" },
    { terme: "Yovel", hebreu: "יובל", definition: "Jubilé (tous les 50 ans)", categorie: "agricole" },

    // =============================================
    // S. PÉRIODES HISTORIQUES
    // =============================================
    { terme: "Avot", hebreu: "אבות", definition: "Les Patriarches (Abraham, Isaac, Jacob)", categorie: "histoire" },
    { terme: "Yetsiat Mitsrayim", hebreu: "יציאת מצרים", definition: "Sortie d'Égypte", categorie: "histoire" },
    { terme: "Matan Torah", hebreu: "מתן תורה", definition: "Don de la Torah au Sinaï", categorie: "histoire" },
    { terme: "Galout", hebreu: "גלות", definition: "Exil, diaspora", categorie: "histoire" },
    { terme: "Aliya", hebreu: "עלייה", definition: "Immigration en Israël / Montée à la Torah", categorie: "histoire" },
    { terme: "Haskala", hebreu: "השכלה", definition: "Mouvement des Lumières juives (XVIIIe-XIXe s.)", categorie: "histoire" },

    // =============================================
    // T. EXPRESSIONS USUELLES
    // =============================================
    { terme: "Mazal Tov", hebreu: "מזל טוב", definition: "Félicitations ! Bonne chance !", categorie: "expressions" },
    { terme: "Refua Shelema", hebreu: "רפואה שלמה", definition: "Guérison complète (souhait aux malades)", categorie: "expressions" },
    { terme: "Beezrat Hashem", hebreu: "בעזרת ה׳", definition: "Avec l'aide de Dieu", categorie: "expressions" },
    { terme: "Im Yirtsé Hashem", hebreu: "אם ירצה ה׳", definition: "Si Dieu le veut", categorie: "expressions" },
    { terme: "Barukh Hashem", hebreu: "ברוך ה׳", definition: "Béni soit Dieu (Dieu merci)", categorie: "expressions" },
    { terme: "Am Israël", hebreu: "עם ישראל", definition: "Le peuple d'Israël", categorie: "expressions" },
    { terme: "Klal Israël", hebreu: "כלל ישראל", definition: "L'ensemble du peuple juif", categorie: "expressions" },
    { terme: "Guer / Guiyour", hebreu: "גר / גיור", definition: "Converti / Conversion au judaïsme", categorie: "expressions" },
    { terme: "Chinukh", hebreu: "חינוך", definition: "Éducation (des enfants)", categorie: "expressions" },
    { terme: "Parnassa", hebreu: "פרנסה", definition: "Subsistance, gagne-pain", categorie: "expressions" }
];

// Exposer les données globalement
window.GLOSSAIRE_DATA = GLOSSAIRE_DATA;
window.GLOSSAIRE_CATEGORIES = GLOSSAIRE_CATEGORIES;

