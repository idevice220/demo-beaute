#!/bin/sh
# Applique les migrations à chaque démarrage ; les données de démo sont
# créées par l'application elle-même au premier appel (lib/demo.ts).
set -e
npx prisma migrate deploy
exec npm start
