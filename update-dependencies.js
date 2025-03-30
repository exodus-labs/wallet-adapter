#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Package prefixes
const OLD_PREFIX = '@solana/wallet-adapter';
const NEW_PREFIX = 'nedy-wallet-adapter';

// Function to update dependencies in package.json files
async function updateDependencies(dirPath) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item.name);
    
    if (item.isDirectory()) {
      await updateDependencies(itemPath);
    } else if (item.name === 'package.json') {
      try {
        const packageJson = JSON.parse(fs.readFileSync(itemPath, 'utf8'));
        let modified = false;
        
        // Update dependencies
        ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies', 'overrides', 'resolutions'].forEach(depType => {
          if (packageJson[depType]) {
            Object.keys(packageJson[depType]).forEach(dep => {
              if (dep.startsWith(OLD_PREFIX)) {
                // Convert from @solana/wallet-adapter-base to nedy-wallet-adapter-base
                const baseName = dep.replace(OLD_PREFIX, '');
                const newDep = `${NEW_PREFIX}${baseName}`;
                packageJson[depType][newDep] = packageJson[depType][dep];
                delete packageJson[depType][dep];
                modified = true;
              }
            });
          }
        });
        
        // Only write if modified
        if (modified) {
          fs.writeFileSync(itemPath, JSON.stringify(packageJson, null, 4));
          console.log(`Updated dependencies in: ${itemPath}`);
        }
      } catch (error) {
        console.error(`Error updating dependencies in ${itemPath}:`, error);
      }
    }
  }
}

// Start from the root directory
updateDependencies(path.resolve(__dirname));
console.log('All package dependencies have been updated.'); 