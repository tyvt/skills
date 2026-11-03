# form.js getDetail 必需参数守卫钩子
园区物管2.0 的 form.js（detailMixins 体系）里 getDetail 在路由参数缺失（如 id 为空）时仍发起请求，拼出路径不完整的 detail URL。

## 问题根因
- detailMixins.init() 虽有 if (this.id) 判断，但弹窗、@update 刷新等场景绕过 init() 直接调 getDetail()
- 缺少统一入口做必需参数校验，导致无意义报错请求

## 解决方案
- 在 form.js 的 getDetail 前加两层钩子：getDetailRequiredParams() 默认返回与 detailApiFull 路径相关的 moduleName、businessName、id，页面可覆盖扩展（如补 complexId）
- validateDetailRequiredParams() 发现 undefined/null/空串时 console.warn（带缺失字段名）并返回 false
- getDetail 校验不过直接 return，不设 loading 也不发请求
- 扩展方式是覆盖方法而非改 mixin 本体，所有进入详情接口的路径都有统一参数守卫

## 验证与归属
- 验证：用户要求「没有定义接口必须的参数则不调用接口，并打印警告日志」；实现 getDetailRequiredParams/validateDetailRequiredParams，与 detailMixins.init() 的 if (this.id) 互补
- 涉及文件：src/mixins/form.js、src/mixins/detailMixins.js、src/views/benefit/alert/detail.vue
- 所属项目：园区物管2.0；代码基线：7814a0c2a；来源会话：6a9618e6-98db-4bc4-8e98-8bedd424f2b4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "form_getdetail_param_guard",
  "source_extraction_id": "f46e17a1f6c54021ae5abeaef8eabd8f",
  "version": 1,
  "memory_type": "entities"
}
-->