import {mkdir,readFile,writeFile,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url),out=new URL('dist/',root);
// Only static assets are published; never backups, tests or local tooling.
const files=['index.html','style.css','app.js','core.js','storage.js','catalog.json','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png','LICENSE-exercises.txt','FUENTES.md','INSTALAR-ANDROID.md'];
const hash=createHash('sha256');
for(const name of [...files,'sw.js'])hash.update(name).update(await readFile(new URL(name,root)));
const version=hash.digest('hex').slice(0,16);
await mkdir(out,{recursive:true});
for(const name of files)await copyFile(new URL(name,root),new URL(name,out));
await writeFile(new URL('sw.js',out),(await readFile(new URL('sw.js',root),'utf8')).replaceAll('__BUILD_ID__',version));
await writeFile(new URL('.nojekyll',out),'');
await writeFile(new URL('build.json',out),JSON.stringify({version,files:files.length}));
console.log(`PWA preparada en dist/ · versión ${version}`);
