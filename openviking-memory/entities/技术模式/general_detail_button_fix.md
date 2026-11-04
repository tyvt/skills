# 一般表决新增页多余按钮修复
太仓G端一般表决详情页底部按钮同时用 `v-show` 与 `v-hasPermi`，导致新增页也显示撤销、延期等操作按钮。

## 问题根因
- 一般表决详情页底部按钮同时用 `v-show` 和 `v-hasPermi`
- `v-hasPermi` 指令在有权限时强制设置 `display: ''`，覆盖 `v-show` 隐藏效果
- 新增页（`formMode=add`）时只要账号有权限，撤销、延期、提前开始等按钮全部显示

## 修复方案
- `generalDecision/detail.vue`：增加 `isSubmittedBiz` 计算属性，仅查看模式且单据已提交（`bizState == '2'`）时为 true
- 将 `v-show` + `v-hasPermi` 改为 `v-if` + `checkPermission()`，权限判断合并进显示条件
- 修复后新增页底部只显示「保存」；查看已提交记录才按状态权限显示操作按钮

## 验证与归属
- 验证证据：会话 3c3a27ee 一般表决刚新增就出现一排其他按钮；修复后正常
- 涉及文件：zhi1-web-admin/src/views/estate/generalDecision/detail.vue、ownerDecision/detail.vue、src/mixins/detailMixins.js、optionDecision/detail.vue
- 所属项目：太仓G；来源会话：3c3a27ee-5748-4f83-bd05-d3e2e69d6434；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "general_detail_button_fix",
  "source_extraction_id": "78e0df094dee43b49796d6b7e7fe13b6",
  "version": 1,
  "memory_type": "entities"
}
-->