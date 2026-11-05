# 表单内picker宽度撑满WXSS编译修复
苏住房C 微信小程序因使用 `> *` 通配选择器导致 app.wxss 与 add.wxss 编译失败，已改为具体类名设置宽度并修复。

## 问题根因
- 微信小程序不支持 `> *` 通配选择器，为让 picker 撑满宽度加过此类写法
- 导致 `app.wxss` 与 `pages_owner/elevator/add.wxss` 编译失败

## 修复方案
- 在 `uni.scss` 中用具体类名（`.zs-picker-root`、`.uni-easyinput` 等）设置宽度
- 移除 `form2.scss` 中的重复样式
- 本地清理 `dist` 后重新编译通过

## 涉及文件
- app.wxss
- pages_owner/elevator/add.wxss
- uni.scss
- form2.scss

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：9094fe77-3aa6-4ba9-8dce-79bc464969e8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "picker_width_fix",
  "source_extraction_id": "97382b07988845cbb14e671586e0f5f0",
  "version": 1,
  "memory_type": "entities"
}
-->