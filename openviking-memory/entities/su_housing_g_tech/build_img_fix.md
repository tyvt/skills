# 构建报错图片资源缺失与路径修复
苏住房G 构建报错因缺少图片资源及 Vite 中 `public` 目录路径写法错误，已补充图片并修正路径修复。

## 问题原因
- 缺少图片资源：`public/assets/images/sfqk_img.png` 在目标分支不存在
- 图片路径写法错误：Vite 中 `public` 目录文件应通过 `/assets/...` 访问，不能写 `/public/assets/...`，否则 Rollup 当成模块 import 解析

## 修复方案
- 从 `2.6.1-szRcbBankTrust` 分支补充 `sfqk_img.png`
- `propertyAgreement/detail.vue`：`src="/public/assets/images/sfqk_img.png"` 改为 `src="/assets/images/sfqk_img.png"`
- `bill/components/import.vue`（同类问题一并修复）：`src="./../../../../public/assets/images/icon_excel.svg"` 改为 `src="/assets/images/icon_excel.svg"`

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 涉及文件：`propertyAgreement/detail.vue`、`bill/components/import.vue`、`src/views/property/propertyAccount/index.vue`、`src/views/system/paymentChannel/index.vue`
- 所属项目：苏住房G（zhi2-web-admin）；来源会话：7e4bfd75-cb6c-466f-aeaa-b9802e18e283；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_g_tech",
  "name": "build_img_fix",
  "source_extraction_id": "4fe6b1917a3649f084f7bb0c722beae5",
  "version": 1,
  "memory_type": "entities"
}
-->