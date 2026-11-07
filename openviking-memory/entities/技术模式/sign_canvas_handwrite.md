# 协议签字须手写交互且弹窗可见后初始化
协议签字区封装 canvas 手写签名组件，弹窗可见后初始化，变更与撤销改为按钮。

## 实现要点
- 原 mock 签字区无真实签名能力
- 在 src/components/zs-sign-canvas/zs-sign-canvas.vue 封装 canvas 绘制与 confirm() 返回 Promise<string|null>
- myAgreementDetail.vue 弹窗 visible 为 true 后初始化并调用 signCanvasRef.confirm() 生成签名图
- 变更与撤销改为按钮，变更弹窗可编辑协议名称并更新本地 agreementName

## 验证与归属
- 所属项目：0
- 验证证据：extracted source=cursor project=0
- 验证：src=0/002.md
- 涉及文件：src/components/zs-sign-canvas/zs-sign-canvas.vue、myAgreementDetail.vue
- 来源会话：ca6ff164-836b-45c4-8c3b-f46fab9f0850；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "sign_canvas_handwrite",
  "source_extraction_id": "2361c55339f146289f8d8bbd184ff68b",
  "version": 1,
  "memory_type": "entities"
}
-->