#!/bin/sh

echo "Iniciando aplicação Vue..."

# Verifica se node_modules existe, se não, instala
if [ ! -d "node_modules" ]; then
  echo "Instalando dependências..."
  npm install
else
  echo "Dependências já instaladas"
fi

# Verifica se package-lock.json mudou e reinstala se necessário
if [ -f "package-lock.json.bak" ]; then
  if ! cmp -s package-lock.json package-lock.json.bak; then
    echo "package-lock.json mudou, reinstalando dependências..."
    npm install
  fi
fi

# Salva uma cópia do package-lock.json para comparação futura
cp package-lock.json package-lock.json.bak 2>/dev/null || true

echo "Iniciando servidor de desenvolvimento..."

# Inicia o servidor Vite
npm run dev -- --host 0.0.0.0