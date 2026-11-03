# ElInput size 非法值兼容归一化
Element Plus ElInput 的 size 仅接受 ""|default|small|large，历史传 mini/medium 会告警，需在 ZsInput 封装层做映射。

## 问题根因
- Element Plus ElInput 的 size prop 不支持 mini/medium，合法值为 ""|default|small|large，直写会触发 Vue warn。
- 项目历史代码向 zs-input 传入 medium/mini 触发 Invalid prop 警告。

## 解决方案
- 在 zhi2-web-admin/src/components/zs-input/zs-input.vue 封装层映射 medium→default、mini→small、其余→default。
- 封装组件应归一化传入尺寸以避免 Vue warn。

## 验证与归属
- 验证证据：src=2-0/018.md；会话 a5963bb7 报 ElInput size 传 mini/medium 告警，经 zs-input.vue 归一化修复。
- 涉及文件：zhi2-web-admin/src/components/zs-input/zs-input.vue；runtime.ts。
- 所属项目：2-0；来源会话ID：a5963bb7-204d-42a4-88ac-9fc16822e761 与 76487407-667b-42b3-afef-eb2d2411a5b9；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zsinput_size_compat",
  "source_extraction_id": "5dbac103e3d54e85b671d164f7e79f30",
  "version": 1,
  "memory_type": "entities"
}
-->