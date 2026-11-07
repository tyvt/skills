# ZsButton scoped样式不生效全局修复
小程序ZsButton自定义组件内部button不受页面scoped样式影响，新增全局zs-button.scss统一按钮布局。

## 问题根因
- ZsButton是自定义组件，页面scoped样式（如.btn-login{display:block}）作用不到组件内部button
- width/padding/margin大量失效，登录按钮只剩文字宽度

## 解决方案
- 新增styles/zs-button.scss并在uni.scss全局引入
- 默认尺寸（非mini）自动width:100%，覆盖登录、提交等主按钮
- mini保持inline-flex+自适应宽度用于列表操作
- .btn-login全宽+上下间距
- 底部固定栏.page-button-container/.submit-button-wrapper内全宽
- 并排双按钮.button-group/.btn-container内固定宽度

## 验证与归属
- 验证证据：extracted source=cursor session=2a76ac67-47ce-4046-a986-f88a0614d57f
- 涉及文件：styles/zs-button.scss、uni.scss、components/ZsButton/ZsButton.vue、styles/btn.scss、App.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话：2a76ac67-47ce-4046-a986-f88a0614d57f；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zs_button_scoped_style_fix",
  "source_extraction_id": "de6419ee06b04af68200113dcef4346b",
  "version": 1,
  "memory_type": "entities"
}
-->