# 修复不带 zs 前缀的 Vue 标签闭合
在 苏州市房地产监测V3 项目中，不带 `zs` 前缀的闭合标签 `</el-input>` 和 `</el-button-group>` 导致了 Vite 编译错误，已修正为 `</zs-input>` 和 `</zs-button-group>`。

## 描述
- Vite 编译错误，因为使用了 EL 标签而不是 zs 组件
- 影响了 `contractRevoke/detail.vue` 第 207 行和 `saleAgencyDialog.vue` 第 38 行

## 解决方案
- 在 contractRevoke/detail.vue 中将 `</el-input>` 改为 `</zs-input>`
- 在 saleAgencyDialog.vue 中将 `</el-button-group>` 改为 `</zs-button-group>`
- 对目录 `commercialHousingSales` 和 `contract` 的扫描已通过，dev server 正常编译

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：c7884ca9-0f78-4e4e-9359-8fa478960362
- 验证证据: src=苏州市房地产监测V3/232.md
- 涉及文件: d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/commercialHousingSales/presale/contractRevoke/detail.vue; d:/repository/苏州市房地产监测V3/zhi2-web-admin/src/views/contract/dialogs/saleAgencyDialog.vue
- 源会话: c7884ca9-0f78-4e4e-9359-8fa478960362; 基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_closing_tags",
  "source_extraction_id": "ed4340c4032043b1baf185a8b9851f9f",
  "version": 1,
  "memory_type": "entities"
}
-->