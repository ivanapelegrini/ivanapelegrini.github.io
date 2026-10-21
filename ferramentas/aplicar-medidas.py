#!/usr/bin/env python3
"""
Aplica as medidas que a Ivana mandar em assets/obras.js e recalcula os preços.

1. Cole as medidas em ferramentas/medidas.txt, uma obra por linha, do jeito que vier.
   Vale o Nº do catálogo (1 a 74) ou o id (072 a 145). Exemplos aceitos:
       14 - 40x50
       Nº 22: 43 x 43 cm, tela, com moldura
       086 83 × 63 papel
   Palavras "papel" ou "tela" definem o suporte; "moldura" marca que tem moldura.
2. Rode:  python3 ferramentas/aplicar-medidas.py
   Ele grava medidas (e técnica, quando a linha diz papel/tela/moldura) e roda o precos.py.
"""
import re, os, sys, subprocess

raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
arq = os.path.join(raiz, "assets", "obras.js")
ent = os.path.join(raiz, "ferramentas", "medidas.txt")
if not os.path.exists(ent):
    print("crie ferramentas/medidas.txt com uma obra por linha (veja o topo deste script)"); sys.exit(1)
texto = open(arq, encoding="utf-8").read()
linhas_obras = re.findall(r'^    \{ id: "(\d+)".*$', texto, flags=re.M)  # ids na ordem do catálogo
ids_por_numero = {i + 1: id_ for i, id_ in enumerate(linhas_obras)}

aplicadas = 0
for bruta in open(ent, encoding="utf-8"):
    s = bruta.strip()
    if not s or s.startswith("#"):
        continue
    m = re.match(r'^(?:n[ºo°]?\s*)?(\d{1,3})\b[\s:.\-–]*(\d{1,3}(?:[.,]\d)?)\s*[x×X]\s*(\d{1,3}(?:[.,]\d)?)', s, flags=re.I)
    if not m:
        print("não entendi:", s); continue
    num, a, b = m.group(1), m.group(2).replace(",", "."), m.group(3).replace(",", ".")
    id_ = num.zfill(3) if len(num) == 3 and num.zfill(3) in linhas_obras else ids_por_numero.get(int(num))
    if not id_:
        print("obra não encontrada:", s); continue
    a, b = (int(float(a)) if float(a).is_integer() else float(a)), (int(float(b)) if float(b).is_integer() else float(b))
    medidas = f"{a} × {b} cm"
    linha = re.search(r'^    \{ id: "%s".*$' % id_, texto, flags=re.M).group(0)
    nova = re.sub(r'medidas: "[^"]*"', f'medidas: "{medidas}"', linha)
    baixo = s.lower()
    partes = []
    if "papel" in baixo: partes.append("Sobre papel")
    elif "tela" in baixo: partes.append("Sobre tela")
    tecnica_atual = re.search(r'tecnica: "([^"]*)"', linha).group(1)
    if "moldura" in baixo or "moldura" in tecnica_atual.lower(): partes.append("com moldura")
    if partes:
        nova = re.sub(r'tecnica: "[^"]*"', 'tecnica: "' + ", ".join(partes) + '"', nova)
    texto = texto.replace(linha, nova); aplicadas += 1
    print(f"ok: id {id_} -> {medidas}" + (f" | {', '.join(partes)}" if partes else ""))
open(arq, "w", encoding="utf-8").write(texto)
print(f"\n{aplicadas} obra(s) atualizada(s). Recalculando preços...\n")
subprocess.run([sys.executable, os.path.join(raiz, "ferramentas", "precos.py"), "--estimar"], check=True)
