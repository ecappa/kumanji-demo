#!/bin/bash

# Script de setup PocketBase pour Story 1.2
# Démarre Docker, lance PocketBase, et configure la collection events

set -e

echo "🚀 Démarrage PocketBase setup..."

# 1. Vérifier et démarrer Docker
echo "📦 Vérification Docker..."
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker daemon non accessible. Veuillez démarrer Docker Desktop."
    exit 1
fi

# 2. Démarrer PocketBase container
echo "🗄️ Démarrage container PocketBase..."
docker compose up pocketbase -d

# 3. Attendre que PocketBase soit prêt
echo "⏳ Attente PocketBase ready..."
for i in {1..30}; do
    if curl -s http://127.0.0.1:8090/api/health > /dev/null 2>&1; then
        echo "✅ PocketBase accessible!"
        break
    fi
    echo "   Tentative $i/30..."
    sleep 2
done

# 4. Vérifier que PocketBase répond
if ! curl -s http://127.0.0.1:8090/api/health > /dev/null 2>&1; then
    echo "❌ PocketBase non accessible après 60s"
    docker compose logs pocketbase
    exit 1
fi

echo "🎯 PocketBase setup terminé!"
echo "📋 Admin UI: http://127.0.0.1:8090/_/"
echo "🔧 API: http://127.0.0.1:8090/api/"
echo ""
echo "📝 IMPORTANT: Vous devez manuellement:"
echo "   1. Aller sur http://127.0.0.1:8090/_/"
echo "   2. Créer un admin user"
echo "   3. Créer collection 'events' avec ce schéma:"
echo "      - title (text, required)"
echo "      - description (text, optional)"
echo "      - date (date, required)"
echo "      - youtube_url (url, optional)"
echo "      - status (select: draft,published,completed,cancelled, required)"
echo "      - image_url (url, optional)"