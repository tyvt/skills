# 平台配置页 getDetail 必需参数守卫跳过请求
产品2.0 中平台配置页因重写了详情接口（无需 id 的 `/system/platformConfig/getInfo`），触发 `form.js` 的 `getDetail()` 必需参数守卫，导致请求被跳过并打印警告。

## 问题根因
- `form.js` 混入的 `getDetail()` 通过 `validateDetailRequiredParams()` 校验必需参数，默认要求 `id` 存在
- 平台配置页重写了详情接口 `detailApiFull` 返回 `/${moduleName}/${businessName}/getInfo`（无需 id），路由里没有 id，导致 `this.id` 为 `undefined`，校验失败跳过请求

## 修复方案
- 平台配置页需覆盖 `getDetailRequiredParams()` 以适配无 id 的 getInfo 接口，或在守卫中放行该场景

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：src/mixins/form.js、src/views/system/platformConfig/detail.vue
- 所属项目：产品2.0；来源会话：aac565c5-b02e-4808-812b-4d72d0017085；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "platformconfig_getdetail_skip",
  "source_extraction_id": "d70fba0bcec84f65b76e0f60a1dcc6b0",
  "version": 1,
  "memory_type": "entities"
}
-->