# 物业B端改动须合并泰兴小程序验证
物业手持B端提交 `906ac00`（含 `PageButton` 等共享组件）需合并至泰兴小程序，关键流程为执行 `npm run build:mp-weixin` 完成编译验证。
## 问题背景
- 物业手持B端提交 `906ac00` 包含共享组件（如 `PageButton`），需合并进泰兴小程序代码库。
- 合并后须通过编译验证确保小程序正常运行。
## 验证流程
- 执行 `npm run build:mp-weixin` 完成编译验证。
- 验证证据：src=泰兴小程序/003.md
## 验证与归属
- 涉及文件：src/pages_owner/house/verify.vue、src/pages/index/property.vue、README.md、src/pages/staff/home/index.vue、src/staff/pages_facility/issue/index.vue、src/pages_facility/issue/index.vue（物业手持B端）、src/uni.scss 等。
- 来源会话ID：1f8915b7-fae4-4567-901b-3b9f8404445e
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bterminal_merge_build",
  "source_extraction_id": "fc9f554b0d494f35b937bf826962d11b",
  "version": 1,
  "memory_type": "entities"
}
-->