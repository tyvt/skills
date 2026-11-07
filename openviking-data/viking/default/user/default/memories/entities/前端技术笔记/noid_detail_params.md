# 无 id 详情接口失效的三点落地清单
苏住房G详情页接口有返回但页面只显示表单默认值，根因是 mixins/form.js 的 getDetail 默认校验路由 id 导致请求被跳过，需页面内三点重写。

## 现象与根因
- 详情页接口有返回，但页面只显示表单默认值（如 platformConfig 基础配置走 /system/platformConfig/getInfo，不依赖路由 id）
- mixins/form.js 的 getDetail() 先过 validateDetailRequiredParams()/getDetailRequiredParams()，默认三要素 moduleName+businessName+id 缺任一即 console.warn 并 return，请求根本没发
- 已知结论 #912 只点到校验层这一层；本批补三点落地清单

## 解法与边界
- ① 正确做法是页面内重写 getDetailRequiredParams() 只返回 moduleName+businessName（与 companyRecord 的 getOwnCompany 模式对齐），不要改公共 mixin
- ② detailApiFull 也要一并重写（默认是 /${moduleName}/${businessName}/${detailApiSuffix}/${id}，会渲染出 .../getInfo/undefined），本仓 platformConfig 覆盖成 /getInfo 放在 computed
- ③ detailCallback 必须兼容两种结构 response?.data ?? response，因为无 id 接口有的直接返回数据
- 排查时在控制台搜「[getDetail] 缺少接口必需参数」即可确认

## 验证与归属
- 会话 beb84a33：用户「接口有返回，修改详情接口逻辑」；结论指出 form.js 的 getDetail 校验路由 id 导致请求被跳过
- 基线核验 form.js L51-77（getDetailRequiredParams 默认含 id、warn 后 return）、platformConfig/detail.vue L317-340（重写 detailApiFull 为 /getInfo + 重写 getDetailRequiredParams 去掉 id）、L349-351（detailCallback 用 response?.data ?? response）
- 涉及文件：zhi2-web-admin/src/mixins/form.js、zhi2-web-admin/src/views/system/platformConfig/detail.vue
- 所属项目：苏住房G；代码基线：b6932ba

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "noid_detail_params",
  "source_extraction_id": "76e464440c524a74abc39276f53511b5",
  "version": 1,
  "memory_type": "entities"
}
-->