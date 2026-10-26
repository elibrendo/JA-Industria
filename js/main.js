// JA Indústria — menu do celular, animações de entrada e carrossel
  // menu do celular
  const botao = document.querySelector('.abrir-menu');
  const menu = document.getElementById('menu');
  botao.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    botao.setAttribute('aria-expanded', aberto);
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
