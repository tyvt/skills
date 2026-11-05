# V1 Token策略调整
苏住房C移除V1请求层拦截并集中管理tokenV1预取，修复实名认证状态判断异常。

## 变更摘要
- 删除`httpInstance.js`中`requireRealName`、`assertRealNameForV1`及async包装
- `v1Instance.js`恢复为纯V1客户端配置
- 无`tokenV1`时不带`Authorization`，请求正常发出

## 集中管理
- `user.js`的`getUserInfo()`末尾：已实名→`await ensureTokenV1()`；未实名→`setTokenV1('')`
- `refreshAuthState()`去掉重复`ensureTokenV1()`调用

## 清理冗余
- 清理`login/index.vue`等页面冗余调用，由`getUserInfo`统一处理

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/api/httpInstance.js、src/api/v1Instance.js、src/store/user.js、src/pages_main/login/index.vue
- 来源会话ID：29479c88-88bb-4d9d-b264-a6e91076729b

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "v1_token_strategy",
  "source_extraction_id": "2a80a42a743244f69072321e42dbe8b8",
  "version": 1,
  "memory_type": "entities"
}
-->