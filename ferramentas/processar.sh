#!/usr/bin/env bash
# Gera as versões web (img/obras e img/miniaturas) de todas as fotos em originais/.
# Precisa do ImageMagick 7: brew install imagemagick
# Uso: ferramentas/processar.sh
# Para cada foto ele imprime uma linha pronta para colar em assets/obras.js
# (copie só as linhas dos quadros novos e preencha titulo e tema).
set -e
cd "$(dirname "$0")/.."
mkdir -p img/obras img/miniaturas
for f in originais/*.jpg originais/*.jpeg originais/*.png; do
  [ -e "$f" ] || continue
  n=$(basename "${f%.*}")
  magick "$f" -auto-orient -strip -resize '1600x>' -define webp:method=6 -quality 84 "img/obras/$n.webp"
  magick "$f" -auto-orient -strip -resize '720x>'  -define webp:method=6 -quality 80 "img/miniaturas/$n.webp"
  read -r w h < <(magick identify -format '%w %h' "img/obras/$n.webp")
  echo "    { id: \"${n%%-*}\", arquivo: \"$n\", titulo: \"\", tema: \"\", w: $w, h: $h, ano: \"\", tecnica: \"\", medidas: \"\" },"
done
