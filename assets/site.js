// Site da Ivana: galeria. Sem dependências. Os dados vêm de assets/obras.js.
(function () {
  "use strict";
  var DADOS = window.IVANA || { config: {}, temas: {}, obras: [] };
  var config = DADOS.config || {};
  var temas = DADOS.temas || {};
  var obras = DADOS.obras || [];

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var pad = function (n) { return String(n).padStart(2, "0"); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var caminho = function (o, pasta) { return "img/" + pasta + "/" + o.arquivo + ".webp"; };
  var posicao = new Map(obras.map(function (o, i) { return [o.id, i]; }));
  var reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- estudos (cópias feitas para aprender) ---------- */
  var NOTA_ESTUDO = "Estudo: cópia feita para aprendizado, a partir de obra de outro artista. Não é um original e não é vendida como tal.";
  var ehEstudo = function (o) { return !!o.estudo; };
  var textoEstudo = function (o) {
    return typeof o.estudo === "string" && o.estudo.trim() ? "Estudo " + o.estudo.trim() : "Estudo a partir de obra de outro artista";
  };
  var moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  var precoDe = function (o) { return o.preco ? moeda.format(o.preco) : ""; };
  var STATUS = { acervo: "Acervo da artista", vendido: "Vendido" };
  var situacao = function (o) { return o.status ? (STATUS[o.status] || o.status) : ""; };
  var bate = function (o) {
    return temaAtivo === "todas" || (temaAtivo === "estudos" ? ehEstudo(o) : o.tema === temaAtivo);
  };

  /* ---------- totais e textos dinâmicos ---------- */
  $$("[data-total]").forEach(function (el) { el.textContent = obras.length; });
  $$("[data-total-temas]").forEach(function (el) { el.textContent = Object.keys(temas).length; });
  $$("[data-num-de]").forEach(function (el) {
    var i = posicao.get(el.getAttribute("data-num-de"));
    if (i != null) el.textContent = "Nº " + pad(i + 1);
  });
  $$("[data-cidade]").forEach(function (el) {
    if (config.cidade) el.textContent = el.textContent.replace("{cidade}", config.cidade);
    else el.hidden = true;
  });

  /* ---------- claro / escuro ---------- */
  var raiz = document.documentElement;
  try {
    var salvo = localStorage.getItem("ivana-tema");
    if (salvo === "dark" || salvo === "light") raiz.setAttribute("data-theme", salvo);
  } catch (e) {}
  var botaoTema = $(".tema-btn");
  if (botaoTema) {
    botaoTema.addEventListener("click", function () {
      var atual = raiz.getAttribute("data-theme");
      var escuro = atual === "dark" || (!atual && window.matchMedia("(prefers-color-scheme: dark)").matches);
      var novo = escuro ? "light" : "dark";
      raiz.setAttribute("data-theme", novo);
      try { localStorage.setItem("ivana-tema", novo); } catch (e) {}
    });
  }

  /* ---------- revelar ao rolar ---------- */
  var io = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(function (entradas) {
      var vistos = entradas
        .filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
      vistos.forEach(function (e, i) {
        e.target.style.transitionDelay = reduzMovimento ? "0ms" : Math.min(i, 6) * 80 + "ms";
        e.target.classList.add("visivel");
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
  }
  function observar() {
    var alvos = $$(".obra:not(.oculta):not(.visivel), .reveal:not(.visivel)");
    if (!io) { alvos.forEach(function (el) { el.classList.add("visivel"); }); return; }
    alvos.forEach(function (el) { io.observe(el); });
  }

  /* ---------- parede de quadros ---------- */
  var parede = $("#parede");
  var figuras = []; // os <figure> de todas as obras, na ordem do catálogo
  if (parede) {
    obras.forEach(function (o, i) {
      var fig = document.createElement("figure");
      fig.className = "obra" + (i % 3 === 1 ? " obra--menor" : i % 7 === 3 ? " obra--media" : "");
      fig.setAttribute("data-id", o.id);
      fig.setAttribute("data-tema", o.tema);
      fig.style.setProperty("--ar", o.w + " / " + o.h);
      fig.innerHTML =
        '<button class="moldura" type="button" data-abrir="' + esc(o.id) + '" aria-label="Ampliar ' + esc(o.titulo) + '">' +
          '<img loading="lazy" decoding="async"' +
          ' src="' + caminho(o, "miniaturas") + '"' +
          ' srcset="' + caminho(o, "miniaturas") + ' 720w, ' + caminho(o, "obras") + ' ' + o.w + 'w"' +
          ' sizes="(min-width: 1000px) 30vw, (min-width: 560px) 46vw, 92vw"' +
          ' width="' + o.w + '" height="' + o.h + '" alt="' + esc(o.titulo) + '">' +
          (ehEstudo(o) ? '<span class="etiqueta" title="' + esc(NOTA_ESTUDO) + '">Estudo</span>' : "") +
        "</button>" +
        '<figcaption><span class="num">Nº ' + pad(i + 1) + '</span>' +
          '<em class="obra-titulo">' + esc(o.titulo) + "</em>" +
          '<span class="obra-tema">' + esc(temas[o.tema] || o.tema) + (ehEstudo(o) ? ' · <b class="selo">Estudo</b>' : "") + "</span>" +
          (situacao(o) ? '<span class="obra-preco obra-preco--status">' + esc(situacao(o)) + "</span>"
            : o.preco && !ehEstudo(o) ? '<span class="obra-preco">' + precoDe(o) + "</span>" : "") +
        "</figcaption>";
      figuras.push(fig);
    });
  }
  // Distribui as obras em colunas, sempre na coluna mais curta, para a ordem
  // de leitura seguir da esquerda para a direita (colunas CSS leriam de cima para baixo).
  function numColunas() {
    if (!parede) return 1;
    var g = getComputedStyle(parede).gridTemplateColumns;
    return g && g !== "none" ? g.trim().split(/\s+/).length : 1;
  }
  var colunasAtuais = 0;
  function distribuir() {
    if (!parede) return;
    var n = numColunas();
    colunasAtuais = n;
    var cols = [], alturas = [];
    parede.textContent = "";
    for (var c = 0; c < n; c++) {
      var d = document.createElement("div");
      d.className = "coluna";
      cols.push(d); alturas.push(0); parede.appendChild(d);
    }
    figuras.forEach(function (f) {
      if (f.classList.contains("oculta")) return;
      var k = alturas.indexOf(Math.min.apply(null, alturas));
      var o = obras[posicao.get(f.getAttribute("data-id"))];
      var fator = f.classList.contains("obra--menor") ? 0.88 : f.classList.contains("obra--media") ? 0.92 : 1;
      cols[k].appendChild(f);
      alturas[k] += (o.h / o.w) * fator + 0.3; // 0.3 = legenda e respiro
    });
  }
  var esperaRedim = null;
  window.addEventListener("resize", function () {
    clearTimeout(esperaRedim);
    esperaRedim = setTimeout(function () { if (numColunas() !== colunasAtuais) distribuir(); }, 150);
  });

  /* ---------- filtros por tema ---------- */
  var filtros = $(".filtros");
  var contagem = $(".contagem");
  var temaAtivo = "todas";
  var quantos = function (k) {
    if (k === "todas") return obras.length;
    if (k === "estudos") return obras.filter(ehEstudo).length;
    return obras.filter(function (o) { return o.tema === k; }).length;
  };
  function botaoFiltro(chave, rotulo) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "filtro";
    b.setAttribute("data-tema", chave);
    b.setAttribute("aria-pressed", String(chave === temaAtivo));
    b.innerHTML = esc(rotulo) + "<sup>" + quantos(chave) + "</sup>";
    return b;
  }
  if (filtros) {
    filtros.appendChild(botaoFiltro("todas", "Todas"));
    Object.keys(temas).forEach(function (k) { filtros.appendChild(botaoFiltro(k, temas[k])); });
    if (obras.some(ehEstudo)) filtros.appendChild(botaoFiltro("estudos", "Estudos"));
    filtros.addEventListener("click", function (ev) {
      var b = ev.target.closest(".filtro");
      if (!b) return;
      temaAtivo = b.getAttribute("data-tema");
      $$(".filtro", filtros).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      aplicarFiltro(true);
    });
  }
  function aplicarFiltro(rolar) {
    var n = 0;
    figuras.forEach(function (f) {
      var ok = bate(obras[posicao.get(f.getAttribute("data-id"))]);
      f.classList.toggle("oculta", !ok);
      if (ok) { n++; f.classList.remove("visivel"); f.style.transitionDelay = "0ms"; }
    });
    distribuir();
    if (contagem) {
      contagem.textContent = temaAtivo === "todas"
        ? n + " obras, na ordem do catálogo"
        : temaAtivo === "estudos"
          ? n + (n === 1 ? " estudo" : " estudos") + " · cópias feitas para aprender, a partir de obras de outros artistas"
          : n + (n === 1 ? " obra" : " obras") + " · " + (temas[temaAtivo] || "");
    }
    if (rolar) {
      var topo = $("#obras");
      if (topo) {
        var y = topo.getBoundingClientRect().top + window.scrollY - 64;
        if (window.scrollY > y) window.scrollTo({ top: y, behavior: reduzMovimento ? "auto" : "smooth" });
      }
    }
    requestAnimationFrame(observar);
  }
  var listaAtiva = function () { return obras.filter(bate); };

  /* ---------- obra ampliada ---------- */
  var luz = $("#luz");
  var luzImg = $("#luz-img"), luzNum = $("#luz-num"), luzTitulo = $("#luz-titulo"),
      luzMeta = $("#luz-meta"), luzPedir = $("#luz-pedir"), luzNota = $("#luz-nota"), luzPreco = $("#luz-preco");
  var atual = null, abridor = null;
  var mensagem = function (o) {
    return 'Olá, Ivana! Vi o quadro "' + o.titulo + '" (nº ' + pad(posicao.get(o.id) + 1) + ") no seu site e queria saber mais.";
  };
  function preparar(o) {
    var i = posicao.get(o.id);
    luzImg.classList.remove("pronta");
    var nova = new Image();
    nova.onload = function () {
      if (atual !== o.id) return;
      luzImg.src = nova.src;
      luzImg.alt = o.titulo;
      requestAnimationFrame(function () { luzImg.classList.add("pronta"); });
    };
    nova.src = caminho(o, "obras");
    luzNum.textContent = "Nº " + pad(i + 1) + " de " + obras.length;
    luzTitulo.textContent = o.titulo;
    var partes = [temas[o.tema] || o.tema];
    if (ehEstudo(o)) partes.push(textoEstudo(o));
    partes.push(o.ano, o.tecnica, o.medidas);
    luzMeta.textContent = partes.filter(Boolean).join("  ·  ");
    if (luzNota) { luzNota.textContent = NOTA_ESTUDO; luzNota.hidden = !ehEstudo(o); }
    if (luzPreco) {
      luzPreco.hidden = ehEstudo(o);
      luzPreco.textContent = situacao(o) ? situacao(o) + (o.status === "acervo" ? " · não está à venda" : "") : o.preco ? precoDe(o) : "Preço sob consulta";
      luzPreco.classList.toggle("luz-preco--consulta", !!situacao(o) || !o.preco);
    }
    if (config.whatsapp) {
      luzPedir.href = "https://wa.me/" + config.whatsapp + "?text=" + encodeURIComponent(mensagem(o));
      luzPedir.hidden = false;
    } else if (config.email) {
      luzPedir.href = "mailto:" + config.email + "?subject=" + encodeURIComponent("Quadro: " + o.titulo) +
        "&body=" + encodeURIComponent(mensagem(o));
      luzPedir.hidden = false;
    } else {
      luzPedir.hidden = true;
    }
    // pré-carrega a anterior e a próxima
    var l = listaAtiva();
    var k = l.findIndex(function (x) { return x.id === o.id; });
    if (k >= 0 && l.length > 1) {
      [l[(k + 1) % l.length], l[(k - 1 + l.length) % l.length]].forEach(function (v) {
        var im = new Image(); im.src = caminho(v, "obras");
      });
    }
  }
  function abrir(id, origem) {
    var i = posicao.get(id);
    if (i == null || !luz) return;
    var o = obras[i];
    atual = o.id;
    if (origem) abridor = origem;
    preparar(o);
    if (!luz.open) {
      if (typeof luz.showModal === "function") luz.showModal();
      else luz.setAttribute("open", "");
    }
    history.replaceState(null, "", "#obra-" + o.id);
  }
  function passo(d) {
    var l = listaAtiva();
    if (!l.length) return;
    var k = l.findIndex(function (x) { return x.id === atual; });
    if (k < 0) k = 0;
    var o = l[(k + d + l.length) % l.length];
    atual = o.id;
    preparar(o);
    history.replaceState(null, "", "#obra-" + o.id);
  }
  function fechar() { if (luz && luz.open) luz.close(); }
  if (luz) {
    luz.addEventListener("close", function () {
      history.replaceState(null, "", location.pathname + location.search);
      luzImg.classList.remove("pronta");
      luzImg.removeAttribute("src");
      atual = null;
      if (abridor && abridor.focus) abridor.focus();
      abridor = null;
    });
    luz.addEventListener("click", function (ev) {
      if (ev.target === luz || ev.target.classList.contains("luz-palco")) fechar();
    });
    $("[data-fechar]", luz).addEventListener("click", fechar);
    $("[data-ant]", luz).addEventListener("click", function () { passo(-1); });
    $("[data-prox]", luz).addEventListener("click", function () { passo(1); });
    document.addEventListener("keydown", function (ev) {
      if (!luz.open) return;
      if (ev.key === "ArrowRight") passo(1);
      else if (ev.key === "ArrowLeft") passo(-1);
    });
    var x0 = null;
    luz.addEventListener("touchstart", function (ev) { x0 = ev.touches[0].clientX; }, { passive: true });
    luz.addEventListener("touchend", function (ev) {
      if (x0 == null) return;
      var dx = ev.changedTouches[0].clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 48) passo(dx < 0 ? 1 : -1);
    });
  }
  document.addEventListener("click", function (ev) {
    var b = ev.target.closest("[data-abrir]");
    if (b) abrir(b.getAttribute("data-abrir"), b);
  });

  /* ---------- contatos ---------- */
  var acoes = $("[data-contatos]");
  if (acoes) {
    var b = [];
    if (config.whatsapp) {
      b.push('<a class="botao" target="_blank" rel="noopener" href="https://wa.me/' + esc(config.whatsapp) +
        "?text=" + encodeURIComponent("Olá, Ivana! Vi seus quadros no site.") + '">WhatsApp</a>');
    }
    if (config.email) b.push('<a class="botao botao-claro" href="mailto:' + esc(config.email) + '">E-mail</a>');
    if (config.instagram) {
      b.push('<a class="botao botao-claro" target="_blank" rel="noopener" href="https://instagram.com/' + esc(config.instagram) + '">Instagram</a>');
    }
    acoes.innerHTML = b.length ? b.join("") : '<p class="contato-vazio">Os contatos da Ivana entram aqui em breve.</p>';
  }

  /* ---------- botão flutuante do WhatsApp ---------- */
  var zap = $("[data-zap]");
  if (zap && config.whatsapp) {
    zap.href = "https://wa.me/" + config.whatsapp + "?text=" + encodeURIComponent("Olá, Ivana! Vi seus quadros no site.");
    zap.hidden = false;
  }

  /* ---------- começa ---------- */
  aplicarFiltro(false);
  function abrirPeloHash() {
    var m = location.hash.match(/^#obra-(\d+)$/);
    if (m && posicao.has(m[1])) abrir(m[1], null);
  }
  abrirPeloHash();
  window.addEventListener("hashchange", abrirPeloHash);
})();
