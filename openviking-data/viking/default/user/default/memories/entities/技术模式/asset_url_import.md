# 模板resolveServerAssetUrl方法补全
剩余在模板使用 `resolveServerAssetUrl(...)` 未接入公共方法的页面已补全，并完成 `npm run build` 退出码0。

## 修改说明
- Vue2模板增加 `import { resolveServerAssetUrl } from '@/utils/resolveServerAssetUrl.js'`
- 在 `methods` 首项加入 `resolveServerAssetUrl`（或 `methods: { resolveServerAssetUrl }`）

## 涉及文件
- `home/index.vue`、`ForgotPassword.vue`
- `indemnity/houseNum.vue`、`indemnity/cardData.vue`
- `dataStatistics/iconDataCardNew.vue`
- `credit/home/index.vue`、`credit/components/ZsTree/index.vue`
- `autonomy/.../ResponseTable.vue`、`zs-select-dialog.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 构建：`zhi2-web-admin` 的 `npm run build` 退出码0
- 所属项目：产品2.0；来源会话：fe6216ac-7cd1-456e-aec9-aa58446ad0ba；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "asset_url_import",
  "source_extraction_id": "e126efa632a44debbf017f2d54ab133a",
  "version": 1,
  "memory_type": "entities"
}
-->