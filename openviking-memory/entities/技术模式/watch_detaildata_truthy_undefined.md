# watch detailData 默认{} truthy 误置表单字段为undefined
`watch` 监听 `detailData` 时用 `if(val)` 判断，但 `detailData` 默认值为 `{}`（truthy），接口异常返回 `{}` 或 `undefined` 时仍进入分支，将 `otherData.xxx` 赋值成 `undefined`，导致 checkbox/input 显示空白。

## 问题根因
- `watch:{ detailData:{ handler(val){ if(val){ 赋值 } } } }` 用 truthy 判断，无法区分「真正有数据」与「空对象」
- `detailData` 默认 `{}` 为 truthy，接口异常返回 `{}`/`undefined` 仍进入分支把字段覆盖为 `undefined`

## 解决方案
- 区分「真正有数据」与「空对象」，例如用 `Object.keys(val).length` 或显式判空
- 对字段做空值保护，避免直接覆盖导致表单字段变 `undefined`

## 验证与归属
- 所属项目：repository
- 验证证据：extracted source=cursor project=repository
- 验证证据：012.md 会话 f57d7e7f：stepHouseInfo watch detailData 默认 {} 触发把表单值改 undefined
- 涉及文件：src/pages/leaseContract/stepHouseInfo.vue
- 来源会话：f57d7e7f-9439-484d-b703-784cb50ce8c1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "watch_detaildata_truthy_undefined",
  "source_extraction_id": "61ac1443c2464ba4a5c7ada13fdee10d",
  "version": 1,
  "memory_type": "entities"
}
-->