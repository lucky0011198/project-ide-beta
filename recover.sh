#!/bin/bash

# Recover root files
git show 8b3ab4daba4f017192fe1bfd803f24004e325041:.gitignore > .gitignore
git show 8b3ab4daba4f017192fe1bfd803f24004e325041:README.md > README.md
git show 8b3ab4daba4f017192fe1bfd803f24004e325041:components.json > components.json
git show 8b3ab4daba4f017192fe1bfd803f24004e325041:eslint.config.js > eslint.config.js
git show 8b3ab4daba4f017192fe1bfd803f24004e325041:index.html > index.html
git show 8b3ab4daba4f017192fe1bfd803f24004e325041:package-lock.json > package-lock.json
git show 8b3ab4daba4f017192fe1bfd803f24004e325041:package.json > package.json
git show 8b3ab4daba4f017192fe1bfd803f24004e325041:postcss.config.js > postcss.config.js
git show 8b3ab4daba4f017192fe1bfd803f24004e325041:tailwind.config.js > tailwind.config.js
git show 8b3ab4daba4f017192fe1bfd803f24004e325041:tsconfig.app.json > tsconfig.app.json
git show 8b3ab4daba4f017192fe1bfd803f24004e325041:tsconfig.json > tsconfig.json
git show 8b3ab4daba4f017192fe1bfd803f24004e325041:tsconfig.node.json > tsconfig.node.json
git show 8b3ab4daba4f017192fe1bfd803f24004e325041:vite.config.ts > vite.config.ts

# Recover public directory
mkdir -p public
git ls-tree 8b3ab4daba4f017192fe1bfd803f24004e325041:public | while read mode type hash name; do
    git show $hash > "public/$name"
done

# Recover src directory
mkdir -p src
git ls-tree 8b3ab4daba4f017192fe1bfd803f24004e325041:src | while read mode type hash name; do
    if [ "$type" == "tree" ]; then
        mkdir -p "src/$name"
        git ls-tree $hash | while read submode subtype subhash subname; do
            if [ "$subtype" == "tree" ]; then
                mkdir -p "src/$name/$subname"
                git ls-tree $subhash | while read subsubmode subsubtype subsubhash subsubname; do
                    git show $subsubhash > "src/$name/$subname/$subsubname"
                done
            else
                git show $subhash > "src/$name/$subname"
            fi
        done
    else
        git show $hash > "src/$name"
    fi
done

# Update .gitignore
cat > .gitignore << EOL
# Dependencies
node_modules/
npm-debug.log
yarn-error.log

# Build output
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Editor files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
logs
*.log

# Coverage directory used by tools like istanbul
coverage

# Temporary files
*.tmp
*.temp

# Recovery files
recovered_files/
recovered_file
EOL

echo "Recovery complete. Please check the contents of the recovered files."
