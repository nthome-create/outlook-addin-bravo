# Ailis — bouton Outlook « Bravo ! »

Complément Outlook minimal : un bouton dans le ruban, avec le logo Ailis, qui ouvre une pop-up affichant **Bravo !**.

Fonctionne sur Outlook classique (Windows), le nouvel Outlook et Outlook sur le web (même manifeste XML).

## Contenu

```
manifest.xml        # manifeste du complément (à sideloader dans Outlook)
set-url.ps1         # remplace le placeholder BASE_URL par ton URL GitHub Pages
docs/               # fichiers à publier en HTTPS (racine GitHub Pages)
  index.html        # page d'accueil (SupportUrl)
  commands.html     # FunctionFile chargé par Outlook
  commands.js       # ouvre la pop-up (Office Dialog API)
  dialog.html       # la pop-up « Bravo ! »
  assets/icon-*.png # logo Ailis en 16/32/48/64/80/128 px (généré depuis le favicon SVG)
  .nojekyll
```

## 1. Publier sur GitHub Pages

```powershell
cd D:\ClaudeProjects\ailis\outlook-addin-bravo
git init
git add .
git commit -m "Complement Outlook Ailis"
gh repo create ailis-outlook-bravo --public --source=. --push
```

Puis dans le repo : **Settings → Pages → Source: Deploy from a branch → Branch: `main`, dossier `/docs`**.

Vérifie que `https://<user>.github.io/ailis-outlook-bravo/assets/icon-80.png` s'affiche avant de continuer.

## 2. Renseigner l'URL dans le manifeste

```powershell
.\set-url.ps1 -User <ton-user-github>
```

(Ou remplace manuellement les 8 occurrences de `BASE_URL` dans `manifest.xml`.)

## 3. Installer le complément

**Outlook sur le web / nouvel Outlook** — le plus simple :
Ruban **Accueil → Compléments → Obtenir des compléments → Mes compléments → Ajouter un complément personnalisé → Ajouter à partir d'un fichier** → choisir `manifest.xml`.

**Outlook classique (Win32)** : même chemin, ou `Fichier → Gérer les compléments` (ouvre l'interface web). Redémarrer Outlook.

> Sideloader un manifeste depuis un fichier peut être désactivé par l'administrateur Microsoft 365. Sur un compte pro (URW), c'est le point de blocage le plus probable — le compte perso Microsoft ou un tenant de test fonctionne sans restriction.

## 4. Utiliser

Ouvrir ou rédiger un message → bouton **Ailis** dans le ruban → pop-up « Bravo ! ».

## Notes techniques

- `Permissions: ReadItem` — le minimum requis pour un bouton de ruban.
- La pop-up utilise `Office.context.ui.displayDialogAsync`. Si l'hôte la refuse, `commands.js` retombe sur une notification bandeau.
- Toute modification des fichiers `docs/` est prise en compte au rechargement (vider le cache Outlook si besoin : `%LOCALAPPDATA%\Microsoft\Office\16.0\Wef\`).
- Changer les URL du manifeste après installation impose de désinstaller/réinstaller le complément.
