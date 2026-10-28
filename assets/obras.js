// ============================================================
//  Dados do site da Ivana. Tudo que é texto mora aqui.
//  - config: contatos (botões somem quando o campo está vazio)
//  - temas: as categorias dos filtros
//  - obras: uma linha por quadro, na ordem do catálogo (Nº 01, 02...)
//    Títulos e medidas: 35 obras vieram da loja WordPress da Ivana (títulos oficiais);
//    as outras receberam título provisório olhando a foto. Troque à vontade.
//    ano, tecnica e medidas ficam escondidos enquanto estiverem vazios.
//    w e h são a largura e a altura da imagem em img/obras/ (em pixels).
//    estudo: deixe "" nas obras autorais. Para cópias feitas para aprender, escreva de
//    onde a cópia partiu, ex.: "a partir de obra de William-Adolphe Bouguereau".
//    Se não souber, "a partir de obra de outro artista". Tudo que tiver estudo
//    preenchido ganha o selo "Estudo", entra no filtro Estudos e mostra o aviso
//    de que não é um original.
//    preco: número em reais, sem centavos (ex.: 650). Vazio = "Preço sob consulta".
//    Estudos ficam sem preço. Para recalcular tudo pela tabela: python3 ferramentas/precos.py
//    status: "" (à venda), "acervo" (acervo da artista, não está à venda) ou "vendido".
//    Com status preenchido o site mostra a situação no lugar do preço.
// ============================================================
window.IVANA = {
  config: {
    nome: "Ivana Pelegrini",
    whatsapp: "5519998843170",   // só números, com país e DDD
    email: "",      // Ex.: "ivana@exemplo.com"
    instagram: "",  // só o usuário, sem @
    cidade: "",     // Ex.: "Belo Horizonte, MG" (aparece no "Sobre")
  },
  temas: {
    paisagens: "Paisagens",
    flores: "Flores e plantas",
    "natureza-morta": "Natureza-morta",
    animais: "Animais",
    figuras: "Figuras",
    desenhos: "Desenhos",
  },
  obras: [
    { id: "072", arquivo: "072-passeio-a-cavalo", titulo: "Passeio a cavalo", tema: "figuras", w: 1599, h: 1249, estudo: "", ano: "", tecnica: "Óleo em tecido sobre madeira, com moldura", medidas: "82 × 101 cm", preco: 1900, status: "" },
    { id: "073", arquivo: "073-veleiros", titulo: "Veleiro", tema: "paisagens", w: 1024, h: 1401, estudo: "", ano: "", tecnica: "Óleo sobre tecido", medidas: "49 × 36 cm", preco: 940, status: "" },
    { id: "074", arquivo: "074-serra-com-pinheiros", titulo: "Serra com pinheiros", tema: "paisagens", w: 1599, h: 1188, estudo: "", ano: "", tecnica: "Óleo sobre papel paraná", medidas: "18 × 24 cm", preco: 280, status: "" },
    { id: "075", arquivo: "075-rancho-na-serra", titulo: "Rancho na serra", tema: "paisagens", w: 1600, h: 1279, estudo: "", ano: "", tecnica: "Óleo sobre papel paraná", medidas: "21 × 25 cm", preco: 300, status: "" },
    { id: "076", arquivo: "076-casa-na-montanha", titulo: "Casa na montanha", tema: "paisagens", w: 1600, h: 1137, estudo: "", ano: "", tecnica: "Óleo sobre papel paraná", medidas: "19 × 27 cm", preco: 300, status: "" },
    { id: "077", arquivo: "077-lago-ao-entardecer", titulo: "Lago ao entardecer", tema: "paisagens", w: 1600, h: 1227, estudo: "", ano: "", tecnica: "Óleo sobre papel paraná", medidas: "19 × 24 cm", preco: 280, status: "" },
    { id: "078", arquivo: "078-casinha-com-ipes", titulo: "Casinha com ipês", tema: "paisagens", w: 1600, h: 1245, estudo: "", ano: "", tecnica: "Óleo sobre papel paraná", medidas: "19 × 23 cm", preco: 280, status: "" },
    { id: "079", arquivo: "079-lago-e-montanha", titulo: "Lago e montanha", tema: "paisagens", w: 1600, h: 1179, estudo: "", ano: "", tecnica: "Óleo sobre papel paraná", medidas: "18 × 24 cm", preco: 280, status: "" },
    { id: "080", arquivo: "080-caveira-e-rosa", titulo: "Crânio com rosa", tema: "natureza-morta", w: 1132, h: 1600, estudo: "", ano: "", tecnica: "Óleo sobre tecido", medidas: "32 × 22 cm", preco: 590, status: "" },
    { id: "081", arquivo: "081-cogumelos", titulo: "Cogumelos", tema: "flores", w: 1373, h: 805, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "30 × 50 cm", preco: 880, status: "" },
    { id: "082", arquivo: "082-coelhos", titulo: "Coelhos", tema: "animais", w: 1600, h: 926, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "50 × 90 cm", preco: 1850, status: "" },
    { id: "083", arquivo: "083-veleiros-no-lago", titulo: "Veleiros no lago", tema: "paisagens", w: 1599, h: 870, estudo: "", ano: "", tecnica: "Óleo em tecido sobre madeira", medidas: "39 × 72 cm", preco: 1200, status: "" },
    { id: "084", arquivo: "084-vila-toscana", titulo: "Vila toscana", tema: "paisagens", w: 1125, h: 1364, estudo: "", ano: "", tecnica: "Óleo sobre tecido", medidas: "63 × 52 cm", preco: 1250, status: "" },
    { id: "085", arquivo: "085-criancas-na-fonte", titulo: "Crianças na fonte", tema: "figuras", w: 1590, h: 1600, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "50 × 50 cm", preco: "", status: "acervo" },
    { id: "086", arquivo: "086-araras", titulo: "Araras Canindé", tema: "animais", w: 1466, h: 1070, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "60 × 80 cm", preco: 1850, status: "" },
    { id: "087", arquivo: "087-hibisco", titulo: "Hibisco", tema: "flores", w: 1549, h: 1033, estudo: "", ano: "", tecnica: "Óleo sobre painel", medidas: "40 × 60 cm", preco: "", status: "acervo" },
    { id: "088", arquivo: "088-tulipas", titulo: "Vaso com tulipas", tema: "flores", w: 1043, h: 1565, estudo: "", ano: "", tecnica: "Óleo em tecido sobre madeira", medidas: "62 × 41 cm", preco: 1150, status: "" },
    { id: "089", arquivo: "089-caminho-florido", titulo: "Luz dourada", tema: "paisagens", w: 1093, h: 1372, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "50 × 40 cm", preco: 990, status: "" },
    { id: "090", arquivo: "090-leao", titulo: "Rei das Selvas", tema: "animais", w: 1600, h: 1594, estudo: "", ano: "", tecnica: "Óleo sobre painel", medidas: "40 × 40 cm", preco: 1050, status: "" },
    { id: "091", arquivo: "091-lago-alpino", titulo: "Lago alpino", tema: "paisagens", w: 1103, h: 1404, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "50 × 40 cm", preco: 990, status: "" },
    { id: "092", arquivo: "092-sol-sobre-o-lago", titulo: "Sol sobre o lago", tema: "paisagens", w: 1589, h: 1600, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "15 × 15 cm", preco: 330, status: "" },
    { id: "093", arquivo: "093-rosa-vermelha", titulo: "Rosa vermelha", tema: "flores", w: 1600, h: 1555, estudo: "", ano: "", tecnica: "Óleo sobre painel", medidas: "40 × 40 cm", preco: 880, status: "" },
    { id: "094", arquivo: "094-pera", titulo: "Pera", tema: "natureza-morta", w: 1600, h: 1582, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "20 × 20 cm", preco: 440, status: "" },
    { id: "095", arquivo: "095-carpas", titulo: "Carpas", tema: "animais", w: 1054, h: 1389, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "24 × 18 cm", preco: 550, status: "" },
    { id: "096", arquivo: "096-galinha-e-pintinhos", titulo: "Galinha e pintinhos", tema: "animais", w: 1458, h: 1090, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "18 × 24 cm", preco: 550, status: "" },
    { id: "097", arquivo: "097-borboleta", titulo: "Borboleta", tema: "animais", w: 1600, h: 1075, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "10 × 15 cm", preco: 330, status: "" },
    { id: "098", arquivo: "098-vaca-no-pasto", titulo: "Vaca no pasto", tema: "animais", w: 1600, h: 1156, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "16 × 22 cm", preco: 500, status: "" },
    { id: "099", arquivo: "099-patinhos", titulo: "Patinhos", tema: "animais", w: 1599, h: 1168, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "16 × 22 cm", preco: 500, status: "" },
    { id: "100", arquivo: "100-zinias", titulo: "Zínias", tema: "flores", w: 952, h: 1459, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "15 × 10 cm", preco: 280, status: "" },
    { id: "101", arquivo: "101-abobora-e-leiteira", titulo: "Abóbora e leiteira", tema: "natureza-morta", w: 1600, h: 1308, estudo: "", ano: "", tecnica: "Óleo em tecido sobre madeira", medidas: "25 × 30 cm", preco: 600, status: "" },
    { id: "102", arquivo: "102-cachorro", titulo: "Labrador", tema: "animais", w: 1079, h: 1438, estudo: "", ano: "", tecnica: "Óleo em tecido sobre madeira", medidas: "30 × 23 cm", preco: 700, status: "" },
    { id: "103", arquivo: "103-colinas-da-toscana", titulo: "Toscana", tema: "paisagens", w: 1392, h: 1048, estudo: "", ano: "", tecnica: "Óleo em tecido sobre madeira", medidas: "29 × 37 cm", preco: 730, status: "" },
    { id: "104", arquivo: "104-barco-ao-entardecer", titulo: "Barco ao pôr do sol", tema: "paisagens", w: 1480, h: 1110, estudo: "", ano: "", tecnica: "Óleo em tecido sobre madeira", medidas: "30 × 40 cm", preco: 770, status: "" },
    { id: "105", arquivo: "105-flor-rosada", titulo: "Allamanda", tema: "flores", w: 1600, h: 1138, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "25 × 35 cm", preco: 660, status: "" },
    { id: "106", arquivo: "106-caminho-das-hortensias", titulo: "Caminho das hortênsias", tema: "paisagens", w: 1600, h: 1279, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "24 × 30 cm", preco: 590, status: "" },
    { id: "107", arquivo: "107-bule-de-prata-e-uvas", titulo: "Jarra com uvas", tema: "natureza-morta", w: 1600, h: 1251, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "24 × 30 cm", preco: 590, status: "" },
    { id: "108", arquivo: "108-barco-de-pesca", titulo: "Barco de pesca", tema: "paisagens", w: 1600, h: 1265, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "24 × 30 cm", preco: 590, status: "" },
    { id: "109", arquivo: "109-caminho-de-pedras", titulo: "Seixos", tema: "paisagens", w: 1564, h: 1060, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "20 × 30 cm", preco: 550, status: "" },
    { id: "110", arquivo: "110-gaviao-real", titulo: "Gavião-real", tema: "animais", w: 1013, h: 1558, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "30 × 20 cm", preco: 660, status: "" },
    { id: "111", arquivo: "111-pasto-com-ipes", titulo: "Pasto com ipês", tema: "paisagens", w: 1296, h: 1600, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "30 × 24 cm", preco: 590, status: "" },
    { id: "112", arquivo: "112-flores-da-paineira", titulo: "Paineira vermelha", tema: "flores", w: 1600, h: 593, estudo: "", ano: "", tecnica: "Óleo sobre painel", medidas: "30 × 80 cm", preco: 1200, status: "" },
    { id: "113", arquivo: "113-anturio-e-abelha", titulo: "Antúrio e abelha", tema: "flores", w: 1600, h: 1062, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "10 × 15 cm", preco: 280, status: "" },
    { id: "114", arquivo: "114-suculentas", titulo: "Suculentas", tema: "flores", w: 1562, h: 1042, estudo: "", ano: "", tecnica: "Óleo sobre painel", medidas: "40 × 60 cm", preco: 1100, status: "" },
    { id: "115", arquivo: "115-roseira", titulo: "Buquê de rosas", tema: "flores", w: 813, h: 1457, estudo: "", ano: "", tecnica: "Óleo em tecido sobre madeira", medidas: "50 × 31 cm", preco: 890, status: "" },
    { id: "116", arquivo: "116-vale", titulo: "Vale", tema: "paisagens", w: 1600, h: 835, estudo: "", ano: "", tecnica: "Óleo em tecido sobre madeira", medidas: "29 × 58 cm", preco: 960, status: "" },
    { id: "117", arquivo: "117-retrato-de-homem", titulo: "Retrato de homem", tema: "figuras", w: 1000, h: 1286, estudo: "a partir de obra de José de Ribera, pintor espanhol", ano: "", tecnica: "Óleo sobre tela", medidas: "50 × 40 cm", preco: "", status: "" },
    { id: "118", arquivo: "118-menina", titulo: "Menina", tema: "figuras", w: 992, h: 1297, estudo: "a partir de obra de William-Adolphe Bouguereau, pintor francês", ano: "", tecnica: "Óleo sobre tela, com moldura", medidas: "40 × 30 cm", preco: "", status: "" },
    { id: "119", arquivo: "119-rio-na-mata", titulo: "Reflexos", tema: "paisagens", w: 1204, h: 1600, estudo: "", ano: "", tecnica: "Óleo sobre papel Sinoart, com moldura", medidas: "40 × 30 cm", preco: 610, status: "" },
    { id: "120", arquivo: "120-borboleta-nas-flores", titulo: "Borboleta nas flores", tema: "animais", w: 1049, h: 1600, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "15 × 10 cm", preco: 330, status: "" },
    { id: "121", arquivo: "121-patos-no-pier", titulo: "Patos no píer", tema: "animais", w: 1599, h: 936, estudo: "", ano: "", tecnica: "Óleo em tecido sobre madeira", medidas: "24 × 41 cm", preco: 860, status: "" },
    { id: "122", arquivo: "122-abobora", titulo: "Abóbora", tema: "flores", w: 1489, h: 1497, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "15 × 15 cm", preco: 330, status: "" },
    { id: "123", arquivo: "123-orquideas", titulo: "Orquídeas", tema: "flores", w: 1584, h: 1600, estudo: "", ano: "", tecnica: "Óleo sobre painel", medidas: "30 × 30 cm", preco: 660, status: "" },
    { id: "124", arquivo: "124-dalia-branca", titulo: "Mini margarida", tema: "flores", w: 1600, h: 1599, estudo: "", ano: "", tecnica: "Óleo sobre painel", medidas: "30 × 30 cm", preco: 660, status: "" },
    { id: "125", arquivo: "125-gato", titulo: "Gato", tema: "animais", w: 1600, h: 1579, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "30 × 30 cm", preco: 790, status: "" },
    { id: "126", arquivo: "126-abobora-e-limoes", titulo: "Abóbora e limões", tema: "natureza-morta", w: 1545, h: 528, estudo: "", ano: "", tecnica: "Óleo sobre painel", medidas: "20 × 60 cm", preco: 880, status: "" },
    { id: "127", arquivo: "127-chaleira-de-cobre", titulo: "Chaleira de cobre", tema: "natureza-morta", w: 1600, h: 1197, estudo: "", ano: "", tecnica: "Óleo em tecido sobre madeira, com moldura", medidas: "30 × 40 cm", preco: 920, status: "" },
    { id: "128", arquivo: "128-lirios-amarelos", titulo: "Lírios amarelos", tema: "flores", w: 1330, h: 1340, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "25 × 25 cm", preco: 550, status: "" },
    { id: "129", arquivo: "129-cajus", titulo: "Cajus", tema: "flores", w: 1113, h: 1600, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "35 × 25 cm", preco: 660, status: "" },
    { id: "130", arquivo: "130-lagrima-de-cristo", titulo: "Lágrima de Cristo", tema: "flores", w: 1582, h: 1599, estudo: "", ano: "", tecnica: "Óleo sobre tela", medidas: "25 × 25 cm", preco: 550, status: "" },
    { id: "131", arquivo: "131-estudo-da-anatomia-feminina", titulo: "Estudo da anatomia feminina", tema: "desenhos", w: 1600, h: 1109, estudo: "", ano: "", tecnica: "Desenho", medidas: "33 × 23 cm", preco: 400, status: "" },
    { id: "132", arquivo: "132-gorila", titulo: "Gorila", tema: "desenhos", w: 1600, h: 2279, estudo: "", ano: "", tecnica: "Desenho", medidas: "34 × 23 cm", preco: 410, status: "" },
    { id: "133", arquivo: "133-natureza-morta-i", titulo: "Natureza-morta I", tema: "desenhos", w: 1600, h: 2350, estudo: "", ano: "", tecnica: "Desenho", medidas: "45 × 32 cm", preco: 460, status: "" },
    { id: "134", arquivo: "134-natureza-morta-ii", titulo: "Natureza-morta II", tema: "desenhos", w: 1600, h: 2183, estudo: "", ano: "", tecnica: "Desenho", medidas: "45 × 32 cm", preco: 460, status: "" },
    { id: "135", arquivo: "135-o-bailarino", titulo: "O Bailarino", tema: "desenhos", w: 1600, h: 2166, estudo: "", ano: "", tecnica: "Desenho", medidas: "38 × 28 cm", preco: 480, status: "" },
    { id: "136", arquivo: "136-moca-com-veu", titulo: "Moça com véu", tema: "desenhos", w: 1600, h: 2253, estudo: "", ano: "", tecnica: "Desenho", medidas: "45 × 32 cm", preco: 550, status: "" },
    { id: "137", arquivo: "137-moca-dormindo", titulo: "Moça dormindo", tema: "desenhos", w: 1600, h: 1081, estudo: "", ano: "", tecnica: "Desenho", medidas: "34 × 23 cm", preco: 410, status: "" },
    { id: "138", arquivo: "138-retrato-feminino-a-carvao", titulo: "Retrato feminino a carvão", tema: "desenhos", w: 1600, h: 2313, estudo: "", ano: "", tecnica: "Desenho a carvão", medidas: "41 × 31 cm", preco: 520, status: "" },
    { id: "139", arquivo: "139-retrato-masculino-a-carvao", titulo: "Retrato masculino a carvão", tema: "desenhos", w: 1600, h: 2226, estudo: "", ano: "", tecnica: "Desenho a carvão", medidas: "34 × 23 cm", preco: 410, status: "" },
    { id: "140", arquivo: "140-retrato-feminino-em-pastel", titulo: "Retrato feminino em pastel", tema: "desenhos", w: 1600, h: 2338, estudo: "", ano: "", tecnica: "Desenho em pastel", medidas: "34 × 23 cm", preco: 410, status: "" },
    { id: "141", arquivo: "141-retrato-de-indio-em-pastel", titulo: "Retrato de índio em pastel", tema: "desenhos", w: 1600, h: 2238, estudo: "", ano: "", tecnica: "Desenho em pastel", medidas: "45 × 32 cm", preco: 550, status: "" },
    { id: "142", arquivo: "142-retrato-masculino", titulo: "Retrato masculino", tema: "figuras", w: 1600, h: 2400, estudo: "", ano: "", tecnica: "Óleo sobre papel", medidas: "24 × 19 cm", preco: 340, status: "" },
    { id: "143", arquivo: "143-pinguim", titulo: "Pinguim", tema: "animais", w: 1600, h: 1980, estudo: "", ano: "", tecnica: "", medidas: "27 × 33 cm", preco: "", status: "vendido" },
    { id: "144", arquivo: "144-queda-dagua", titulo: "Queda d'água", tema: "paisagens", w: 1600, h: 1298, estudo: "", ano: "", tecnica: "Sobre MDF telado, com moldura", medidas: "34 × 27 cm", preco: "", status: "vendido" },
    { id: "145", arquivo: "145-rio-com-pedras", titulo: "Rio com pedras", tema: "paisagens", w: 1600, h: 2015, estudo: "", ano: "", tecnica: "", medidas: "32 × 42 cm", preco: "", status: "vendido" },
  ],
};
