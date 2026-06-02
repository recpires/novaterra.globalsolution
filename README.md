<div align="center">

<img src="public/novaterra-logo.png" alt="NovaTerra" width="180" />

# NovaTerra

### Inteligência Orbital para o Planeta

Plataforma web que conecta dados de satélites da **NASA, ESA e INPE** a uma engine de
**Inteligência Artificial** para monitoramento ambiental, agrícola e de desastres em tempo real.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-43A047)](LICENSE)

**Global Solution · FIAP · 2026**

`by` **Synapse Code**

</div>

---

## 📑 Índice

- [Visão Geral](#-visão-geral)
- [O Problema](#-o-problema)
- [Os Três Módulos](#-os-três-módulos)
- [Telas do Sistema](#-telas-do-sistema)
- [Inteligência Artificial](#-inteligência-artificial)
- [Fontes de Dados Satelitais](#-fontes-de-dados-satelitais)
- [Modelo de Dados](#-modelo-de-dados)
- [Stack Tecnológica](#-stack-tecnológica)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar](#-como-executar)
- [Deploy](#-deploy)
- [Equipe](#-equipe)
- [Licença](#-licença)

---

## 🌍 Visão Geral

A **NovaTerra** é uma plataforma de *Inteligência Orbital* que democratiza o acesso a dados
satelitais. Hoje, imagens e telemetria da NASA, ESA e INPE existem e são públicas — mas estão
**fragmentadas e inacessíveis** para quem mais precisa: agricultores, Defesa Civil e empresas.

A NovaTerra unifica essas fontes, processa-as com modelos de Machine Learning (CNN, LSTM, NLP e
K-Means) e entrega **insights acionáveis em tempo real** através de dashboards, alertas multi-canal
e um assistente conversacional inteligente.

> ⚠️ **Natureza do projeto:** Este repositório é um **protótipo acadêmico de alta fidelidade**
> desenvolvido para a Global Solution da FIAP 2026. Todos os dados exibidos são **mockados** para
> fins de demonstração — não há integração real com APIs de satélite nem backend em produção.

---

## 🔴 O Problema

| Indicador | Impacto |
|-----------|---------|
| **R$ 50 bilhões/ano** | Perdas agrícolas por falta de previsão adequada |
| **+700 mortes (5 anos)** | Vítimas de desastres naturais no Brasil |
| **11.000 km²/ano** | Área da Amazônia desmatada anualmente |

Os dados satelitais existem. O **acesso e a interpretação** em tempo real, não.

---

## 🛰️ Os Três Módulos

### 🌱 AgriSat — Monitoramento Agrícola
**Para:** Agricultores e cooperativas
- Índice NDVI (Normalized Difference Vegetation Index) por talhão
- Análise de umidade do solo por camada
- Previsão de pragas com modelos preditivos
- Recomendação de irrigação otimizada gerada por IA
- Alertas de estresse hídrico e histórico de safras

### 🛡️ SentinelAlert — Monitoramento de Riscos
**Para:** Defesa Civil, prefeituras e órgãos de segurança
- Detecção de queimadas (focos de calor), enchentes e deslizamentos
- Mapa de risco interativo com zonas por severidade
- Score de risco regional (0–100)
- Notificações multi-canal: SMS, e-mail e push
- Severidade: 🔴 Crítico · 🟠 Alto · 🟡 Médio · 🟢 Baixo

### 🌳 EcoTrack — Rastreamento Ambiental
**Para:** Empresas, órgãos ambientais e investidores ESG
- Detecção de desmatamento por comparação temporal de imagens
- Cálculo de emissões de CO₂ por área afetada
- Marketplace de créditos de carbono integrado
- Relatórios de conformidade ambiental e Score ESG

---

## 🖥️ Telas do Sistema

| Rota | Tela | Descrição |
|------|------|-----------|
| `/` | **Landing Page** | Apresentação completa com 11 seções (hero orbital, problema, módulos, IA, fontes, banco de dados, CTA) |
| `/login` | **Login** | Autenticação de acesso à plataforma (credenciais de demonstração) |
| `/dashboard` | **Dashboard** | KPIs, mapa do Brasil em tempo real, gráficos de 30 dias e distribuição por módulo |
| `/agrisat` | **AgriSat** | Lista de fazendas, escala NDVI, umidade por camada e recomendação da IA |
| `/sentinel` | **SentinelAlert** | Alertas com filtros por tipo, mapa de risco e painel de detalhes |
| `/ecotrack` | **EcoTrack** | Desmatamento, emissões de CO₂, comparativo orbital e marketplace de carbono |
| `/assistente` | **Nova (IA)** | Chat conversacional com a assistente "Nova" e ações rápidas |
| `/relatorios` | **Relatórios** | Listagem com busca, filtros por módulo e download |

🌗 **Modo claro e escuro** disponíveis em todas as telas do sistema (toggle no header).

---

## 🧠 Inteligência Artificial

| Tecnologia | Aplicação |
|------------|-----------|
| **CNN** (Rede Neural Convolucional) | Análise de imagens de satélite — detecta queimadas e desmatamento |
| **LSTM** (Long Short-Term Memory) | Séries temporais — prevê riscos climáticos e variações de safra |
| **NLP via API** | Chatbot "Nova" — interpreta linguagem natural |
| **K-Means** | Zoneamento — agrupa áreas por perfil de risco ambiental |

---

## 📡 Fontes de Dados Satelitais

| Agência | Satélite | Resolução | Revisita | Dados |
|---------|----------|-----------|----------|-------|
| **NASA** | MODIS | 250m – 1km | 1–2 dias | Temperatura, focos de calor, cobertura vegetal |
| **ESA** | Sentinel-2 | 10m – 60m | 5 dias | Imagens multiespectrais, NDVI, mudanças temporais |
| **INPE** | CBERS | 5m – 160m | 26 dias | Desmatamento Amazônia, Cerrado, queimadas |

> Atualização a cada ciclo orbital (~90 minutos).

---

## 🗄️ Modelo de Dados

Modelo relacional projetado para **PostgreSQL 16** com 8 tabelas:

```
organizacao (1) ──< usuario (1) ──< area_monitorada (1) ──< alerta
                                                      │
                                                      ├──< dado_satelital >── fonte_dados
                                                      └──< relatorio_agri
usuario (1) ──< interacao_ia
```

| Tabela | Função |
|--------|--------|
| `organizacao` | Empresas, cooperativas e órgãos |
| `usuario` | Usuários vinculados a uma organização |
| `fonte_dados` | Catálogo de fontes (NASA MODIS, ESA Sentinel-2, INPE CBERS) |
| `area_monitorada` | Fazendas, municípios, reservas e bacias |
| `dado_satelital` | Leituras de NDVI, umidade, temperatura, focos de calor |
| `alerta` | Eventos por tipo e severidade |
| `relatorio_agri` | Relatórios agrícolas gerados |
| `interacao_ia` | Histórico de conversas com a assistente Nova |

> O DDL completo está documentado no material de referência do projeto.

---

## 🧰 Stack Tecnológica

- **React 19** — biblioteca de UI
- **Vite 7** — build tool e dev server
- **React Router 7** — roteamento SPA
- **Tailwind CSS 3** — estilização utilitária
- **Framer Motion 12** — animações
- **Lucide React** — ícones
- **Gráficos** — SVG customizado (sem dependências externas de chart)

---

## 📂 Estrutura do Projeto

```
novaterra.globalsolution/
├── public/
│   └── novaterra-logo.png        # Logo (favicon, navbar, OG)
├── src/
│   ├── components/
│   │   ├── AppLayout.jsx         # Sidebar + Header do sistema
│   │   └── Charts.jsx            # LineChart, BarChart, Donut, NDVI, Gauge
│   ├── context/
│   │   └── ThemeContext.jsx      # Tema claro/escuro
│   ├── data/
│   │   └── mock.js               # Dados mockados para apresentação
│   ├── pages/
│   │   ├── NovaTerra.jsx         # Landing page
│   │   ├── Dashboard.jsx
│   │   ├── AgriSat.jsx
│   │   ├── SentinelAlert.jsx
│   │   ├── EcoTrack.jsx
│   │   ├── Assistente.jsx
│   │   └── Relatorios.jsx
│   ├── App.jsx                   # Rotas
│   ├── main.jsx                  # Entry point
│   ├── theme.js                  # Paletas dark/light
│   └── index.css                 # Estilos globais
├── index.html
├── tailwind.config.js
├── vite.config.js
├── vercel.json                   # Rewrite SPA
├── LICENSE
├── SECURITY.md
└── README.md
```

---

## 🚀 Como Executar

**Pré-requisitos:** Node.js 18+ e npm.

```bash
# 1. Clonar o repositório
git clone https://github.com/recpires/novaterra.globalsolution.git
cd novaterra.globalsolution

# 2. Instalar dependências
npm install

# 3. Rodar em modo desenvolvimento
npm run dev
# → http://localhost:5173

# 4. Build de produção
npm run build

# 5. Pré-visualizar o build
npm run preview
```

### 🔑 Credenciais de Acesso (demonstração)

A plataforma possui uma tela de login em `/login`. Use as credenciais de demonstração:

| Campo | Valor |
|-------|-------|
| **E-mail** | `admin@novaterra.com` |
| **Senha** | `nova2026` |

> A autenticação é **client-side mockada** (sem backend) — adequada apenas para a demonstração
> acadêmica. A própria tela de login exibe as credenciais e oferece um botão
> **"Preencher credenciais de demonstração"**.

---

## ☁️ Deploy

O projeto está pronto para deploy na **Vercel** (detecção automática de Vite):

1. Importe o repositório em [vercel.com/new](https://vercel.com/new)
2. Build Command: `npm run build` · Output: `dist`
3. Deploy 🚀

O arquivo [`vercel.json`](vercel.json) garante o rewrite de SPA, evitando erros 404 ao
recarregar rotas internas como `/dashboard`.

---

## 👥 Equipe

| Nome | RM |
|------|-----|
| Rodrigo Eufrasio Costa Pires | 570208 |
| Diego Felippe Scorsi Prado | 572712 |
| Jecika Lilia Cavalcante e Silva Saito | 568787 |

Desenvolvido com 💙 pela **Synapse Code** para a Global Solution FIAP 2026.

---

## 📄 Licença

Distribuído sob a licença **MIT**. Veja [`LICENSE`](LICENSE) para mais detalhes.

Para questões de segurança, consulte [`SECURITY.md`](SECURITY.md).

---

<div align="center">

**NovaTerra** · Inteligência Orbital para o Planeta
`© 2026 Synapse Code · FIAP Global Solution`

</div>
