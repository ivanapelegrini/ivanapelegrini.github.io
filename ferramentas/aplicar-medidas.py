#!/usr/bin/env python3
"""
Aplica as medidas (e a técnica) que a Ivana mandar em assets/obras.js e recalcula os preços.

1. Cole as linhas dela em ferramentas/medidas.txt, uma obra por linha, do jeito que vier.
   Vale o Nº do catálogo (1 a 74) ou o id (072 a 145). Exemplos aceitos:
       14 - 40x50cm óleo s/tela
       02 - 49x36 cm óleo s/tecido
       47 - 40x30cm óleo sobre tela c/ moldura
       16 - acervo            (vira "acervo da artista", sem preço)
       72 - vendido           (vira "vendido", sem preço)
   A medida é guardada como veio (a Ivana escreve altura x largura). O texto depois da medida
   vira a técnica, com "s/" trocado por "sobre" e "c/" por "com". "papel" na técnica dá o
   desconto de pintura em papel; "moldura" soma a moldura. Texto depois de "Obs" é ignorado.
2. Rode:  python3 ferramentas/aplicar-medidas.py
   Ele grava e já roda o precos.py.
"""
import re, os, sys, subprocess

raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
arq = os.path.join(raiz, "assets", "obras.js")
ent = os.path.join(raiz, "ferramentas", "medidas.txt")
if not os.path.exists(ent):
    print("crie ferramentas/medidas.txt com uma obra por linha (veja o topo deste script)"); sys.exit(1)
texto = open(arq, encoding="utf-8").read()
ids = re.findall(r'^    \{ id: "(\d+)".*$', texto, flags=re.M)  # ids na ordem do catálogo
ids_por_numero = {i + 1: id_ for i, id_ in enumerate(ids)}

def acha_id(num):
    if len(num) == 3 and num in ids: return num
    return ids_por_numero.get(int(num))

def normaliza_tecnica(s):
    s = re.sub(r'\bObs\b.*$', '', s, flags=re.I)          # observações não entram
    s = s.replace("*", "").strip(" -–:,.;")
    s = re.sub(r'(?i)óleos/', 'óleo s/', s)                # "óleos/painel"
    s = re.sub(r'(?i)\bs/\s*', 'sobre ', s)
    s = re.sub(r'(?i)\bc/\s*', 'com ', s)
    s = re.sub(r'\s+', ' ', s).strip(" .")
    s = re.sub(r'(?i)\s+com moldura', ', com moldura', s)
    return s[:1].upper() + s[1:] if s else ""

def set_campo(linha, nome, valor):
    return re.sub(r'\b%s: "[^"]*"' % nome, '%s: "%s"' % (nome, valor.replace('"', "'")), linha)

aplicadas = 0
for bruta in open(ent, encoding="utf-8"):
    s = bruta.strip()
    if not s or s.startswith("#"): continue
    m = re.match(r'^(?:n[ºo°]?\s*)?(\d{1,3})\b[\s:.\-–]*(.*)$', s, flags=re.I)
    if not m: print("não entendi:", s); continue
    id_ = acha_id(m.group(1)); resto = m.group(2).strip()
    if not id_: print("obra não encontrada:", s); continue
    linha = re.search(r'^    \{ id: "%s".*$' % id_, texto, flags=re.M).group(0)
    nova = linha
    st = re.match(r'^(vendido|vendida|acervo)\b', resto, flags=re.I)
    md = re.match(r'^(\d{1,3}(?:[.,]\d)?)\s*[x×X]\s*(\d{1,3}(?:[.,]\d)?)\s*(?:cm)?\s*(.*)$', resto)
    if st:
        nova = set_campo(nova, "status", "vendido" if st.group(1).lower().startswith("vend") else "acervo")
        nova = re.sub(r'\bpreco: (?:"[^"]*"|\d+)', 'preco: ""', nova)
        print(f"ok: id {id_} -> {st.group(1).lower()}")
    elif md:
        a, b = (x.replace(",", ".") for x in md.group(1, 2))
        fmt = lambda v: str(int(float(v))) if float(v).is_integer() else v
        medidas = f"{fmt(a)} × {fmt(b)} cm"
        nova = set_campo(nova, "medidas", medidas)
        tec = normaliza_tecnica(md.group(3))
        if tec: nova = set_campo(nova, "tecnica", tec)
        print(f"ok: id {id_} -> {medidas}" + (f" | {tec}" if tec else ""))
    else:
        print("não entendi:", s); continue
    texto = texto.replace(linha, nova); aplicadas += 1
open(arq, "w", encoding="utf-8").write(texto)
print(f"\n{aplicadas} obra(s) atualizada(s). Recalculando preços...\n")
subprocess.run([sys.executable, os.path.join(raiz, "ferramentas", "precos.py"), "--estimar"], check=True)
