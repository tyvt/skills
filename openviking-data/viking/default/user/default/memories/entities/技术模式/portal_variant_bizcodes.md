# resolveHomeLayoutVariant 的 bizSectionCodes 作用域
resolveHomeLayoutVariant 中 bizSectionCodes 仅用于判断是否走 B 端企业首页，不参与 broker/developer 皮肤选择。

## 关键事实
- bizSectionCodes 只管 B 端企业首页判断，不参与 broker / developer 皮肤（主题变体）选择
- 产品约定不恢复「仅有存量/租赁板块 → 强制 broker 皮肤」一类仅凭板块推断皮肤的 fallback
- 若账号无 jjjg/kfqy 等前缀却需固定经纪皮肤，需单独定规则后再加

## 验证与归属
- 验证证据：最终结论 HIGH「不恢复『仅有存量/租赁 → broker 皮肤』的 fallback」；补充 JSDoc 说明 bizSectionCodes 用途
- 涉及文件：zhi2-web-admin/src/views/home/config/homeLayout.js
- 所属项目：门户；来源会话：f7cb8b58-5877-4cf8-8d73-0c4b5bb0762a；代码基线：fd73e47

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_variant_bizcodes",
  "source_extraction_id": "8ea0a501af204a25846f3fa3289591f8",
  "version": 1,
  "memory_type": "entities"
}
-->