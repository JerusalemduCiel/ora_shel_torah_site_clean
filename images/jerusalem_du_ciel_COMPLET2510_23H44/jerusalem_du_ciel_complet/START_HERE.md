# 🚀 JÉRUSALEM DU CIEL - GUIDE DE DÉMARRAGE

## 🎯 POUR CURSOR AI

Ce package contient **TOUT** ce dont Cursor a besoin pour développer la plateforme "Jérusalem du Ciel".

---

## 📦 CONTENU DU PACKAGE

### 1️⃣ Données (dossier `data/`)
9 fichiers JSON avec **3,051 éléments** :
- Questions de halakha, histoire, fêtes, éthique
- Concepts hébreux
- Énigmes et débats talmudiques

### 2️⃣ Documentation (dossier `docs/`)
- État complet du projet
- Statistiques d'extraction
- Guides de reprise

---

## 🏗️ ARCHITECTURE RECOMMANDÉE

### Stack technique suggérée
```
Frontend: React + TypeScript + Tailwind CSS
Backend: Node.js + Express (ou Next.js)
Base de données: PostgreSQL ou MongoDB
IA conversationnelle: Anthropic Claude API
Déploiement: Vercel ou Netlify
```

### Structure de l'application
```
src/
├── components/          # 43 composants React à créer
│   ├── CategoryGrid.tsx
│   ├── QuestionCard.tsx
│   ├── NosMaitres.tsx
│   └── ...
├── data/               # Importer les 9 JSON ici
├── pages/              # 5 écrans principaux
│   ├── Home.tsx
│   ├── Categories.tsx
│   ├── Question.tsx
│   ├── NosMaitres.tsx
│   └── Profile.tsx
├── services/           # API et logique métier
└── styles/            # Design system
```

---

## 🎨 DESIGN SYSTEM

### 9 Palettes de couleurs (par catégorie)
Voir DESIGN_SYSTEM.md dans project_knowledge

### Typographie
- Titres : Heebo (Google Fonts)
- Corps : Open Sans
- Hébreu : Frank Ruhl Libre

---

## 🤖 IA CONVERSATIONNELLE

### Garde-fous obligatoires
- Approche orthodoxe séfarade stricte
- Sources : Torah, Rambam, Shoulhan Aroukh
- Poskim : Rabbi Ovadia Yossef, Rabbi Mordekhai Eliyahou

### À implémenter
- Prompts système (voir AI_CONFIGURATION.md - à créer)
- Validation halakhique des réponses
- Modes de difficulté adaptatifs

---

## 🚀 DÉMARRAGE RAPIDE

### Étape 1 : Initialiser le projet
```bash
npx create-next-app jerusalem-du-ciel --typescript
cd jerusalem-du-ciel
```

### Étape 2 : Installer les dépendances
```bash
npm install tailwindcss @anthropic-ai/sdk
```

### Étape 3 : Importer les données
```bash
mkdir src/data
cp data/*.json src/data/
```

### Étape 4 : Créer les composants de base
Suivre COMPONENTS.md (43 composants spécifiés)

---

## 📋 CHECKLIST DE DÉVELOPPEMENT

### Phase 1 : MVP (4-6 semaines)
- [ ] Structure de base (Next.js + Tailwind)
- [ ] Écran catégories (grille 3x3)
- [ ] Système de questions/réponses
- [ ] Import des 9 catégories de données
- [ ] Design system de base

### Phase 2 : Fonctionnalités avancées (4-6 semaines)
- [ ] IA conversationnelle (Claude API)
- [ ] Système de favoris
- [ ] Profil utilisateur
- [ ] Mode audio (Text-to-Speech)
- [ ] Animations

### Phase 3 : Contenu complet (2-4 semaines)
- [ ] Section "Nos Maîtres" (110 biographies)
- [ ] Parcours thématiques guidés
- [ ] Glossaire intégré
- [ ] Liens croisés entre contenus

---

## ⚠️ POINTS CRITIQUES

### 1. Conformité halakhique
- Valider toutes les réponses de l'IA
- Ne jamais contredire les sources orthodoxes
- Inclure les certificats de conformité

### 2. Expérience utilisateur
- Interface intuitive pour tous âges
- Mode sombre/clair
- Compatible Shabbat (pas d'écriture requise)

### 3. Performance
- Chargement rapide des 3,000+ éléments
- Recherche instantanée
- Cache intelligent

---

## 📞 SUPPORT

Pour questions ou assistance :
1. Consulter CHECKPOINT_COMPLET_25OCT.md
2. Vérifier les fichiers sources dans /mnt/project/
3. Relire les certificats de conformité halakhique

---

## ✅ GARANTIE DE QUALITÉ

✅ 3,051 éléments validés  
✅ Sources rabbiniques authentiques  
✅ Conformité orthodoxe séfarade  
✅ Prêt pour développement immédiat

---

**Bon développement ! 🚀**
