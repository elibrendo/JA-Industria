// JA Indústria — menu do celular, animações de entrada e carrossel
  // menu do celular
  const botao = document.querySelector('.abrir-menu');
  const menu = document.getElementById('menu');
  botao.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    botao.setAttribute('aria-expanded', aberto);
  });

  // submenu de Produtos: no computador abre pelo CSS (hover); no celular, ao tocar
  const itemSub = document.querySelector('.item-sub');
  const linkProdutos = itemSub.querySelector(':scope > a');
  const celular = window.matchMedia('(max-width: 980px)');
  linkProdutos.addEventListener('click', (e) => {
    if (!celular.matches) return;
    e.preventDefault();
    linkProdutos.setAttribute('aria-expanded', itemSub.classList.toggle('aberto'));
  });

  // ao escolher um link, o menu do celular fecha
  menu.addEventListener('click', (e) => {
    if (!e.target.closest('a') || e.defaultPrevented) return;
    menu.classList.remove('aberto');
    botao.setAttribute('aria-expanded', false);
  });

  // o banner também entra em sequência
  document.querySelectorAll('.conteudo > *, .selo').forEach((el, i) => {
    el.classList.add('revela'); el.style.setProperty('--d', (0.15 + i * 0.1) + 's');
  });

  // animação de entrada: tudo com a classe "revela" aparece ao rolar até ele
  const observador = new IntersectionObserver((itens) => {
    itens.forEach((item) => {
      if (item.isIntersecting) { item.target.classList.add('visivel'); observador.unobserve(item.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.revela').forEach((el) => observador.observe(el));

  // carrossel
  const slides = [...document.querySelectorAll('.slide')];
  const pontos = [...document.querySelectorAll('.pontos span')];
  let atual = 0, timer;
  function mostra(i){
    atual = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle('ativo', n === atual));
    pontos.forEach((p, n) => p.classList.toggle('on', n === atual));
  }
  function automatico(){ clearInterval(timer); timer = setInterval(() => mostra(atual + 1), 6000); }
  document.querySelector('.prox').addEventListener('click', () => { mostra(atual + 1); automatico(); });
  document.querySelector('.ant').addEventListener('click', () => { mostra(atual - 1); automatico(); });
  automatico();

  // cartões de produto: o último sob o mouse (ou com foco) fica aberto
  const cartoes = [...document.querySelectorAll('.prod')];
  function ativa(cartao){ cartoes.forEach((c) => c.classList.toggle('ativo', c === cartao)); }
  cartoes.forEach((c) => {
    c.addEventListener('mouseenter', () => ativa(c));
    c.addEventListener('focusin', () => ativa(c));
    c.addEventListener('click', () => ativa(c));
  });
  // links do submenu e do contato (#produto-...) abrem o cartão correspondente
  function ativaPeloEndereco(){
    const alvo = location.hash && document.querySelector('.prod' + location.hash);
    if (alvo) ativa(alvo);
  }
  window.addEventListener('hashchange', ativaPeloEndereco);
  ativaPeloEndereco();

  // números do contato contam do zero ao aparecer
  const calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const contador = new IntersectionObserver((itens) => {
    itens.forEach((item) => {
      if (!item.isIntersecting) return;
      contador.unobserve(item.target);
      const el = item.target, fim = +el.dataset.conta, antes = el.dataset.antes || '', depois = el.dataset.depois || '';
      const inicio = fim > 1000 && fim < 2100 ? fim - 60 : 0; // anos contam só os últimos passos
      const t0 = performance.now(), dura = 1800;
      (function passo(t){
        const p = Math.min(1, (t - t0) / dura), suave = 1 - Math.pow(1 - p, 3);
        el.textContent = antes + Math.round(inicio + (fim - inicio) * suave) + depois;
        if (p < 1) requestAnimationFrame(passo);
      })(t0);
    });
  }, { threshold: 0.6 });
  if (!calmo) document.querySelectorAll('[data-conta]').forEach((el) => contador.observe(el));

  // água nas seções azuis: as ondas correm com a rolagem e balançam conforme a velocidade
  (function(){
    const telas = [...document.querySelectorAll('.agua')];
    if (!telas.length) return;
    const css = getComputedStyle(document.documentElement);
    const rgb = (nome) => { const h = css.getPropertyValue(nome).trim().slice(1); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(','); };
    const claro = rgb('--azul-claro'), escuro = rgb('--azul-escuro');
    // altura relativa, amplitude, comprimento de onda e velocidade de cada camada
    const camadas = [
      { y: .14, a: 14, k: 1.6, v: 1 },
      { y: .40, a: 18, k: 1.1, v: -.7 },
      { y: .66, a: 22, k: .8, v: .5 },
      { y: .88, a: 16, k: 1.3, v: -.4 }
    ];
    const visiveis = new Set();
    let ultimoY = scrollY, balanco = 0, velBalanco = 0, rodando = false;

    function ajusta(c){
      const dpr = Math.min(devicePixelRatio || 1, 2);
      c.width = c.clientWidth * dpr; c.height = c.clientHeight * dpr;
      c.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function desenha(c, t){
      const ctx = c.getContext('2d'), w = c.clientWidth, h = c.clientHeight;
      const fase = t * .0005 + scrollY * .004;
      const amp = 1 + Math.min(Math.abs(balanco) / 12, 2.5);
      ctx.clearRect(0, 0, w, h);
      camadas.forEach((cam, n) => {
        const onda = (x) => cam.y * h
          + cam.a * amp * (Math.sin(x / w * Math.PI * 2 * cam.k + fase * cam.v + n) + .45 * Math.sin(x / w * Math.PI * 5 * cam.k - fase * cam.v * 1.7))
          + balanco * (x / w - .5) * (n % 2 ? -1 : 1);
        ctx.beginPath();
        for (let x = 0; x <= w + 8; x += 8) ctx.lineTo(x, onda(x));
        ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
        ctx.fillStyle = `rgba(${escuro},.13)`; ctx.fill();
        ctx.beginPath();
        for (let x = 0; x <= w + 8; x += 8) ctx.lineTo(x, onda(x));
        ctx.strokeStyle = `rgba(${claro},.14)`; ctx.lineWidth = 1.5; ctx.stroke();
      });
    }
    function quadro(t){
      // mola: a velocidade da rolagem empurra a água, que oscila até se acalmar
      const dy = scrollY - ultimoY; ultimoY = scrollY;
      velBalanco += (Math.max(-60, Math.min(60, dy * 1.2)) - balanco) * .06;
      velBalanco *= .9; balanco += velBalanco;
      visiveis.forEach((c) => desenha(c, t));
      if (visiveis.size) requestAnimationFrame(quadro); else rodando = false;
    }

    telas.forEach(ajusta);
    addEventListener('resize', () => telas.forEach((c) => { ajusta(c); desenha(c, performance.now()); }));
    if (calmo) { telas.forEach((c) => desenha(c, 0)); return; }
    // só anima enquanto a seção está na tela
    const vigia = new IntersectionObserver((itens) => {
      itens.forEach((item) => item.isIntersecting ? visiveis.add(item.target) : visiveis.delete(item.target));
      if (visiveis.size && !rodando) { rodando = true; ultimoY = scrollY; requestAnimationFrame(quadro); }
    });
    telas.forEach((c) => vigia.observe(c));
  })();
