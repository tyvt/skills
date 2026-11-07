
# 导出按钮 Loading 防重复点击模式
在宜兴公共收益与淮安物管后台项目中复用的一项技术：将 loading 标志绑定到导出按钮，阻止重复点击。

## 实现方式
- 新增 `exportLoading` 字段并绑定到按钮的 `loading`（或 `attrs.loading`）属性。
- 导出请求发起时置 `exportLoading` 为 `true`，在 `finally` 中重置为 `false`。
- loading 状态拦截重复提交。

## 宜兴归属
- 验证 src=宜兴公共收益/002.md；基线 none；会话 0ed8887c-bd1f-4c05-a0c0-05c9ac915e28。
- 文件：zhi2-web-admin/src/views/property/complex/index.vue、property/relocationSurvey/index.vue、building/building/index.vue、property/partSpot/index.vue、publicQuery/complex/index.vue、api/index.js、mixins/listMixins.js、property/extract/index.vue。

## 淮安归属
- 验证 src=淮安物管/005.md；基线 none；会话 968e6aef-a864-48b6-8689-93f6af2352ef。
- 淮安导出原先缺少 Loading 状态，与 `building/unit` 及 `credit/record` 列表页不一致；将 `exportLoading` 变量绑定到按钮 `loading` 属性并在 `download` 的 `finally` 中重置。
- 文件：zhi2-web-admin/src/views/benefit/pubAccountBalance/index.vue、property/propertyAccount/index.vue、evaluation/evaluation/quarter/index.vue、property/census/index.vue、api/index.js、mixins/listMixins.js、mixins/table.js、mixins/ListTemplate.js。

## 验证与归属
- 所属项目：宜兴公共收益
- 验证证据：extracted source=cursor project=宜兴公共收益
- 来源会话：0ed8887c-bd1f-4c05-a0c0-05c9ac915e28


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "export_button_loading",
  "source_extraction_id": "880cd4f745e24b6faab82b1cdaea3e14",
  "version": 3,
  "memory_type": "entities"
}
-->
