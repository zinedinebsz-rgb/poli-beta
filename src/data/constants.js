// POLI Data Constants

export const PATRIMOINE = {
  brut: 847250,
  net: 782150,
  financier: 621890,
  perf: 12.5,
  perfMois: 2.1,
  scoreEthique: 78,
  fraisAnnuels: 2145
};

export const genChart = (points = 12) => {
  const base = 100;
  const volatility = 8;
  let val = base;
  return Array.from({ length: points }).map((_, i) => {
    val += (Math.random() - 0.5) * volatility;
    return Math.max(80, Math.min(120, val));
  });
};

export const ALLOC = [
  { label: 'Actions', value: 45, color: '#34d399', icon: 'trending-up' },
  { label: 'Obligations', value: 25, color: '#d4a574', icon: 'bond' },
  { label: 'Immobilier', value: 15, color: '#8b5cf6', icon: 'building' },
  { label: 'Crypto', value: 8, color: '#f59e0b', icon: 'zap' },
  { label: 'Cash', value: 5, color: '#6b7280', icon: 'wallet' },
  { label: 'Métaux', value: 1.5, color: '#fbbf24', icon: 'gem' },
  { label: 'Autres', value: 0.5, color: '#64748b', icon: 'ellipsis' }
];

export const FEES = [
  { name: 'Frais de gestion', value: 0.65, freq: 'annuel', color: '#ef4444' },
  { name: 'Frais de performance', value: 0.0, freq: 'si outperformance', color: '#f97316' },
  { name: 'Frais administratifs', value: 0.25, freq: 'annuel', color: '#eab308' },
  { name: 'Frais de transaction', value: 0.12, freq: 'par transaction', color: '#84cc16' }
];

export const TX = [
  { id: 1, date: '2026-03-15', type: 'achat', asset: 'IWDA', qty: 125, price: 245.50, total: 30687.50, status: 'complété' },
  { id: 2, date: '2026-03-12', type: 'vente', asset: 'VWCE', qty: 50, price: 312.00, total: 15600.00, status: 'complété' },
  { id: 3, date: '2026-03-10', type: 'dividende', asset: 'NOVO', qty: 0, price: 0, total: 450.25, status: 'reçu' },
  { id: 4, date: '2026-03-08', type: 'achat', asset: 'MSFT', qty: 30, price: 425.75, total: 12772.50, status: 'complété' },
  { id: 5, date: '2026-03-05', type: 'conversion', asset: 'ETH', qty: 2.5, price: 2850.00, total: 7125.00, status: 'complété' }
];

export const ETHIC_PROFILES = [
  { id: 'esg', name: 'ESG Standard', category: 'standard', description: 'Investissement ESG classique', icon: 'leaf' },
  { id: 'divest', name: 'Divest Standard', category: 'standard', description: 'Exclusion des énergies fossiles', icon: 'zap' },
  { id: 'halal', name: 'Halal', category: 'religion', description: 'Conforme à la charia', icon: 'mosque' },
  { id: 'catholique', name: 'Catholique', category: 'religion', description: 'Valeurs catholiques', icon: 'cross' },
  { id: 'protestant', name: 'Protestant', category: 'religion', description: 'Valeurs protestantes', icon: 'cross' },
  { id: 'bouddhiste', name: 'Bouddhiste', category: 'religion', description: 'Philosophie bouddhiste', icon: 'om' },
  { id: 'hindu', name: 'Hindu', category: 'religion', description: 'Valeurs hindoues', icon: 'om' },
  { id: 'juif', name: 'Juif', category: 'religion', description: 'Valeurs juives', icon: 'star' },
  { id: 'sikh', name: 'Sikh', category: 'religion', description: 'Valeurs sikhs', icon: 'star' },
  { id: 'animiste', name: 'Animiste', category: 'religion', description: 'Philosophie animiste', icon: 'leaf' },
  { id: 'taoiste', name: 'Taoïste', category: 'religion', description: 'Philosophie taoïste', icon: 'yin-yang' },
  { id: 'quaker', name: 'Quaker', category: 'religion', description: 'Valeurs quaker', icon: 'peace' },
  { id: 'rastafarien', name: 'Rastafari', category: 'religion', description: 'Valeurs rastafari', icon: 'leaf' },
  { id: 'vegan', name: 'Végan', category: 'valeurs', description: 'Éthique végan complète', icon: 'leaf' },
  { id: 'climat', name: 'Climat', category: 'valeurs', description: 'Action climatique prioritaire', icon: 'globe' },
  { id: 'social', name: 'Social', category: 'valeurs', description: 'Impact social positif', icon: 'users' },
  { id: 'feminist', name: 'Féministe', category: 'valeurs', description: 'Égalité des genres', icon: 'equality' },
  { id: 'pacifiste', name: 'Pacifiste', category: 'valeurs', description: 'Exclusion militaire', icon: 'peace' },
  { id: 'biodiversite', name: 'Biodiversité', category: 'valeurs', description: 'Protection de la biodiversité', icon: 'leaf' },
  { id: 'droitsAnimaux', name: 'Droits Animaux', category: 'autre', description: 'Protection des animaux', icon: 'leaf' },
  { id: 'antiCorruption', name: 'Anti-Corruption', category: 'autre', description: 'Gouvernance éthique', icon: 'shield' },
  { id: 'techEthique', name: 'Tech Éthique', category: 'autre', description: 'Technologie responsable', icon: 'cpu' }
];

export const ASSETS = [
  {
    id: 'IWDA',
    name: 'iShares MSCI World',
    ticker: 'IWDA',
    price: 245.50,
    change: 2.5,
    qty: 125,
    allocation: 18,
    scores: {
      esg: 85, halal: 42, catholique: 65, protestant: 68, bouddhiste: 72, hindu: 70, juif: 75, sikh: 68,
      animiste: 60, taoiste: 62, quaker: 78, rastafarien: 55, vegan: 45, climat: 82, social: 88, feminist: 80,
      pacifiste: 70, biodiversite: 80, droitsAnimaux: 75, antiCorruption: 85, techEthique: 72, divest: 77
    }
  },
  {
    id: 'VWCE',
    name: 'Vanguard FTSE',
    ticker: 'VWCE',
    price: 312.00,
    change: 1.8,
    qty: 85,
    allocation: 15,
    scores: {
      esg: 82, halal: 38, catholique: 62, protestant: 65, bouddhiste: 70, hindu: 68, juif: 72, sikh: 65,
      animiste: 58, taoiste: 60, quaker: 75, rastafarien: 52, vegan: 40, climat: 80, social: 85, feminist: 78,
      pacifiste: 68, biodiversite: 78, droitsAnimaux: 72, antiCorruption: 82, techEthique: 70, divest: 75
    }
  },
  {
    id: 'SUSW',
    name: 'iShares MSCI ACWI',
    ticker: 'SUSW',
    price: 158.75,
    change: 3.2,
    qty: 200,
    allocation: 12,
    scores: {
      esg: 80, halal: 40, catholique: 64, protestant: 67, bouddhiste: 71, hindu: 69, juif: 73, sikh: 67,
      animiste: 61, taoiste: 63, quaker: 76, rastafarien: 54, vegan: 43, climat: 81, social: 87, feminist: 79,
      pacifiste: 69, biodiversite: 79, droitsAnimaux: 74, antiCorruption: 84, techEthique: 71, divest: 76
    }
  },
  {
    id: 'MSFT',
    name: 'Microsoft',
    ticker: 'MSFT',
    price: 425.75,
    change: 4.1,
    qty: 30,
    allocation: 9,
    scores: {
      esg: 78, halal: 65, catholique: 72, protestant: 74, bouddhiste: 68, hindu: 66, juif: 70, sikh: 64,
      animiste: 55, taoiste: 58, quaker: 73, rastafarien: 50, vegan: 50, climat: 75, social: 80, feminist: 82,
      pacifiste: 72, biodiversite: 70, droitsAnimaux: 68, antiCorruption: 88, techEthique: 85, divest: 78
    }
  },
  {
    id: 'AAPL',
    name: 'Apple',
    ticker: 'AAPL',
    price: 185.30,
    change: 2.9,
    qty: 50,
    allocation: 6,
    scores: {
      esg: 76, halal: 63, catholique: 70, protestant: 72, bouddhiste: 66, hindu: 64, juif: 68, sikh: 62,
      animiste: 53, taoiste: 56, quaker: 71, rastafarien: 48, vegan: 48, climat: 73, social: 78, feminist: 80,
      pacifiste: 70, biodiversite: 68, droitsAnimaux: 66, antiCorruption: 86, techEthique: 83, divest: 76
    }
  },
  {
    id: 'NOVO',
    name: 'Novo Nordisk',
    ticker: 'NOVO',
    price: 98.45,
    change: 1.2,
    qty: 150,
    allocation: 8,
    scores: {
      esg: 88, halal: 45, catholique: 68, protestant: 71, bouddhiste: 75, hindu: 73, juif: 76, sikh: 70,
      animiste: 65, taoiste: 67, quaker: 80, rastafarien: 58, vegan: 55, climat: 85, social: 90, feminist: 85,
      pacifiste: 75, biodiversite: 82, droitsAnimaux: 80, antiCorruption: 87, techEthique: 68, divest: 80
    }
  },
  {
    id: 'BTC',
    name: 'Bitcoin',
    ticker: 'BTC',
    price: 68500.00,
    change: -2.3,
    qty: 0.25,
    allocation: 12,
    scores: {
      esg: 35, halal: 20, catholique: 30, protestant: 32, bouddhiste: 40, hindu: 38, juif: 35, sikh: 33,
      animiste: 25, taoiste: 28, quaker: 25, rastafarien: 30, vegan: 25, climat: 25, social: 35, feminist: 40,
      pacifiste: 45, biodiversite: 30, droitsAnimaux: 35, antiCorruption: 50, techEthique: 60, divest: 38
    }
  },
  {
    id: 'ETH',
    name: 'Ethereum',
    ticker: 'ETH',
    price: 2850.00,
    change: 0.5,
    qty: 1.2,
    allocation: 10,
    scores: {
      esg: 40, halal: 25, catholique: 35, protestant: 37, bouddhiste: 45, hindu: 43, juif: 40, sikh: 38,
      animiste: 30, taoiste: 33, quaker: 30, rastafarien: 35, vegan: 30, climat: 30, social: 40, feminist: 45,
      pacifiste: 50, biodiversite: 35, droitsAnimaux: 40, antiCorruption: 55, techEthique: 65, divest: 43
    }
  },
  {
    id: 'CORUM',
    name: 'Corum Asset Management',
    ticker: 'CORUM',
    price: 156.20,
    change: 3.7,
    qty: 75,
    allocation: 7,
    scores: {
      esg: 81, halal: 50, catholique: 70, protestant: 73, bouddhiste: 74, hindu: 72, juif: 75, sikh: 69,
      animiste: 63, taoiste: 65, quaker: 78, rastafarien: 56, vegan: 52, climat: 83, social: 86, feminist: 81,
      pacifiste: 73, biodiversite: 81, droitsAnimaux: 77, antiCorruption: 86, techEthique: 74, divest: 78
    }
  },
  {
    id: 'TSLA',
    name: 'Tesla',
    ticker: 'TSLA',
    price: 242.80,
    change: 5.2,
    qty: 20,
    allocation: 4,
    scores: {
      esg: 65, halal: 60, catholique: 68, protestant: 70, bouddhiste: 64, hindu: 62, juif: 66, sikh: 60,
      animiste: 50, taoiste: 53, quaker: 68, rastafarien: 45, vegan: 60, climat: 88, social: 75, feminist: 78,
      pacifiste: 65, biodiversite: 72, droitsAnimaux: 70, antiCorruption: 82, techEthique: 80, divest: 72
    }
  },
  {
    id: 'OR',
    name: 'Gold Bullion',
    ticker: 'OR',
    price: 2145.30,
    change: -1.1,
    qty: 5,
    allocation: 5,
    scores: {
      esg: 42, halal: 85, catholique: 55, protestant: 57, bouddhiste: 65, hindu: 63, juif: 60, sikh: 58,
      animiste: 72, taoiste: 68, quaker: 50, rastafarien: 62, vegan: 70, climat: 40, social: 50, feminist: 55,
      pacifiste: 72, biodiversite: 48, droitsAnimaux: 55, antiCorruption: 60, techEthique: 35, divest: 56
    }
  }
];

export const NAV = [
  { id: 'dashboard', label: 'Tableau de bord', icon: 'chart-square', section: 'main' },
  { id: 'invest', label: 'Investir', icon: 'trending-up', section: 'main' },
  { id: 'bank', label: 'Banque', icon: 'wallet', section: 'main' },
  { id: 'budget', label: 'Budget', icon: 'calculator', section: 'main' },
  { id: 'simulator', label: 'Simulateur', icon: 'zap', section: 'tools' },
  { id: 'dividends', label: 'Dividendes', icon: 'coins', section: 'tools' },
  { id: 'diversification', label: 'Diversification', icon: 'pie-chart', section: 'tools' },
  { id: 'goals', label: 'Objectifs', icon: 'target', section: 'tools' },
  { id: 'reports', label: 'Rapports', icon: 'document', section: 'account' },
  { id: 'pro', label: 'POLI Pro', icon: 'star', section: 'account' },
  { id: 'managers', label: 'Gestionnaires', icon: 'users', section: 'account' },
  { id: 'settings', label: 'Paramètres', icon: 'cog', section: 'account' }
];

export const NOTIFS = [
  { id: 1, type: 'alert', title: 'Allocation déséquilibrée', message: 'Votre allocation dévie de 5% de la cible', time: '10 min', read: false },
  { id: 2, type: 'success', title: 'Dividende reçu', message: 'Dividende NOVO reçu : 450.25€', time: '2 h', read: false },
  { id: 3, type: 'info', title: 'Nouveau profil ESG', message: 'Un nouveau profil Tech Éthique est disponible', time: '1 jour', read: true },
  { id: 4, type: 'warning', title: 'Frais élevés détectés', message: 'Vos frais dépassent la moyenne de 0.15%', time: '3 jours', read: true }
];

export const BANKS = [
  {n:"Boursorama",e:"🏦"},{n:"BNP Paribas",e:"🏛"},{n:"Société Générale",e:"🔴"},{n:"Crédit Agricole",e:"🟢"},
  {n:"LCL",e:"🔵"},{n:"CIC",e:"🟡"},{n:"Fortuneo",e:"⭐"},{n:"Hello Bank",e:"👋"},
  {n:"N26",e:"🌐"},{n:"Revolut",e:"💳"},{n:"Degiro",e:"📊"},{n:"Trade Republic",e:"📈"}
];

export const BUDGET_CATS = [
  {id:"logement",name:"Logement",budget:1200,spent:1180,color:"#34d399",icon:"🏠"},
  {id:"alimentation",name:"Alimentation",budget:600,spent:520,color:"#6ee7b7",icon:"🍽"},
  {id:"transport",name:"Transport",budget:300,spent:285,color:"#d4a574",icon:"🚗"},
  {id:"loisirs",name:"Loisirs",budget:400,spent:380,color:"#8b5cf6",icon:"🎭"},
  {id:"sante",name:"Santé",budget:200,spent:150,color:"#f87171",icon:"🏥"},
  {id:"epargne",name:"Épargne",budget:800,spent:800,color:"#fbbf24",icon:"💰"},
  {id:"abonnements",name:"Abonnements",budget:150,spent:142,color:"#60a5fa",icon:"📱"},
  {id:"divers",name:"Divers",budget:250,spent:180,color:"#a1a1aa",icon:"📦"},
];

export const CASHFLOW = [
  {m:"Oct",income:4800,expenses:3200},{m:"Nov",income:5100,expenses:3500},{m:"Dec",income:5400,expenses:4200},
  {m:"Jan",income:4900,expenses:3100},{m:"Fév",income:5200,expenses:3400},{m:"Mar",income:5300,expenses:3637},
];

export const SCENARIOS = {
  conservative:{label:"Prudent",ret:0.04,color:"#60a5fa",desc:"Obligations, fonds euros"},
  moderate:{label:"Équilibré",ret:0.07,color:"#34d399",desc:"Mix actions/obligations"},
  aggressive:{label:"Dynamique",ret:0.10,color:"#f59e0b",desc:"Actions, crypto, PE"},
};

export const DIV_HOLDINGS = [
  {ticker:"MSFT",name:"Microsoft",shares:30,divPerShare:3.0,freq:"Trimestriel",nextDate:"2026-06-15",yld:2.8,sector:"Tech"},
  {ticker:"AAPL",name:"Apple",shares:50,divPerShare:0.96,freq:"Trimestriel",nextDate:"2026-05-12",yld:0.5,sector:"Tech"},
  {ticker:"NOVO",name:"Novo Nordisk",shares:150,divPerShare:1.2,freq:"Annuel",nextDate:"2026-03-28",yld:1.2,sector:"Santé"},
  {ticker:"CORUM",name:"Corum Origin",shares:75,divPerShare:5.5,freq:"Mensuel",nextDate:"2026-04-01",yld:6.2,sector:"SCPI"},
  {ticker:"TTE",name:"TotalEnergies",shares:100,divPerShare:3.5,freq:"Trimestriel",nextDate:"2026-04-20",yld:5.1,sector:"Énergie"},
  {ticker:"AIR",name:"Airbus",shares:40,divPerShare:1.8,freq:"Annuel",nextDate:"2026-04-15",yld:1.1,sector:"Industrie"},
  {ticker:"SAN",name:"Sanofi",shares:60,divPerShare:3.56,freq:"Annuel",nextDate:"2026-05-06",yld:3.8,sector:"Santé"},
  {ticker:"VWCE",name:"Vanguard FTSE",shares:85,divPerShare:0,freq:"Capitalisant",nextDate:"-",yld:0,sector:"ETF"},
];

export const GEO = [
  {region:"Europe",pct:45,color:"#34d399",flag:"🇪🇺"},
  {region:"Amérique du Nord",pct:30,color:"#60a5fa",flag:"🇺🇸"},
  {region:"Asie-Pacifique",pct:12,color:"#d4a574",flag:"🇯🇵"},
  {region:"Émergents",pct:8,color:"#f59e0b",flag:"🌍"},
  {region:"Moyen-Orient",pct:3,color:"#8b5cf6",flag:"🇦🇪"},
  {region:"Autre",pct:2,color:"#6b7280",flag:"🌐"},
];

export const SECTORS = [
  {sector:"Technologie",pct:28,color:"#34d399",over:true},
  {sector:"Santé",pct:15,color:"#60a5fa",over:false},
  {sector:"Finance",pct:14,color:"#d4a574",over:false},
  {sector:"Industrie",pct:12,color:"#f59e0b",over:false},
  {sector:"Énergie",pct:10,color:"#8b5cf6",over:true},
  {sector:"Immobilier",pct:8,color:"#fbbf24",over:false},
  {sector:"Conso",pct:7,color:"#f87171",over:false},
  {sector:"Matériaux",pct:4,color:"#a1a1aa",over:false},
  {sector:"Télécom",pct:2,color:"#6b7280",over:false},
];

export const GOAL_TEMPLATES = [
  {id:"urgence",icon:"🛡",title:"Fonds d'urgence",desc:"3-6 mois de dépenses",target:15000,months:12,color:"emerald"},
  {id:"immo",icon:"🏠",title:"Apport immobilier",desc:"10-20% du prix du bien",target:50000,months:36,color:"blue"},
  {id:"retraite",icon:"🌴",title:"Complément retraite",desc:"Objectif long terme",target:200000,months:240,color:"amber"},
];

export const REPORT_TYPES = [
  {id:"patrimonial",title:"Bilan Patrimonial",icon:"📋",color:"#34d399"},
  {id:"esg",title:"Rapport ESG",icon:"🌱",color:"#6ee7b7"},
  {id:"performance",title:"Performance",icon:"📈",color:"#60a5fa"},
  {id:"fiscal",title:"Fiscal",icon:"🏛",color:"#d4a574"},
];

export const PROP_FIRMS = [
  {name:"Topstep",status:"active",type:"Futures",funded:true},
  {name:"Apex Trader",status:"active",type:"Futures",funded:true},
  {name:"FTMO",status:"pending",type:"Forex/CFD",funded:false},
  {name:"MyForexFunds",status:"inactive",type:"Forex",funded:false},
  {name:"The Trading Pit",status:"active",type:"Multi",funded:true},
];

export const COMMANDS = NAV.map(n=>({id:n.id,label:n.label,desc:"Naviguer vers "+n.label,cat:"Navigation",icon:n.icon}));

export const OB_STEPS = [
  {id:"welcome",title:"Bienvenue sur POLI",sub:"Votre patrimoine, vos valeurs",desc:"POLI est la première plateforme qui aligne votre patrimoine avec vos convictions éthiques.",feats:["22 profils éthiques (ESG, Halal, Catholique, Végan…)","Scoring multi-dimensionnel de chaque actif","Rapports de conformité et performance","Simulateur et outils avancés"],cta:"Commencer",hero:true},
  {id:"profile",title:"Choisissez votre profil",sub:"22 profils disponibles",desc:"Chaque actif sera noté selon les critères de votre profil éthique.",feats:["ESG Classique — standards internationaux","Halal / Shariah — conforme AAOIFI","Catholique, Bouddhiste, Hindou…","Végan, Climat, Féministe, Social…"],cta:"Suivant"},
  {id:"connect",title:"Connectez vos comptes",sub:"Synchronisation sécurisée",desc:"Reliez vos comptes bancaires pour une vue unifiée.",feats:["DSP2 sécurisé et chiffré","Compatible 300+ banques","Synchronisation automatique"],cta:"Suivant",skip:"Plus tard"},
  {id:"done",title:"Vous êtes prêt !",sub:"Votre tableau de bord vous attend",desc:"Explorez votre patrimoine et investissez selon vos valeurs.",feats:["Dashboard complet avec KPIs","Score éthique en temps réel","Suggestions personnalisées","Simulateur patrimoine & FIRE"],cta:"Accéder au dashboard"},
];
