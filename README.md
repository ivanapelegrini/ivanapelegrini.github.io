# Ivana Pelegrini — galeria de quadros

Site estático (HTML, CSS e JS puros, sem build). Abra `index.html` com dois cliques para ver.
Feito em 21/10/2026 a partir das 59 fotos que a vó mandou pelo WhatsApp, mais 15 obras
(11 desenhos e 4 quadros) tiradas da loja WordPress antiga dela, no mesmo servidor Plesk
(`/loja/` do site "Ivana Pelegrini"). Os títulos e medidas de 35 obras vieram dessa loja.

## Pastas

- `index.html` — a página inteira.
- `assets/obras.js` — **todos os dados**: títulos, temas, ano, técnica, medidas e os contatos da Ivana.
- `assets/estilo.css` e `assets/site.js` — visual e comportamento.
- `img/obras/` (até 1600 px) e `img/miniaturas/` (720 px) — versões web dos quadros, em WebP.
- `originais/` — as fotos originais do WhatsApp, renomeadas com o número e o título.
- `ferramentas/catalogo.txt` — a lista `id | arquivo | título | tema` usada na primeira geração.
- `ferramentas/processar.sh` — regenera as imagens web a partir de `originais/`.

## Para editar

1. **Títulos, ano, técnica, medidas:** `assets/obras.js`, uma linha por quadro.
   Os títulos atuais são provisórios (foram dados olhando as fotos). Campos vazios não aparecem no site.
2. **Contatos:** bloco `config` no topo de `assets/obras.js` (WhatsApp só com números, e-mail,
   Instagram, cidade). Os botões somem sozinhos quando o campo está vazio.
   O WhatsApp já está configurado (+55 19 99884-3170) e liga três botões: o flutuante no canto,
   o da seção Contato e o "Perguntar sobre esta obra" na obra ampliada.
3. **Texto do "Sobre":** direto no `index.html`, seção `#sobre`. Está marcado como provisório.

## Para adicionar um quadro

1. Salve a foto em `originais/` com um nome como `131-nome-do-quadro.jpg`.
2. Rode `ferramentas/processar.sh` (precisa do ImageMagick: `brew install imagemagick`).
   Ele gera as versões web e imprime uma linha pronta para `assets/obras.js`.
3. Cole a linha no fim de `obras`, preencha `titulo` e `tema`.

Temas aceitos: `paisagens`, `flores`, `natureza-morta`, `animais`, `figuras`, `desenhos`.

## Estudos (cópias feitas para aprender)

Quadro copiado de obra de outro artista precisa ter o campo `estudo` preenchido em `assets/obras.js`,
ex.: `estudo: "a partir de obra de William-Adolphe Bouguereau"`. Se não souber de quem,
use `"a partir de obra de outro artista"`. Com isso o quadro ganha o selo **Estudo** na galeria,
entra no filtro Estudos e, quando ampliado, mostra o aviso de que não é um original nem é
vendido como tal. Obras autorais ficam com `estudo: ""`.
A numeração (Nº 01, 02...) segue a ordem da lista, então um quadro novo entra no fim.

## Preços

Os preços ficam no campo `preco` de cada obra em `assets/obras.js` (número em reais, sem centavos).
Vazio mostra "Preço sob consulta"; estudos nunca mostram preço. O campo `status` aceita `"acervo"`
(acervo da artista, não está à venda) ou `"vendido"`: o site mostra a situação no lugar do preço e o
script não dá preço a essas obras.

A tabela de referência é o script `ferramentas/precos.py`:

    preço = (largura + altura em cm) × R$ 11 (pintura) ou R$ 6 (desenho)
            × 1,2 se for animal, figura ou retrato
            × 0,6 se a técnica disser "papel" (pintura em papel, não em tela)
            + R$ 150 se a técnica disser "moldura"
    sem mínimo; teto de R$ 1.900 nas pinturas

Os números ficam no topo do script. Ela foi calibrada em 21/10/2026 para ficar abaixo dos preços
do Alexandre Reider (professor da Ivana: 15×20 cm por R$ 600–800, 20×30 por R$ 1.100) e do
Douglas Okada (20×30 por R$ 600–650, 30×40 por R$ 1.000–1.300). Com ela a Ivana fica em
15×20 → R$ 390, 20×30 → R$ 550, 30×40 → R$ 770.

- Só com as obras que têm medidas: `python3 ferramentas/precos.py`
- Incluindo as sem medidas (estima 45 cm no lado maior): `python3 ferramentas/precos.py --estimar`
- Só ver a tabela, sem gravar: `python3 ferramentas/precos.py --tabela`

`ferramentas/tabela-precos.csv` tem a última tabela gerada.

### Quando a vó mandar as medidas

Cole as linhas dela em `ferramentas/medidas.txt`, do jeito que vierem (número do quadro e medida;
as palavras "papel", "tela" e "moldura" também são entendidas), e rode:

    python3 ferramentas/aplicar-medidas.py

Ele grava as medidas e a técnica em `assets/obras.js` e já recalcula os preços. Depois é só
`git add -A && git commit -m "medidas" && git push`.

## Publicação

O site está no ar em **https://ivanapelegrini.github.io**, pelo GitHub Pages, no repositório
`ivanapelegrini/ivanapelegrini.github.io` (organização "ivanapelegrini", administrada pela conta miguel-aw).

Para publicar uma mudança, basta commitar e enviar para a branch `main`:

```bash
git add -A
git commit -m "o que mudou"
git push
```

Em um ou dois minutos o GitHub Pages atualiza sozinho (não há build: é a pasta como está).

Domínio próprio no futuro (ex.: ivanapelegrini.com.br): Settings → Pages → Custom domain no repositório,
mais um registro CNAME no provedor do domínio apontando para `ivanapelegrini.github.io`.

Links diretos funcionam: `https://ivanapelegrini.github.io/#obra-072` abre o quadro 072 já ampliado.
