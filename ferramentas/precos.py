#!/usr/bin/env python3
"""
Calcula o preço sugerido de cada obra e grava em assets/obras.js (campo preco).

Regra (ajuste os números abaixo e rode de novo):
  preço = área (cm²) × taxa × fator de detalhe  + moldura   (mínimo por tipo)
  - taxa: pintura R$ 0,55/cm², desenho R$ 0,30/cm²
  - fator de detalhe 1,3 para animais, figuras e retratos (trabalho mais minucioso)
  - moldura: + R$ 150 quando a técnica diz "com moldura"
  - estudos (campo estudo preenchido) ficam sem preço
  - obras com status "acervo" ou "vendido" ficam sem preço (o site mostra a situação)
  - obras sem medidas: só recebem preço com --estimar (assume LADO_ESTIMADO cm no lado maior,
    e o outro lado pela proporção da foto). Preencha as medidas e rode de novo para corrigir.

Uso:  python3 ferramentas/precos.py            # só obras com medidas
      python3 ferramentas/precos.py --estimar  # também as sem medidas (estimativa)
      python3 ferramentas/precos.py --tabela   # só mostra a tabela, não grava
"""
import re, sys, json, os, csv

TAXA_PINTURA = 0.55     # R$ por cm²
TAXA_DESENHO = 0.30     # R$ por cm²
FATOR_DETALHE = 1.3     # animais, figuras e retratos
MOLDURA = 150           # R$ a mais quando tem moldura
MIN_PINTURA = 500
MIN_DESENHO = 250
LADO_ESTIMADO = 45      # cm, lado maior, quando não há medidas (--estimar)
TEMAS_DETALHE = {"animais", "figuras"}
PALAVRAS_DETALHE = ("retrato", "moça", "bailarino", "anatomia", "gorila")

raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
arq = os.path.join(raiz, "assets", "obras.js")
estimar = "--estimar" in sys.argv
so_tabela = "--tabela" in sys.argv
texto = open(arq, encoding="utf-8").read()

def campo(linha, nome, padrao=""):
    m = re.search(r'\b%s: "([^"]*)"' % nome, linha)
    return m.group(1) if m else padrao

def arredonda(v):
    return int(round(v / 50.0) * 50) if v >= 1000 else int(round(v / 10.0) * 10)

linhas_tabela = []
def troca(m):
    linha = m.group(0)
    id_, titulo, tema = campo(linha, "id"), campo(linha, "titulo"), campo(linha, "tema")
    tecnica, medidas, estudo = campo(linha, "tecnica"), campo(linha, "medidas"), campo(linha, "estudo")
    status = campo(linha, "status")
    w, h = (int(x) for x in re.search(r'\bw: (\d+), h: (\d+)', linha).groups())
    desenho = tema == "desenhos"
    nums = [float(x) for x in re.findall(r'[\d.,]+', medidas.replace(",", "."))]
    origem = "medida"
    if len(nums) >= 2:
        a, b = nums[0], nums[1]
    elif estimar:
        maior = LADO_ESTIMADO
        a, b = (maior, maior * h / w) if w >= h else (maior * w / h, maior)
        origem = "estimado"
    else:
        a = b = None
    if estudo:
        preco = ""; origem = "estudo"
    elif status:
        preco = ""; origem = status
    elif a is None:
        preco = ""; origem = "sem medidas"
    else:
        area = a * b
        taxa = TAXA_DESENHO if desenho else TAXA_PINTURA
        fator = FATOR_DETALHE if (tema in TEMAS_DETALHE or any(p in titulo.lower() for p in PALAVRAS_DETALHE)) else 1.0
        valor = area * taxa * fator
        valor = max(valor, MIN_DESENHO if desenho else MIN_PINTURA)
        if "moldura" in tecnica.lower():
            valor += MOLDURA
        preco = arredonda(valor)
    linhas_tabela.append({"id": id_, "titulo": titulo, "tema": tema, "medidas": medidas or (f"~{a:.0f} × {b:.0f} cm" if a else ""), "origem": origem, "preco": preco})
    novo = f'preco: {preco}' if preco != "" else 'preco: ""'
    return re.sub(r'\bpreco: (?:"[^"]*"|\d+)', novo, linha)

novo_texto = re.sub(r'^    \{ id: "\d+".*\},$', troca, texto, flags=re.M)

print(f'{"Nº":>3} {"id":>4}  {"título":<32} {"tema":<15} {"medidas":<16} {"origem":<12} {"preço":>9}')
total = 0
for i, r in enumerate(linhas_tabela, start=1):
    p = f'R$ {r["preco"]:,}'.replace(",", ".") if r["preco"] != "" else "—"
    print(f'{i:>3} {r["id"]:>4}  {r["titulo"][:32]:<32} {r["tema"]:<15} {r["medidas"]:<16} {r["origem"]:<12} {p:>9}')
    if r["preco"] != "": total += r["preco"]
print(f"\nsoma de todas as obras com preço: R$ {total:,}".replace(",", "."))

if not so_tabela:
    open(arq, "w", encoding="utf-8").write(novo_texto)
    with open(os.path.join(raiz, "ferramentas", "tabela-precos.csv"), "w", encoding="utf-8", newline="") as f:
        wr = csv.writer(f, delimiter=";")
        wr.writerow(["nº", "id", "título", "tema", "medidas", "origem", "preço (R$)"])
        for i, r in enumerate(linhas_tabela, start=1):
            wr.writerow([i, r["id"], r["titulo"], r["tema"], r["medidas"], r["origem"], r["preco"]])
    print("gravado em assets/obras.js e ferramentas/tabela-precos.csv")
