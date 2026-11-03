# eslint全仓扫描不限定单文件致改动误判
`npm run lint` 全仓扫描且末尾传参不限定单文件，会令既有问题干扰新增错误判断的套路。

## 问题现象
- `npm run lint` 扫描 `src/**/*.{vue,js}` 全仓，末尾传参不限定单文件
- 既有问题干扰 `TodoPanel.vue` 新增错误判断

## 解决方案
- 单文件检查需直接跑 eslint 限定该文件，避免全仓噪音
- `TodoPanel` 中 `.td__row` 固定 45px + `flex: 0 0` 与 `StudyPanel` 一致
- 列表 `justify-content: flex-start` 合理，双行过紧可加 `overflow: hidden`

## 验证与归属
- 验证证据：src=苏住房G/093.md
- 涉及文件：TodoPanel.vue、StudyPanel.vue、package.json
- 所属项目：苏住房G；来源会话ID：70c82beb-0a71-4fff-89f1-e17db817845a；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "eslint_fullscan_pattern",
  "source_extraction_id": "482c499e25834a43ae52011f7d73c444",
  "version": 1,
  "memory_type": "entities"
}
-->