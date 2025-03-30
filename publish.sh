#!/bin/bash

# Exit on error
set -e

# echo "=== nedy-wallet-adapter Publishing Script ==="
# echo

# # 1. Update package information
# echo "Step 1: Updating package information..."
# node update-package-info.js
# echo

# # 2. Update dependencies
# echo "Step 2: Updating dependencies..."
# node update-dependencies.js
# echo

# # 3. Update import statements in source code
# echo "Step 3: Updating import statements in source code..."
# node update-imports.js
# echo

# # 4. Clean and build packages
# echo "Step 4: Cleaning and building packages..."
# pnpm run clean
# pnpm run build
# echo

# # 5. Login to npm (if not already logged in)
# echo "Step 5: Logging in to npm..."
# echo "If you're already logged in, you can skip this step."
# read -p "Do you want to login to npm? (y/n): " login_choice
# if [ "$login_choice" = "y" ] || [ "$login_choice" = "Y" ]; then
#   npm login
# fi
# echo

# 6. Publish packages in the correct order
echo "Step 6: Publishing packages..."
echo "Publishing core packages first..."

# Core packages
for pkg in packages/core/*; do
  if [ -f "$pkg/package.json" ]; then
    echo "Publishing $pkg..."
    (cd "$pkg" && npm publish --access public)
    echo "Waiting 5 seconds before next package..."
    sleep 5
  fi
done

# UI packages
echo "Publishing UI packages..."
for pkg in packages/ui/*; do
  if [ -f "$pkg/package.json" ]; then
    echo "Publishing $pkg..."
    (cd "$pkg" && npm publish --access public)
    echo "Waiting 5 seconds before next package..."
    sleep 5
  fi
done

# Wallet packages
echo "Publishing wallet packages..."
for pkg in packages/wallets/*; do
  if [ -f "$pkg/package.json" ]; then
    echo "Publishing $pkg..."
    (cd "$pkg" && npm publish --access public)
    echo "Waiting 5 seconds before next package..."
    sleep 5
  fi
done

# Starter packages
echo "Publishing starter packages..."
for pkg in packages/starter/*; do
  if [ -f "$pkg/package.json" ]; then
    echo "Publishing $pkg..."
    (cd "$pkg" && npm publish --access public)
    echo "Waiting 5 seconds before next package..."
    sleep 5
  fi
done

echo
echo "All packages have been published successfully!"
echo "Your packages are now available on npm as 'nedy-wallet-adapter-*'." 