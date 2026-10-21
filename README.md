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
script não dá preço a essas obras. A tabela de referência é o script
`ferramentas/precos.py` (área em cm² × R$ 0,55 na pintura e R$ 0,30 no desenho, fator 1,3 para animais,
figuras e retratos, + R$ 150 com moldura, mínimo R$ 500 para pintura e R$ 250 para desenho). Os números da regra ficam no topo
do script. `ferramentas/tabela-precos.csv` tem a última tabela gerada.

- Só com as obras que têm medidas: `python3 ferramentas/precos.py`
- Incluindo as sem medidas (estima 45 cm no lado maior): `python3 ferramentas/precos.py --estimar`
- Só ver a tabela, sem gravar: `python3 ferramentas/precos.py --tabela`

Em 21/10/2026 rodei com `--estimar`: 39 pinturas estão com tamanho estimado. Quando a vó medir,
preencha `medidas` e rode o script de novo (ou ajuste o `preco` na mão).

## Para publicar

É só subir a pasta inteira em qualquer hospedagem estática: GitHub Pages, Vercel, Netlify
ou o mesmo Plesk do site da Ana. Depois de ter o domínio, troque o `og:image` no `index.html`
pela URL completa (ex.: `https://dominio.com.br/img/og.jpg`) para o link ficar bonito no WhatsApp.

Links diretos funcionam: `#obra-072` abre o quadro 072 já ampliado.
