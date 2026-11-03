# 跨端全局对象隔离规范
苏住房C小程序与H5共用源码时，window/location/sessionStorage等H5-only对象须收敛到跨端工具，避免setup阶段报错。

## 问题现象
- 运行报TypeError: Cannot read property 'location' of undefined，堆栈停在公共组件setup
- 错误指向复用组件AgreementPage.js而非当前页面，易误判

## 根因
- 共享组件直接使用window.location/document/sessionStorage，mp-weixin运行时不存在
- 组件挂载即setup抛错，错误堆栈只指公共组件

## 解决方案
- location.search改hooks/useUrlQueryParam；sessionStorage改utils/form-cache.js封装uni storage
- document/window.addEventListener用H5条件编译包裹
- 全仓排查清理window对象使用，验证步骤间切换表单保留

## 验证与归属
- 会话4b82f232：新增utils/form-cache.js，guardApply三步组件改uni storage，多处加条件编译
- 涉及文件：AgreementPage.vue、form-cache.js、useUrlQueryParam.js、guardApply/*等；项目：苏住房C；基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "h5_global_isolation",
  "source_extraction_id": "93ce183c426145c2b955cfbe7c449325",
  "version": 1,
  "memory_type": "entities"
}
-->