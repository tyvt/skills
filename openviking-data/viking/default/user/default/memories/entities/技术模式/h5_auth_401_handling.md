# H5 鉴权与 401 处理修复
苏住房防汛C端移动查询H5 的启动令牌校验、401 处理与 demo 登录绕过问题的修复记录。

## 令牌与 401 处理
- App.vue 原 token-blind-trust 问题修复（Bug6502），禅道 resolved/fixed，assignedTo=tiany、openedBy=lichandan、product=79 project=141 exec=142，推 origin/dev
- 提交 5297d9c：request.ts 在 401 且有有效 Authorization 时清 token 与用户缓存并 reLaunch /pages/login/index
- 登录接口自身 401 保留原登录态，并发仅触发一次跳转；tests/request.test.ts 12/12 通过；类型检查因他模块既有错误未过、构建未执行

## demo 登录绕过
- 提交 e925eec6（后已推送 origin/dev，尚未部署到测试服务器）：定位 demo 登录绕过启动令牌校验，且请求层未处理 200 响应体 code:401
- request.ts:79 识别两种 401；App.vue:50 将鉴权失败判为令牌无效
- 清理防汛/自查/门户运行时 mock 与 seed fallback，移除 demo 自动登录与模式开关；门户 banner 去两个本地渐变占位并按真实模型匹配类型；请求错误继续上抛
- 生产构建通过、涉改文件无类型错误；类型检查仍因未改的 src/store/user.ts、src/utils/index.ts、src/utils/watermark.ts 报错

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "h5_auth_401_handling",
  "source_extraction_id": "498ae34cf4d94249bf5ea2eb5f0e8b01",
  "version": 1,
  "memory_type": "entities"
}
-->