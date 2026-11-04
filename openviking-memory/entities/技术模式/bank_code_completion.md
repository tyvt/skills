# Completar código bancário na pré-autenticação
A ausência de `regulatoryBankCode`/`bankCode` no retorno de `pageIsAgreement` causava falso aviso de área não selecionada antes da autenticação; a solução encadeia buscas com fallback.

## Problema
- `pageIsAgreement` normalmente retorna sem `regulatoryBankCode`/`bankCode`
- Verificação de nulo antes da autenticação exibia erro falso "请先选择物业管理区域" (selecione a área de gestão imobiliária)
- Arquivos afetados incluem benefit/pubExpenditureContract, property/expenditureContract, benefit/pubUseMoneyApply, benefit/pubBankReceiptApply, benefit/pubRevenueContract, benefit/pubRegulatoryAccount

## 解决方案
- Após selecionar área, completar código em cadeia: `pageIsAgreement`→lista de abertura de conta→detalhe de abertura→lista de bancos gestores
- Quando o código está ausente, usar fallback `payeeAccountBankCode`
- Mudar aviso para "未能获取银行编码…" (não foi possível obter o código bancário)

## 验证与归属
- Evidência extraída da sessão cursor e95efacc-3c6a-4c04-84ea-35202f15a58e
- 所属项目: 无锡锡山V2 (Wuxi Xishan V2); baseline de código: none
- 涉及文件: src/views/benefit/pubExpenditureContract/detail.vue, src/views/property/expenditureContract/detail.vue, src/views/benefit/pubUseMoneyApply/detail.vue, src/views/benefit/pubBankReceiptApply/detail.vue, src/views/benefit/pubRevenueContract/detail.vue, src/api/benefit/pubUseMoneyApply.js, src/views/benefit/pubRegulatoryAccount/index.vue, src/api/benefit/pubRegulatoryAccount.js

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bank_code_completion",
  "source_extraction_id": "611c800fb6ff447c8169b3716d89ec7d",
  "version": 1,
  "memory_type": "entities"
}
-->