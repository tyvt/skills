# zs-dialog 弹窗层级提升需用 wrapper-class
scoped 样式对 el-dialog 内部渲染的 el-dialog__wrapper 生效不确定，需用 wrapper-class 提层避免被更高层级遮罩盖住。

## 问题根因
- scoped 样式对 zs-dialog 内部渲染的 el-dialog__wrapper 生效不确定
- 页面存在更高层级遮罩：RightPanel .rightPanel z-index 40000、Map .modal 99998，会盖住弹窗

## 修复方案
- 在 zs-dialog 传入 wrapper-class，于组件内对该 class 设 z-index:100000 !important
- 移除各弹窗里 scoped 的 el-dialog__wrapper z-index 写法

## 验证与归属
- 所属项目：repository
- 验证证据：extracted source=cursor project=repository
- 验证：会话 7b431f08 资产弹窗有时从后面弹出，根因层级被盖，wrapper-class 提至 100000（证据 011.md）
- 涉及文件：src/components/zs-dialog/zs-dialog.vue、src/views/benefit/statisticsMap/components/AdvertiseAssetDialog.vue
- 来源会话ID：7b431f08-6086-40c9-8c0f-6dc67a2167c3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_dialog_zindex",
  "source_extraction_id": "5275a4e5dacb42f1bcfc39133d795b60",
  "version": 1,
  "memory_type": "entities"
}
-->