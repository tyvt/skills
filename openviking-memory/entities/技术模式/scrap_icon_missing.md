# 报废记录图标消失因未设flex-shrink防挤
物业手持B端报废记录页因 .address-box 未用 flex 且图标无 flex-shrink，长文本挤压致图标消失。

## 问题根因
- 根因：`src/pages_facility/record/addScrap.vue` 中 `.address-box` 未用 flex 且图标无 `flex-shrink`，长文本挤压致图标消失

## 解决方案
- `.address-box` 改 `display:flex; align-items:flex-start; gap:12rpx`，页面顶部卡片与弹窗列表共用同一套规则
- `:deep(.address-img)`（弹窗内信用代码、注册地址前图标）与 `:deep(.icon-address)`（顶部设施设备地址图标）均设 `40rpx` 并加 `flex-shrink:0`
- `.address-box-text` 增加 `flex:1; min-width:0`，让长文本在剩余空间展示不挤占图标

## 验证与归属
- 验证证据：extracted source=cursor project=物业手持B端
- 构建通过 `npm run build` 且无 linter 报错；真机/H5 验证路径：工作台→报废记录→添加报废记录→点击「鉴定单位」查信用代码与注册地址前蓝色图标
- 涉及文件：src/pages_facility/record/addScrap.vue、src/components/ZsImage/ZsImage.vue、src/pages_facility/record/add.vue、src/pages_facility/record/index.vue、src/pages/workbench/index.vue、src/components/ZsDialog/ZsDialog.vue、src/pages_facility/facility/index.vue、src/pages_facility/repair/submit.vue
- 来源会话ID：be2f7a12-9ddb-4fb6-9c2d-69d56e0b5c96
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "scrap_icon_missing",
  "source_extraction_id": "492c8b0603a94a41bead32e1a63d8236",
  "version": 2,
  "memory_type": "entities"
}
-->