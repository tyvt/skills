# 首页分流门禁永久 loading 修复
苏住房G 后台首页 homeVariantReady 只认 terminalType!=null，导致 G 端/超管因 GetInfo 不下发该字段而永久 loading。
## 问题现象
- views/home/index-wrapper.vue 的 homeVariantReady 写成 `return terminalType != null`；G 端与超管 GetInfo 响应不含 terminalType，门禁恒假，模板永不渲染。
## 根因与改法
- 改法：terminalType!=null 直接 true，否则看 roles.length>0（GetInfo 已落库）作第二信号。
- 三重时序依据保证 B 端不误显 v2：路由守卫 await GetInfo 后 next；SET_ROLES 与 TERMINAL_TYPE 同回调无 await 合并渲染；GetInfo 在 profile 后 resolve。
- useBLegacyHome 仅 terminalType==='B' 为真，超管仍落 index-v2。
- 注意 roles.length 仅为间接信号，未来拆薄 GetInfo 应换 userInfoLoaded 标志；财务子系统分支恒 true 与本次无关。
## 验证与归属
- 验证：会话 278f8982 审查结论：homeVariantReady 改为「terminalType!=null 或 roles.length>0」，解 G 端/超管永久 loading，给出三条依据。
- 涉及文件：views/home/index-wrapper.vue、store/modules/user.js、router/index.js；所属项目：苏住房G；代码基线：db4f82c；来源会话ID：278f8982-5423-4da6-a0fb-76825d723046。

<!-- MEMORY_FIELDS
{
  "category": "苏住房G技术笔记",
  "name": "home_variant_ready_bug",
  "source_extraction_id": "f784251e7b6a453dbf14488ca4fe0ff8",
  "version": 1,
  "memory_type": "entities"
}
-->