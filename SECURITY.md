# Política de Segurança · NovaTerra

`by` **Synapse Code** · Global Solution FIAP 2026

---

## 📌 Contexto do Projeto

A **NovaTerra** é um **protótipo acadêmico de front-end** desenvolvido para a Global Solution da
FIAP 2026. É importante entender o escopo de segurança deste sistema:

- ✅ Aplicação **100% client-side** (React SPA) — não há backend em produção.
- ✅ **Todos os dados são mockados** (`src/data/mock.js`) — não há dados pessoais reais,
  credenciais de satélite, nem informações sensíveis trafegadas.
- ✅ **Nenhuma autenticação real** está implementada — botões de login/logout são ilustrativos.
- ✅ **Nenhuma chamada de API externa** é feita em runtime.

Mesmo sendo um protótipo, seguimos boas práticas de segurança como referência para uma futura
evolução do produto.

---

## 🔢 Versões Suportadas

| Versão | Suporte |
|--------|:-------:|
| 1.0.x  | ✅ |
| < 1.0  | ❌ |

---

## 🛡️ Reportando uma Vulnerabilidade

Encontrou um problema de segurança? Agradecemos a divulgação responsável.

1. **Não** abra uma *issue* pública descrevendo a falha.
2. Abra uma **Security Advisory** privada no GitHub:
   `Repositório → aba Security → Report a vulnerability`
3. Ou entre em contato diretamente com a equipe **Synapse Code**.

**Inclua no relato:**
- Descrição da vulnerabilidade e impacto potencial.
- Passos para reproduzir.
- Versão / commit afetado.
- Sugestão de correção (se houver).

**Prazo de resposta:** faremos o possível para responder em até **5 dias úteis**, dado o caráter
acadêmico do projeto.

---

## 🔐 Boas Práticas Adotadas

Mesmo como protótipo front-end, o projeto observa:

- **Sem segredos no código** — nenhuma chave de API, token ou credencial versionada.
- **Dependências enxutas** — apenas bibliotecas amplamente mantidas (React, Vite, Tailwind,
  Framer Motion, Lucide). Execute `npm audit` regularmente.
- **Conteúdo estático** — o build gera apenas HTML, CSS e JS estáticos, reduzindo a superfície
  de ataque.
- **Sanitização de HTML** — o uso de `dangerouslySetInnerHTML` está restrito à formatação de
  mensagens internas do chat, com conteúdo controlado e não proveniente de usuários externos.

---

## 🚀 Recomendações para Evolução em Produção

Caso a NovaTerra evolua para um produto com backend real, recomenda-se:

| Camada | Recomendação |
|--------|--------------|
| **Autenticação** | OAuth 2.0 / OIDC, MFA, tokens JWT com expiração curta |
| **Senhas** | Hash com `bcrypt`/`argon2` (já previsto no campo `senha_hash`) |
| **Transporte** | HTTPS obrigatório (HSTS), TLS 1.2+ |
| **Banco de Dados** | Princípio do menor privilégio, prepared statements, criptografia em repouso |
| **APIs de Satélite** | Chaves em variáveis de ambiente / secret manager, nunca no client |
| **Headers** | CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy |
| **LGPD** | Consentimento, minimização de dados e direito ao esquecimento para dados de usuários |
| **Rate Limiting** | Proteção contra abuso nas APIs e no chatbot |
| **Logs & Auditoria** | Registro de acessos e ações sensíveis |

---

## 📦 Dependências

Para verificar vulnerabilidades conhecidas nas dependências:

```bash
npm audit
npm audit fix
```

Mantenha as dependências atualizadas com `npm outdated`.

---

<div align="center">

**NovaTerra** · Inteligência Orbital para o Planeta
`© 2026 Synapse Code · FIAP Global Solution`

</div>
