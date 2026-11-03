# 电子签状态移出基本信息区按钮依赖signState
苏州市房地产监测V3 中预售许可证基本信息区移除「电子签状态」，但 `detail.vue` 仍用 `signState` 控制按钮。

## 变更内容
- `buildPermitBasicInfoView` 查看与编辑态字段顺序对齐（预售描述置于有效期后）
- `infoView` 对 `form`/`presaleArea` 响应式依赖正确
- 查看态仍无总幢数/总户数，基本信息区移除「电子签状态」

## 遗留问题
- `detail.vue` 仍用 `signState` 控制按钮，审核只读场景签章进度需另处补展示
- `PermitInfoPanel.vue` 仅有 `el-form-item`→`zs-form-item` 惯例 warning
- 全量 `npm run lint` 因仓库既有报错失败

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/154.md
- 涉及文件：presale/permit/permitConstants.js、presale/permit/components/PermitInfoPanel.vue、components/detail-template/detail-template.vue、presale/permit/detail.vue、presale/permit/accept/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：9e684438-f355-4543-99b7-09b123b9464c；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_signstate_fact",
  "source_extraction_id": "c0498ba19aef4c5095e6c258c82f91ce",
  "version": 1,
  "memory_type": "entities"
}
-->