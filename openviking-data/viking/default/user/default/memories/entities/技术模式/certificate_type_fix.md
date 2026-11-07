# 证书类型必填符号修复
苏州市房地产监测V3 在两个证书弹窗的 `rules` 中补充 `certificateType` 必填规则，与机构端实现保持一致。

## 修改内容
- `zhi2-web-admin/src/views/company/staffManagement/components/certificatesDialog.vue` 补充必填规则
- `zhi2-web-admin/src/views/company/staffManagement/personnelRecord/certificatesDialog.vue` 补充必填规则
- 规则代码：`certificateType: [{ required: true, message: '证书类型不能为空', trigger: ['change'] }]`

## 预期效果
- 「证书类型」标签前显示红色必填星号
- 未选择证书类型时点击「确定」会在表单项下方提示「证书类型不能为空」，不再请求后报错

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话：7c358850-cada-4f48-ae63-ef09a5db0ee9；验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "certificate_type_fix",
  "source_extraction_id": "704eceb5659240c28189d77cb51cf0c7",
  "version": 1,
  "memory_type": "entities"
}
-->