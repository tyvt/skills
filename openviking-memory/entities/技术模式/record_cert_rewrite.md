# Reescrita do diálogo de certificado de registro com imagem de fundo
No projeto 苏州市房地产监测V3, `RecordCertificateDialog.vue` foi reescrito conforme design, removendo tabela antiga e usando estilo de certificado com imagem de fundo A4 horizontal.

## 问题根因
- `RecordCertificateDialog.vue` original usava layout de tabela antiga e lógica de dicionário `company_certificate_level` com tabela de corretores, fora do design

## 解决方案
- Reescrever `RecordCertificateDialog.vue` com estilo de certificado de imagem de fundo A4 horizontal
- Remover layout de tabela antiga, lógica `company_certificate_level` e tabela de corretores
- Mapear campos `recordTermEnd` e `recordTime` formatados como `YYYY年MM月DD日`
- Órgão de registro fixo como 苏州市住房和城乡建设局

## Verificação e afiliação
- 验证证据: src=苏州市房地产监测V3-leftover/004.md
- 涉及文件: RecordCertificateDialog.vue, institution/record/index.vue, api/company/companyApply.js, companyApplyAudit/detail.vue, 前端技术信息.md
- 所属项目: 苏州市房地产监测V3; Sessão: c0e6e780-7c64-4045-ac06-51b5d3a2354a; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "record_cert_rewrite",
  "source_extraction_id": "f2d584df3e2d406aa5752d9d6b7f9f3f",
  "version": 2,
  "memory_type": "entities"
}
-->