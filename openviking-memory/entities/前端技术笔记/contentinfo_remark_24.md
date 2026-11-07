# ContentInfo Remark Layout 24
修复自主属性变更详情中的 contentInfo。

## 描述
- 在 `zhi2-web-admin/src/views/autonomy/change/property/detail.vue` 中，在 `contentInfo` 数组末尾添加 `remark` 项（显示名称为“变更内容”）。
- 将该项的 `layout` 的 `xs/sm/md/lg/xl` 全部设置为 `24`，以占据整行。

## 涉及的文件
- zhi2-web-admin/src/views/autonomy/change/property/detail.vue

## 验证
- 来源: cursor session=667f57c4-46bf-4026-b4cf-866c7a9cab67
- 代码库: none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：667f57c4-46bf-4026-b4cf-866c7a9cab67


<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "contentinfo_remark_24",
  "source_extraction_id": "e1e9f73408db4b68b85692c1f86358e5",
  "version": 1,
  "memory_type": "entities"
}
-->
