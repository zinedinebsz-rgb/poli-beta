# POLI Beta - Guide de Deploiement

## Prerequis

- Node.js 18+
- Un compte GitHub (gratuit)
- Un compte Vercel (gratuit) : https://vercel.com
- Un compte Supabase (gratuit) : https://supabase.com

---

## Etape 1 : Supabase (Base de donnees + Auth)

1. Va sur https://supabase.com et cree un nouveau projet
2. Note le **Project URL** et la **anon key** (Settings > API)
3. Va dans **SQL Editor** et colle le contenu de `supabase/schema.sql`
4. Execute le script
5. Va dans **Authentication > Providers** et active **Email** (deja actif par defaut)

## Etape 2 : Configuration locale

```bash
# Clone ou copie le projet
cp .env.example .env

# Edite .env avec tes clefs Supabase
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...

# Installe les dependances
npm install

# Lance en local
npm run dev
```

## Etape 3 : GitHub

```bash
# Initialise git
git init
git add .
git commit -m "POLI Beta v1.0"

# Cree un repo sur github.com puis :
git remote add origin https://github.com/TON_USER/poli-beta.git
git push -u origin main
```

## Etape 4 : Vercel (Deploiement)

1. Va sur https://vercel.com/new
2. Importe ton repo GitHub
3. Vercel detecte automatiquement Vite
4. Ajoute les **Environment Variables** :
   - `VITE_SUPABASE_URL` = ta Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = ta anon key
5. Clique **Deploy**
6. Ton app est live sur `https://poli-beta.vercel.app` !

## Etape 5 : Domaine personnalise (optionnel)

1. Dans Vercel > Settings > Domains
2. Ajoute ton domaine (ex: `app.poli.finance`)
3. Configure les DNS chez ton registrar

---

## Mode Demo (sans Supabase)

Si tu ne configures pas les variables Supabase, l'app demarre en mode demo sans authentification. Utile pour les tests et demos.

## Structure du projet

```
poli-beta/
  src/
    components/     # Sidebar, TopBar, CommandPalette, Onboarding, MiniChart
    pages/          # 12 pages + AuthPage
    data/           # constants.js, icons.jsx
    lib/            # supabase.js, AuthContext.jsx, AppContext.jsx
    hooks/          # (extensible)
  supabase/
    schema.sql      # Schema de la base de donnees
  vercel.json       # Config SPA routing
  .env.example      # Template des variables d'environnement
```

## Commandes

```bash
npm run dev      # Serveur de developpement
npm run build    # Build production
npm run preview  # Preview du build
```
