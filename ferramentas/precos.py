#!/usr/bin/env python3
"""
Calcula o preço sugerido de cada obra e grava em assets/obras.js (campo preco).

Regra (ajuste os números abaixo e rode de novo):
  preço = (largura + altura, em cm) × taxa por cm linear × fator de detalhe × fator de suporte + moldura
  - taxa: pintura R$ 11 por cm linear, desenho R$ 6 por cm linear
  - fator de detalhe 1,2 para animais, figuras e retratos (trabalho mais minucioso)
  - fator de suporte 0,6 quando a técnica diz "papel" (pintura em papel, não em tela)
  - moldura: + R$ 150 quando a técnica diz "moldura"
  - sem mínimo; teto de R$ 1.900 nas pinturas (quadro mais caro das referências)
  - estudos (campo estudo preenchido) ficam sem preço
  - obras com status "acervo" ou "vendido" ficam sem preço (o site mostra a situação)
  - obras sem medidas: só recebem preço com --estimar (assume LADO_ESTIMADO cm no lado maior,
    e o outro lado pela proporção da foto). Preencha as medidas e rode de novo para corrigir.

Referência usada em 21/10/2026 (preços de outros pintores, para a Ivana ficar abaixo):
  Alexandre Reider: 15×20 cm R$ 600–800 | 20×25 R$ 1.000–1.100 | 20×30 R$ 1.100
  Douglas Okada:    20×30 cm R$ 600–650  | 24×30 R$ 650        | 30×40 R$ 1.000–1.300
  Com esta tabela a Ivana fica em: 15×20 → R$ 390 | 20×30 → R$ 550 | 30×40 → R$ 770

Uso:  python3 ferramentas/precos.py            # só obras com medidas
      python3 ferramentas/precos.py --estimar  # também as sem medidas (estimativa)
      python3 ferramentas/precos.py --tabela   # só mostra a tabela, não grava
"""
import re, sys, os, csv

TAXA_PINTURA = 11       # R$ por cm linear (largura + altura)
TAXA_DESENHO = 6        # R$ por cm linear
FATOR_DETALHE = 1.2     # animais, figuras e retratos
FATOR_PAPEL = 0.6       # pintura em papel em vez de tela
MOLDURA = 150           # R$ a mais quando tem moldura
MIN_PINTURA = 0         # sem mínimo: o preço é só proporcional ao tamanho
MIN_DESENHO = 0
TETO_PINTURA = 1900     # teto: nenhuma pintura passa do quadro mais caro das referências
LADO_ESTIMADO = 45      # cm, lado maior, quando não há medidas (--estimar)
TEMAS_DETALHE = {"animais", "figuras"}
PALAVRAS_DETALHE = ("retrato", "moça", "bailarino", "anatomia", "gorila")

def campo(linha, nome, padrao=""):
    m = re.search(r'\b%s: "([^"]*)"' % nome, linha)
    return m.group(1) if m else padrao

def arredonda(v):
    return int(round(v / 50.0) * 50) if v >= 1000 else int(round(v / 10.0) * 10)

def calcula(a, b, tema, titulo, tecnica):
    """Preço para uma obra de a × b cm. Usado também pelo --simular."""
    desenho = tema == "desenhos"
    taxa = TAXA_DESENHO if desenho else TAXA_PINTURA
    fator = FATOR_DETALHE if (tema in TEMAS_DETALHE or any(p in titulo.lower() for p in PALAVRAS_DETALHE)) else 1.0
    suporte = FATOR_PAPEL if (not desenho and "papel" in tecnica.lower()) else 1.0
    valor = (a + b) * taxa * fator * suporte
    valor = max(valor, MIN_DESENHO if desenho else MIN_PINTURA)
    if "moldura" in tecnica.lower():
        valor += MOLDURA
    if not desenho and TETO_PINTURA:
        valor = min(valor, TETO_PINTURA)
    return arredonda(valor)

raiz = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
arq = os.path.join(raiz, "assets", "obras.js")
estimar = "--estimar" in sys.argv
so_tabela = "--tabela" in sys.argv
texto = open(arq, encoding="utf-8").read()

linhas_tabela = []
def troca(m):
    linha = m.group(0)
    id_, titulo, tema = campo(linha, "id"), campo(linha, "titulo"), campo(linha, "tema")
    tecnica, medidas, estudo = campo(linha, "tecnica"), campo(linha, "medidas"), campo(linha, "estudo")
    status = campo(linha, "status")
    w, h = (int(x) for x in re.search(r'\bw: (\d+), h: (\d+)', linha).groups())
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
        preco = calcula(a, b, tema, titulo, tecnica)
    linhas_tabela.append({"id": id_, "titulo": titulo, "tema": tema, "tecnica": tecnica, "medidas": medidas or (f"~{a:.0f} × {b:.0f} cm" if a else ""), "origem": origem, "preco": preco})
    novo = f'preco: {preco}' if preco != "" else 'preco: ""'
    return re.sub(r'\bpreco: (?:"[^"]*"|\d+)', novo, linha)

novo_texto = re.sub(r'^    \{ id: "\d+".*\},$', troca, texto, flags=re.M)

print(f'{"Nº":>3} {"id":>4}  {"título":<30} {"tema":<14} {"técnica":<22} {"medidas":<14} {"origem":<10} {"preço":>9}')
total = 0
for i, r in enumerate(linhas_tabela, start=1):
    p = f'R$ {r["preco"]:,}'.replace(",", ".") if r["preco"] != "" else "—"
    print(f'{i:>3} {r["id"]:>4}  {r["titulo"][:30]:<30} {r["tema"]:<14} {r["tecnica"][:22]:<22} {r["medidas"]:<14} {r["origem"]:<10} {p:>9}')
    if r["preco"] != "": total += r["preco"]
print(f"\nsoma de todas as obras com preço: R$ {total:,}".replace(",", "."))

if not so_tabela:
    open(arq, "w", encoding="utf-8").write(novo_texto)
    with open(os.path.join(raiz, "ferramentas", "tabela-precos.csv"), "w", encoding="utf-8", newline="") as f:
        wr = csv.writer(f, delimiter=";")
        wr.writerow(["nº", "id", "título", "tema", "técnica", "medidas", "origem", "preço (R$)"])
        for i, r in enumerate(linhas_tabela, start=1):
            wr.writerow([i, r["id"], r["titulo"], r["tema"], r["tecnica"], r["medidas"], r["origem"], r["preco"]])
    print("gravado em assets/obras.js e ferramentas/tabela-precos.csv")
