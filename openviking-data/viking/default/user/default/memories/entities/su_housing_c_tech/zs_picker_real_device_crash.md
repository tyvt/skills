# ZsPicker真机崩溃因getCurrentInstance ctx为空
ZsPicker组件在真机微信小程序因调用getCurrentInstance().ctx导致整页白屏，已修复。

## 问题根因
- memberForm页面使用两个ZsPicker
- ZsPicker中存在无效代码 `const attrs = ref(getCurrentInstance().ctx.$attrs)`
- 真机微信小程序中getCurrentInstance().ctx常为undefined，组件初始化抛错白屏
- 模拟器环境宽松未暴露，family/index列表页不用ZsPicker故正常

## 解决方案
- 删除ZsPicker中崩溃的getCurrentInstance调用
- popup ref改为ref(null)修正弹层引用
- “前往添加”改为绝对路径/pages_owner_extra/family/memberForm
- 保存后跳转详情也改为绝对路径

## 验证与归属
- 验证证据：extracted source=cursor session=82516bfa-31ef-44c0-9835-1b565029f672
- 涉及文件：pages_owner/family/index.vue、components/ZsEmpty/ZsEmpty.vue、components/ZsImage/ZsImage.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话：82516bfa-31ef-44c0-9835-1b565029f672；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "zs_picker_real_device_crash",
  "source_extraction_id": "de6419ee06b04af68200113dcef4346b",
  "version": 1,
  "memory_type": "entities"
}
-->