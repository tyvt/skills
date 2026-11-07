# zs-sign-canvas
uni-app 手写签名 canvas 组件，路径 src/components/zs-sign-canvas/zs-sign-canvas.vue，由用户在项目0中新建。

## 功能
- 在 canvas 上触摸绘制签名，支持「清除」与「确认」
- 暴露 clear() 与 confirm()（返回 Promise<string|null>，未签名时提示并返回 null）
- 支持 canvas-id、visible 参数，visible 为 true 后再初始化 canvas，便于在弹窗中使用

## 用途
- 被 myAgreementDetail.vue 协议签字区调用，确认时 signCanvasRef.confirm() 生成签名图后关闭并执行后续逻辑

<!-- MEMORY_FIELDS
{
  "category": "组件",
  "name": "zs-sign-canvas",
  "source_extraction_id": "1fb079fea20c4c2aa17305d2b8c28da4",
  "version": 1,
  "memory_type": "entities"
}
-->