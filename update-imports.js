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

// Extensions to process
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'];

// Function to update imports in source files
async function updateImports(dirPath) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item.name);
    
    if (item.isDirectory() && !itemPath.includes('node_modules') && !itemPath.includes('lib')) {
      // Skip node_modules and lib directories
      await updateImports(itemPath);
    } else if (item.isFile() && EXTENSIONS.includes(path.extname(item.name))) {
      try {
        const content = fs.readFileSync(itemPath, 'utf8');
        
        // Replace import statements
        // For example: import { WalletAdapter } from 'nedy-wallet-adapter-base';
        // To: import { WalletAdapter } from 'nedy-wallet-adapter-base';
        const importRegex = new RegExp(`['"](${OLD_PREFIX}-[^'"]+)['"]`, 'g');
        const updatedContent = content.replace(importRegex, (match, p1) => {
          const newPackageName = p1.replace(OLD_PREFIX, NEW_PREFIX);
          return `'${newPackageName}'`;
        });
        
        // Only write if modified
        if (content !== updatedContent) {
          fs.writeFileSync(itemPath, updatedContent);
          console.log(`Updated imports in: ${itemPath}`);
        }
      } catch (error) {
        console.error(`Error updating imports in ${itemPath}:`, error);
      }
    }
  }
}

// Start from the root directory
updateImports(path.resolve(__dirname));
console.log('All import statements have been updated.'); 