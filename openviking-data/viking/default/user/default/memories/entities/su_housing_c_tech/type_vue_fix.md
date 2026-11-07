# type.vue 发布角色页样式修复
苏住房C 小程序 `pages_transaction/publishHouse/type.vue`（选择发布角色页）修复两类样式问题。

## 分割线不一致
- 将 uni-forms 的 :border="true" 改为 :border="false"，去掉组件自带短分割线
- 统一为所有 uni-forms-item 设置 border-bottom: 1px solid #f2f2f2（form2.scss）

## 疑问图标未显示
- yiwen.png 在 pages_transaction 分包下，默认解析到 pages_owner 导致路径错误
- 为 ZsImage 增加 subpackage="pages_transaction"
- 用 w-28 h-28 容器包裹图标（与 authentication.vue 一致），避免 ZsImage 默认 height:100% 高度为 0

## 验证与归属
- 涉及文件：type.vue、authentication.vue、form2.scss、ZsImage.vue
- 来源会话ID：13824f1b-0d06-4c7a-8d3f-79edcf5ccfe4
- 验证证据：extracted source=cursor project=苏住房C

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "type_vue_fix",
  "source_extraction_id": "cbccc77e23c04a3fb98fe21d70df4ad3",
  "version": 1,
  "memory_type": "entities"
}
-->