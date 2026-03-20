const fs = require('fs');
const html = fs.readFileSync('/home/igor/Área de trabalho/app sacoleira/vendas-app-supabase.html', 'utf8');
const ids = [...html.matchAll(/getElementById\(['"]([^'"]+)['"]\)/g)].map(m => m[1]);
const missing = new Set(ids.filter(id => !html.includes('id=\"'+id+'\"')));
console.log('Missing IDs:', Array.from(missing).join(', '));
