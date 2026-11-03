# 产品2.0弹窗v-model与modelValue显隐统一
产品2.0业务弹窗统一父组件写法，使用v-model替代v-model:visible。
## 解决方案
- zs-dialog增加modelValue，内部dialogVisible = modelValue ?? $attrs.visible（迁移期短暂兼容），关闭emit update:modelValue
- 子弹窗、dialogMixins、zs-select-dialog、zs-sort-dialog等同步modelValue/update:modelValue，批量把update:visible改为update:modelValue
- 用户明确要求制单/流程类抽屉「不要兼容visible」时，组件只保留modelValue单通道
## 涉及文件
- zhi2-web-admin/src/components/zs-dialog/zs-dialog.vue
- zhi2-web-admin/src/mixins/dialogMixins.js
- zhi2-web-admin/src/layout/components/Navbar.vue
- zhi2-web-admin/src/components/OperationBtnGroup/attachmentDraw.vue
- zhi2-web-admin/src/components/OperationBtnGroup/index.vue
## 验证与归属
- 所属项目：2-0（产品2.0 zhi2-web-admin）；代码基线：none
- 验证证据：Navbar改密弹窗打不开后全局改v-model；attachmentDraw去掉visible兼容，仅保留modelValue单通道；父组件OperationBtnGroup/index.vue改回v-model="showAnnexDialog"解决打不开问题（src=2-0/011.md）
- 来源会话ID：9385abcc-fd97-45d9-bf1e-ac59ebef7392, fd343572-63de-4aa9-8903-f1792cb37580

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "popup_vmodel_modelvalue",
  "source_extraction_id": "e1697a5b28f1459ca244bb8203dedf0c",
  "version": 2,
  "memory_type": "entities"
}
-->