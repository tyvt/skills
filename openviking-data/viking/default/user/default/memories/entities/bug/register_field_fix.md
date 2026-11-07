# 企业账号注册字段压扁修复
苏州市房地产监测V3 项目修复「企业账号注册（经纪机构）」中统一社会信用代码、注册地址等字段被压扁、看不清的问题。

## 问题根因
- `input-with-actions` 使用 `flex-wrap: nowrap`，输入框 `flex: 1 1 19ch` + `min-width: 0`，半列宽度里挤三个按钮，输入框被压成细线
- 外层 div 未 `width: 100%`，未占满表单项
- 全局 `.map-append` 使用 `display: inline-table` + `calc(100% - 8px)`，在栅格列里易塌缩（注册地址 GIS）
- 校验红字叠在控件上多为上述高度/留白异常连带现象，表单项已有 `--form-item-error-slot: 20px` 预留

## 修改要点
- `InstitutionRegisterSingleForm.vue`：信用代码区改为输入框整行 + 按钮下一行，并 `width: 100%`
- `Step1BasicInfo.vue`：同上（分步旧版保持一致）
- `element-ui.scss`：表单项内 `.input-with-` 相关样式调整
- `index.scss`：同步样式修复

## 验证与归属
- 涉及文件：`InstitutionRegisterSingleForm.vue`、`Step1BasicInfo.vue`、`element-ui.scss`、`index.scss`
- 所属项目：苏州市房地产监测V3；验证证据：extracted source=cursor
- 来源会话ID：bbf6612f-a591-4092-88b3-c7a08cf12618；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "register_field_fix",
  "source_extraction_id": "65263d182fe04a6393857312ef47263e",
  "version": 1,
  "memory_type": "entities"
}
-->