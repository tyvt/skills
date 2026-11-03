# 登录多接口调用须finally关闭loading
无锡锡山业主决策H5 中登录多接口链路异常时未统一关闭 loading，导致页面阻塞。

## 问题根因
- login.vue 的 onLoad 调用 uni.showLoading 后，login->lingxiLogin->queryUser 链路异常时未关闭 loading
- 非 200 认证结果及 getInitCode 异常时 loading 未显式关闭

## 解决方案
- 将登录链路改为带 catch/finally 的 Promise 链，于 finally 执行 uni.hideLoading()
- 非 200 认证结果及 getInitCode 异常均显式关闭 loading 并提示用户

## 验证与归属
- 验证：extracted source=cursor session=b52e14fe-c430-4ac6-91d3-cc3e34a5328d
- 涉及文件：src/pages/common/login.vue
- 所属项目：无锡锡山业主决策H5；来源会话：b52e14fe-c430-4ac6-91d3-cc3e34a5328d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_loading_finally",
  "source_extraction_id": "878c83b7f0a2436e8ec91da8162a19b5",
  "version": 1,
  "memory_type": "entities"
}
-->