# 物业B端改动须合并泰兴小程序验证
物业手持B端提交 `906ac00`（含 `PageButton` 等共享组件）需合并至泰兴小程序，关键流程为执行 `npm run build:mp-weixin` 完成编译验证。
## 问题背景
- 物业手持B端提交 `906ac00`（bug修复）包含共享组件：`PageButton`、`ZsButton`、`ZsDatePicker`、`ZsUploader` 同步到 `src/components/` 与 `src/staff/components/`；`ZsImage` 仅更新 `src/components/`；`ZsDatePicker` 改为 `uni-popup` + `picker-view` 滚轮选择，需合并进泰兴小程序代码库。
- 合并后须通过编译验证确保小程序正常运行。
## 验证流程
- 执行 `npm run build:mp-weixin` 完成编译验证。
- 验证证据：src=泰兴小程序/003.md
## 同步范围明细
- staff 子包页面：`cashier/result.vue`、`complex-select/index.vue`、`message/index.vue`，import 已适配为 `@/staff/api`、`@/staff/store` 等，路由已加 `/staff/` 前缀。
- 首页选择性合并：`src/pages/staff/home/index.vue` 保留 `StaffCustomTabbar`、`zStatic` 图片路径等泰兴特有逻辑，合并 `@tap` 点击修复、未读判断。
## 验证与归属
- 所属项目：泰兴小程序
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/pages_owner/house/verify.vue、src/pages/index/property.vue、README.md、src/pages/staff/home/index.vue、src/staff/pages_facility/issue/index.vue、src/pages_facility/issue/index.vue（物业手持B端）、src/uni.scss 等。
- 来源会话ID：1f8915b7-fae4-4567-901b-3b9f8404445e
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bterminal_merge_build",
  "source_extraction_id": "73b155aac32a4c42aabee05de66ae54e",
  "version": 2,
  "memory_type": "entities"
}
-->