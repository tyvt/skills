# Summary
Em 2026-11-02, o usuário documentou a correção de validação de formato de telefone ausente no arquivo guaranteeDepositAgreement/detail.vue. As validações de contactPhone e propertyContactPhone tinham apenas obrigatoriedade, faltando formato. Foi adicionado regex global patterns.contactPhone para validar celular, fixo e números de 8 dígitos. Arquivos envolvidos: d:/repository/榆林G/zhi2-web-admin/src/views/maintenance/guaranteeDepositAgreement/detail.vue, d:/repository/榆林G/zhi2-web-admin/src/views/company/companyManagement/components/detail.vue, d:/repository/榆林G/zhi2-web-admin/src/patterns/index.js, d:/repository/榆林G/zhi2-web-admin/src/mixins/detailMixins.js. Origem: sessão cursor ea514d30-3de8-4e8a-beb7-f0690c0e8a2b.
# 2026-11-02 (Monday) ChatLog:
**user**: 【记忆类型】bug
【标题】保证金协议物业开发电话缺格式校验
【内容】根因：`guaranteeDepositAgreement/detail.vue`中`contactPhone`与`propertyContactPhone`仅配必填校验，缺失格式校验。修复：补充全局`patterns.contactPhone`正则`/^((0\d{2,3}-\d{7,8})|(\d{8})|(1[3|4|5|6|7|8|9][0-9]\d{8}))$/`校验手机、座机及8位号码。
【验证证据】extracted source=cursor session=ea514d30-3de8-4e8a-beb7-f0690c0e8a2b
【涉及文件】d:/repository/榆林G/zhi2-web-admin/src/views/maintenance/guaranteeDepositAgreement/detail.vue ; d:/repository/榆林G/zhi2-web-admin/src/views/company/companyManagement/components/detail.vue ; d:/repository/榆林G/zhi2-web-admin/src/patterns/index.js ; d:/repository/榆林G/zhi2-web-admin/src/mixins/detailMixins.js ; guaranteeDepositAgreement/detail.vue
【来源会话ID】ea514d30-3de8-4e8a-beb7-f0690c0e8a2b

<!-- MEMORY_FIELDS
{
  "event_name": "Correção de validação de telefone",
  "goal": "Registrar correção de falha",
  "summary": "Em 2026-11-02, o usuário documentou a correção de validação de formato de telefone ausente no arquivo guaranteeDepositAgreement/detail.vue. As validações de contactPhone e propertyContactPhone tinham apenas obrigatoriedade, faltando formato. Foi adicionado regex global patterns.contactPhone para validar celular, fixo e números de 8 dígitos. Arquivos envolvidos: d:/repository/榆林G/zhi2-web-admin/src/views/maintenance/guaranteeDepositAgreement/detail.vue, d:/repository/榆林G/zhi2-web-admin/src/views/company/companyManagement/components/detail.vue, d:/repository/榆林G/zhi2-web-admin/src/patterns/index.js, d:/repository/榆林G/zhi2-web-admin/src/mixins/detailMixins.js. Origem: sessão cursor ea514d30-3de8-4e8a-beb7-f0690c0e8a2b.",
  "ranges": "0-4",
  "source_extraction_id": "ebd72c614ecf41f9ba8d70d6d434c474",
  "version": 1,
  "memory_type": "events"
}
-->