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
