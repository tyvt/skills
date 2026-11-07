# HeadTitle组件链接点击跳转改造
产品2.0 中 HeadTitle 组件支持 `item.type === 'link'` 可点击跳转，并按 link 类型执行不同路由逻辑。

## 模板改动
- 当 `item.type === 'link'` 时，用可点击 `span.value-link` 展示 `item.value`，绑定 `@click="handleLinkClick(item)"`
- 仅非 link 类型渲染图标（`item.type !== 'link'` 时才用 `getIconUrl`）

## 方法逻辑
- 新增 `handleLinkClick(item)`：
  - 先 `this.$emit('link-click', item)`
  - 若 `item.link` 为函数：只执行 `item.link()`，由调用方内部做路由跳转
  - 若 `item.link` 为字符串路径（以 `/` 开头）：`this.$router.push(path)`，支持 `item.query`
  - 若 `item.link` 为对象（含 `path`）：按对象处理（原文截断）

## 其他说明
- 当前 lint 报错为项目原有 TypeScript/Vue 类型推断问题，非本次改动引入
- 涉及文件：zhi2-web-admin/src/components/HeadTitle/index.vue、propertyBid/detail.vue
- 所属项目：2-0；来源会话：ae811080-a0ec-4d52-b603-a6fb72f9ca69；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=2-0


<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "head_title_link_click",
  "source_extraction_id": "2aa332ea5aa44f9da068c10bd4812892",
  "version": 1,
  "memory_type": "entities"
}
-->
