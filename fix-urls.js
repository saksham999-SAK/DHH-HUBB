import fs from 'fs';
const files = fs.readdirSync('./src/styles').filter(f => f.endsWith('.css'));
files.forEach(f => {
  const path = './src/styles/' + f;
  let code = fs.readFileSync(path, 'utf8');
  code = code.replace(/url\(\s*'\.\//g, "url('/");
  code = code.replace(/url\(\s*"\.\//g, 'url("/');
  code = code.replace(/url\(\s*\.\//g, 'url(/');
  fs.writeFileSync(path, code);
});
console.log('Done fixing URLs');
