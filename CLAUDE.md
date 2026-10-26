# Site JA Indústria

Site institucional da **JA Indústria Ltda.**, fabricante de reservatórios metálicos (fundada em 10/10/1997, presente em Minas Gerais e São Paulo).

## Estrutura

```
index.html            página inicial
css/style.css         todos os estilos
js/main.js            menu do celular, animações de entrada e carrossel
assets/img/           logo, fotos e capa do vídeo
assets/video/         vídeo de fundo do banner (MP4 H.264, sem áudio)
```

Site estático: HTML, CSS e JavaScript puros, sem framework e sem build.

## Identidade visual

| Token CSS        | Cor       | Uso                                   |
|------------------|-----------|---------------------------------------|
| `--azul`         | `#1E305E` | azul da logo, cabeçalho, seção História |
| `--azul-escuro`  | `#121D3B` | fundo do banner e da seção Resultados |
| `--azul-claro`   | `#8FB3FF` | destaques, linhas, ícones             |
| `--branco`       | `#FFFFFF` | títulos e botão principal             |
| `--texto-suave`  | `#C6CDE0` | textos corridos                       |

Fontes (Google Fonts): **Barlow Condensed** nos títulos e botões, **Barlow** no texto, **Lora itálico** em slogans e citações.

Sempre use as variáveis de `:root` em `css/style.css`, nunca cores soltas.

## Padrões

- Todo o texto é em português do Brasil.
- Animação de entrada: adicione a classe `revela` (e opcionalmente `da-esquerda` / `da-direita`) a um elemento; o atraso vai em `style="--d:.2s"`. O `js/main.js` ativa ao rolar.
- Cada seção tem um `<section>` com um contêiner interno `max-width: var(--largura)` e padding lateral de 24px.
- Precisa funcionar no celular (testar em ~390px de largura).
- Imagens novas vão em `assets/img/`, com `alt` descritivo.

## Seções prontas

1. Cabeçalho fixo (logo + menu + "Solicitar orçamento")
2. Banner com vídeo de fundo ("Indústria de confiança")
3. História & Trajetória (texto + carrossel com fundação, 30 anos e diretores)
4. Resultados (+7000 projetos entregues)

## Próximos passos

- Seção de produtos
- Contato / rodapé
- Páginas internas (Sobre, Produtos, Contato)
