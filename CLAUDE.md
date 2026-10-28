# Site JA Indústria

Site institucional da **JA Indústria Ltda.**, fabricante de reservatórios metálicos (fundada em 10/10/1997, presente em Minas Gerais e São Paulo).

## Estrutura

```
index.html            página inicial
css/style.css         todos os estilos
js/main.js            menu do celular, animações de entrada e interações das seções
assets/img/           logo, fotos e capa do vídeo (clientes/ = logos dos clientes)
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
| `--azul-medio`   | `#2F5BC4` | destaques sobre fundo claro           |
| `--gelo`         | `#F3F5FA` | fundo das seções claras (Diferenciais) |
| `--tinta`        | `#16234A` | títulos sobre fundo claro             |
| `--cinza`        | `#5B6684` | texto corrido sobre fundo claro       |

Fontes (Google Fonts): **Barlow Condensed** nos títulos e botões, **Barlow** no texto, **Lora itálico** em slogans e citações.

Sempre use as variáveis de `:root` em `css/style.css`, nunca cores soltas.

## Padrões

- Todo o texto é em português do Brasil.
- Animação de entrada: adicione a classe `revela` (e opcionalmente `da-esquerda` / `da-direita`) a um elemento; o atraso vai em `style="--d:.2s"`. O `js/main.js` ativa ao rolar.
- Cada seção tem um `<section>` com um contêiner interno `max-width: var(--largura)` e padding lateral de 24px.
- Precisa funcionar no celular (testar em ~390px de largura).
- Imagens novas vão em `assets/img/`, com `alt` descritivo.

## Seções prontas

1. Cabeçalho fixo (logo + menu com submenu de Produtos ao passar o mouse + telefone)
2. Banner com vídeo de fundo ("Indústria de confiança")
3. História & Trajetória (texto + vídeo institucional do YouTube)
4. Resultados (+7000 projetos entregues)
5. Diferenciais ("Por que escolher a JA", fundo claro)
6. Produtos (5 cartões que se expandem + ficha técnica, `#servicos`)
7. Clientes (duas faixas de logos rolando)
8. Contato + rodapé

## Próximos passos

- Páginas internas (Sobre, Produtos, Contato)
