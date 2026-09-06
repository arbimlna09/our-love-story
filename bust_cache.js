const fs = require('fs');
const files = ['index.html', 'memories.html', 'reasons.html', 'letter.html', 'cake.html', 'final.html'];
const timestamp = new Date().getTime();

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/script\.js(\?v=\d+)?/g, `script.js?v=${timestamp}`);
    fs.writeFileSync(file, content, 'utf8');
});
console.log('Cache busting applied to all files!');
