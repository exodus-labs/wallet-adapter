#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Your package information
const NEW_PACKAGE_PREFIX = 'nedy-wallet-adapter';
const NEW_AUTHOR = 'nedy <your.email@example.com>';
const NEW_REPOSITORY = 'https://github.com/nedy/wallet-adapter';
const NEW_LICENSE = 'MIT'; // or keep as 'Apache-2.0'

// Function to update package.json files
async function updatePackageInfo(dirPath) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item.name);
    
    if (item.isDirectory()) {
      await updatePackageInfo(itemPath);
    } else if (item.name === 'package.json') {
      try {
        const packageJson = JSON.parse(fs.readFileSync(itemPath, 'utf8'));
        
        // Update package information
        if (packageJson.name && packageJson.name.startsWith('@solana/wallet-adapter')) {
          // Convert from @solana/wallet-adapter-base to nedy-wallet-adapter-base
          const baseName = packageJson.name.replace('@solana/wallet-adapter', '');
          packageJson.name = `${NEW_PACKAGE_PREFIX}${baseName}`;
        }
        
        packageJson.author = NEW_AUTHOR;
        packageJson.repository = NEW_REPOSITORY;
        packageJson.license = NEW_LICENSE;
        
        // Write updated package.json
        fs.writeFileSync(itemPath, JSON.stringify(packageJson, null, 4));
        console.log(`Updated: ${itemPath}`);
      } catch (error) {
        console.error(`Error updating ${itemPath}:`, error);
      }
    }
  }
}

// Start from the root directory
updatePackageInfo(path.resolve(__dirname));
console.log('All package.json files have been updated.'); 