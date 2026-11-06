# 注册表单GIS与标题样式修复
苏州市房地产监测V3 中开发企业与经纪机构注册表单的 GIS 对齐、注册地址输入框及标题竖线样式已统一修复。

## 改动内容
- GIS 对齐不再使用 `map-append`（Element 的 append 会多出一段宽度，容易超出列宽）
- 注册地址改为与「统一社会信用代码」相同的 `input-with-actions`：左侧输入框占满剩余宽度，右侧 GIS 地图使用同款 `outline-action-btn`，整行宽度与同列其它输入框一致
- 标题文字包在 `<span class="section-title-label">` 内，竖线用 `::before` 画在容器左侧，文字 `padding-left: 12px`，避免叠在一起
- 带说明条的标题（如「管理员信息」）去掉组件里干扰布局的 scoped flex，在 `register-form.scss` 里统一为 flex；竖线固定在标题文字高度（`top: 2px`），不跟着右侧说明条整块居中
- 开发企业与经纪机构注册均已改

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：register-form.scss、InstitutionRegisterSingleForm.vue、InstitutionRegisterPage.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：4a83cb2a-0b28-4320-8623-2a87f20a11f3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_form_ui_fix",
  "source_extraction_id": "81e9f941fa0f412b93a6270edb81daa5",
  "version": 1,
  "memory_type": "entities"
}
-->