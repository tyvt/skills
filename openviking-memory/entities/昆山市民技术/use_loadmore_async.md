# 昆山市民useLoadMore异步函数压缩冲突
小程序编译后 `useLoadMore(async function(){...})` 生成的 regenerator 包装会令内部变量与外层压缩 ref 同名，运行时报 `read-only` 错误，需改普通函数并改名易冲突 ref。

## 问题根因
- 小程序编译后 `useLoadMore(async function getList(){...})` 生成 regenerator 包装，内部临时变量与外层 `const` 的 title/list/status 经压缩后同名。
- 运行时报 `TypeError: "t" is read-only`（`_readOnlyError`），表现像接口或赋值问题而非业务逻辑。

## 解决方案
- 列表请求改普通函数 + `.then()` 返回新对象（勿 mutate `res`）；易冲突的 ref 改名（如 `type` → `articleType`）。
- 全局排查同类 `useLoadMore` 页面；验证重编 `dist/build/mp-weixin` 并清开发者工具缓存。

## 验证与归属
- 验证：会话 e2662fbf onlineIndex 编译后仍报 read-only，根因在 async+regenerator 变量冲突而非 res.rows 赋值。
- 涉及文件：src/pages_onlineService/onlineIndex.vue、src/hooks/useLoadMore.js、src/pages_home/home.vue。
- 所属项目：昆山市民；代码基线：2f4bf04；来源会话ID：e2662fbf-7e20-4064-8bc6-9c43baa98d56。

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "use_loadmore_async",
  "source_extraction_id": "c532054893f54bbe98ba7697d2d3b474",
  "version": 1,
  "memory_type": "entities"
}
-->