# 新增 eslint 规则校验重复 vue options
新增 eslint 规则 duplicate-attributes/no-duplicate-vue-options，用于校验 Vue 文件中 methods 等选项是否存在重复定义。

## 背景
- 在 zhi2-web-admin 下执行 npm run lint（eslint src/**/*.{vue,js}），退出码 1，共 2493 条 error（0 warning），其中约 2486 条可用 --fix 自动修复（多为 quotes、semi、indent、comma-dangle）

## 规则命中
- 新规则共报 3 处重复定义：
  - src/views/maintenance/planBid/components/maintenanceItemDialog.vue：methods 内重复定义 getQueryParams
  - src/views/property/complexChange/detail.vue：methods 内重复定义 getForm
  - src/views/solicitation/components/maintenanceItemDialog.vue：methods 内重复定义

## 验证与归属
- 验证证据: extracted source=cursor project=bugfix
- 会话: e9b82eae-9a23-4947-a2d0-d40f550dbd2c
- 所属项目: bugfix

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "vue_duplicate_options",
  "source_extraction_id": "13c17fa23675494eb513637d319d8231",
  "version": 1,
  "memory_type": "entities"
}
-->