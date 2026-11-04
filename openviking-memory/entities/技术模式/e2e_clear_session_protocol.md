
# Protocolo de limpeza de sessão E2E antes de limpar storage
Playwright cross-end clearBrowserSession em about:blank lança SecurityError ao acessar storage; precisa entrar em origin real primeiro.

## Sintomas
- Casos cross-end (03 troca empresa para admin) chamam clearBrowserSession e falham com SecurityError
- clearCookies funciona mas limpar storage quebra, fácil de confundir com problema de login ou permissão

## 问题根因
- No início do caso, page está em about:blank sem origin; page.evaluate acessa localStorage/sessionStorage e é bloqueado pela política de mesma origem
- clearCookies usa camada context, não depende de origin, por isso o comportamento é inconsistente

## 解决方案
- clearBrowserSession em 3 etapas: primeiro context().clearCookies(); depois page.evaluate detecta protocolo http/https (try/catch); se não atender, goto('/#/') para entrar na app; então limpar localStorage/sessionStorage
- A própria detecção deve ter catch para não quebrar antes
- Em e2e/fixtures/auth-helpers.js verifica protocolo; se não for http/https faz page.goto antes de limpar storage
- Textos de status do fluxo seguem o critério do usuário, não inferir

## Verificação e proveniência
- 验证证据: clearBrowserSession em about:blank limpando storage direto dispara SecurityError; solução com detecção canClearOnCurrentPage + goto antes de limpar
- 涉及文件: e2e/fixtures/auth-helpers.js, e2e/fixtures/company-helpers.js, e2e/fixtures/register-helpers.js, e2e/company/company-record-change.spec.js, src/views/company/companyManagement/components/CompanyBasicInfoDetail.vue, src/views/company/companyManagement/change/detail.vue, src/views/toB/change/detail.vue, src/views/toB/companyRecord/detail.vue, package.json
- 所属项目: 产品2.0; sessão: c24a0b77-252c-498f-8424-de964da60242; base de código: 62d5fb9


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_clear_session_protocol",
  "source_extraction_id": "4d80bcc2a01b4c9daeb3c9c060bc1073",
  "version": 2,
  "memory_type": "entities"
}
-->