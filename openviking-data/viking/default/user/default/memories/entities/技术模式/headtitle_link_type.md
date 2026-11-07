# HeadTitle 支持 link 类型
详情顶栏 HeadTitle 的 headTitleList 项可设 type:'link'，实现可点击跳转并对齐 detail-template 契约。

## 功能契约
- 模板用可点击 span（如 value-link）展示 value，@click 走 handleLinkClick 并先 $emit('link-click', item)
- link 为函数时只执行 item.link()（路由在调用方内）；link 为以 / 开头字符串时 router.push(path) 并支持 item.query；link 为含 path 对象时 router.push(linkValue)
- link 类型不渲染 getIconUrl 图标，样式与 detail-template 的 detail-link 一致（主题色、下划线、pointer）

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证：会话 ae811080 扩展 HeadTitle/index.vue，propertyBid/detail 将招标计划编号改为 type link + link: goToComplexDetail
- 涉及文件：zhi2-web-admin/src/components/HeadTitle/index.vue、zhi2-web-admin/src/views/property/propertyBid/detail.vue
- 所属项目：2-0；来源会话ID：ae811080-a0ec-4d52-b603-a6fb72f9ca69；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "headtitle_link_type",
  "source_extraction_id": "7e05f1205910435fbbe5059959536467",
  "version": 1,
  "memory_type": "entities"
}
-->