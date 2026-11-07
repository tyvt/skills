# 平台配置详情页未调接口修复
无锡市区G项目中，`zhi2-web-admin` 平台配置详情页不调用接口，表单全空。

## 问题根因
- `src/views/system/platformConfig/detail.vue` 是单例配置页，路由上无 id
- 公共 mixin `mixins/form.js` 的 `getDetail()` 先执行 `validateDetailRequiredParams()`，发现 id 为空就跳过请求（控制台打印 `[getDetail] 缺少接口必需参数，已跳过请求：id`）

## 解决方案
- 在该页面 `methods` 中重写 `getDetailRequiredParams()` 返回 `{}`，跳过 mixin 的 id 必填校验
- 详情接口路径本已重写为不带 id 的 `/system/platformConfig/getInfo`，修复后进入 view 模式即正常调接口回填数据

## 涉及文件与归属
- 涉及文件：`zhi2-web-admin/src/views/system/platformConfig/detail.vue`、`mixins/form.js`、`mixins/detailMixins.js`
- 所属项目：无锡市区G
- 来源会话：ab2855cc-75e4-4430-85d8-acdddf2c429b
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "config_no_request",
  "source_extraction_id": "2f6469fe1cbc4dcbb44647f0742c2751",
  "version": 1,
  "memory_type": "entities"
}
-->