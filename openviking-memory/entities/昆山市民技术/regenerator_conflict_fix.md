# 昆山市民async函数regenerator变量冲突修复
昆山市民在线服务列表因 async 函数被 regenerator 编译后压缩变量名冲突导致只读错误，已改为普通函数+.then() 修复。

## 问题根因
- `async function getList` 被编译成 regenerator 运行时，内部 `r`、`o`、`a` 与外层 `title`、`list`、`status` 压缩变量名冲突
- 触发 `_readOnlyError("t")` 类错误（压缩后变量名可能是 `t` 或 `r`）
- 问题不在 `res.rows = ...` 赋值，而在 regenerator 编译产物

## 修复方案
- `type` ref 重命名为 `articleType`，避免与请求参数 `type` 压缩后冲突
- `async/await` 改回普通函数 + `.then()`，不再走 regenerator 编译
- 不修改接口返回对象，在 `.then()` 里返回新对象
- 重新编译后 onlineIndex.js 为普通函数

## 验证与归属
- 验证：会话 e2662fbf 用户要求全局排查类似错误并修复
- 涉及文件：src/pages_onlineService/onlineIndex.vue、src/pages_home/home.vue、src/hooks/useLoadMore.js、src/api/modules/article.js、src/request/index.js、src/pages_contract/list.vue
- 所属项目：昆山市民；来源会话ID：e2662fbf-7e20-4064-8bc6-9c43baa98d56

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "regenerator_conflict_fix",
  "source_extraction_id": "c534b7c594854b9089e2fda834ef7f9b",
  "version": 1,
  "memory_type": "entities"
}
-->