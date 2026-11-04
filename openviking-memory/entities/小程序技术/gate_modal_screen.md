# 小屏提示框文字遮挡系共用样式边距不足
portal-gate-modal组件的login与house类型共用，小屏适配需调整共用样式边距。

## 问题根因
- login与house类型共用portal-gate-modal.vue组件
- 小屏下文字遮挡系共用样式边距不足（换行、左右边距）

## 组件配置
- GATE_CONFIG 定义 login 与 house 两种类型，各自含 icon、title、desc、primaryText
- 两弹窗「请先登录」「请先添加房屋」为同一 portal-gate-modal 组件，通过 type 区分内容
- home.vue 与 externalWebview.vue 用法：`<portal-gate-modal :visible="showGateModal" :type="gateModalType">`

## 解决方案
- 调整共用样式（换行、左右边距）以适配小屏
- home.vue与externalWebview.vue引用同步生效

## 验证与归属
- 涉及文件：components/portal-gate-modal/portal-gate-modal.vue、home.vue、externalWebview.vue
- 来源会话：89963d64-03a6-4bc1-8b8f-ca67ab26fc19
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "gate_modal_screen",
  "source_extraction_id": "d724a33faad04a55a64d07ba768c13fb",
  "version": 2,
  "memory_type": "entities"
}
-->