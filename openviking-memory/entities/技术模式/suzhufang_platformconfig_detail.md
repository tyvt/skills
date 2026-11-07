# 苏住房G 基础配置详情接口逻辑修复
苏住房G 项目修复基础配置详情页只显示表单默认值、接口数据未回填的问题。
## 问题根因
- `form.js` 混入的 `getDetail()` 校验路由 `id`，而基础配置走 `/system/platformConfig/getInfo` 不依赖路由 ID，请求被跳过，页面仅显示表单默认值
## 主要改动
- `platformConfig/detail.vue` 重写 `getDetailRequiredParams()`：去掉 `id` 校验，返回 `{ moduleName, businessName }`，与 `companyRecord` 的 `getOwnCompany` 模式一致
- 增强 `detailCallback`：兼容 `response.data` 与直接返回数据两种结构
## 涉及文件与归属
- 涉及 `form.js`、`platformConfig/detail.vue`、`detailMixins.js`
- 所属项目：苏住房G；来源会话：beb84a33-dfcd-4bad-a0cd-f26b74eb1d33；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhufang_platformconfig_detail",
  "source_extraction_id": "47bc4314ee6040b39df5c2f234d4de2f",
  "version": 1,
  "memory_type": "entities"
}
-->
