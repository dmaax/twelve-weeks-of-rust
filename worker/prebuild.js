// worker/prebuild.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Corrigindo __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Lê os arquivos
const indexHtmlPath = path.resolve(__dirname, '../static/index.html');
const planMdPath = path.resolve(__dirname, '../docs/PLAN.md');

const indexHtmlContent = fs.existsSync(indexHtmlPath)
  ? fs.readFileSync(indexHtmlPath, 'utf-8')
  : '';

const planMdContent = fs.existsSync(planMdPath)
  ? fs.readFileSync(planMdPath, 'utf-8')
  : '';

const targetFile = path.resolve(__dirname, './assets.js');

const fileContent = `
export const indexHtml = ${JSON.stringify(indexHtmlContent)};
export const planMd = ${JSON.stringify(planMdContent)};
`;

fs.writeFileSync(targetFile, fileContent.trim());

console.log(`✅ Arquivo gerado: ${targetFile}`);
