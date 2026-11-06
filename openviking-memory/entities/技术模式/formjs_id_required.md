# form.js详情接口id必填校验修复
园区公共收益项目修复 `form.js` 中 `getDetail()` 因 `validateDetailRequiredParams` 把 `id` 一律当必填，导致 `/system/platformConfig/getInfo` 等无需 id 的接口被拦截的问题。

## 修改内容
- 新增 `isDetailIdRequired()`，根据 `detailApiFull` 判断详情接口是否依赖 `id`
- 无需 id：URL 为固定路径（如 `/getInfo`、`/getOwnCompany`），不含 `/null`、`/undefined` 或末尾 `/`
- 需要 id：默认模式 `/${module}/${business}/${id}`，id 为空时拼成 `../null` 或 URL 末尾为 `/`
- `/system/platformConfig/getInfo` 在 `id` 为 `null` 时不再被拦截；普通详情页缺 id 时仍正常跳过请求
- 页面可通过重写 `getDetailRequiredParams()` 自定义校验规则

## 验证与归属
- 所属项目：园区公共收益；来源会话：53746354-b471-423b-8e12-527f9a697944；代码基线：none
- 涉及文件：`form.js`、`platformConfig/detail.vue`、`detailMixins.js`

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "formjs_id_required",
  "source_extraction_id": "1dabda6ae60c49ba9b0b0e9ad1f7dc61",
  "version": 1,
  "memory_type": "entities"
}
-->