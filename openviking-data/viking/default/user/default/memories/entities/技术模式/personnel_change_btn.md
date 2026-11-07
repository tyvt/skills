# 从业人员备案企业端发起变更按钮缺失
苏州市房地产监测V3 中 toB/personnelRecord/components/detail.vue 企业端从业人员备案详情页缺少「发起变更」按钮的问题记录与修复要点。

## 问题说明
- 企业端角色详情页缺少发起变更按钮，后端会自行校验备案单是否已备案，未备案时直接 toast 后端错误消息，与 G 端行为一致
- 若后端菜单未给企业端角色分配 `company:personnelRecordChange:change` 权限字符，上线后需在菜单权限补上，否则按钮不显示

## 改动与验证
- 改动仅涉及一个文件：`toB/personnelRecord/components/detail.vue`
- ESLint 检查通过（0 错误，仅原有的 zs-form-item 风格警告）

## 验证与归属
- 验证证据：extracted source=zcode project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3；来源会话：session_5860efb84bbcb109aba35f9f7a52caad；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_change_btn",
  "source_extraction_id": "6b122800a3944e5ab589de37f06d7ee6",
  "version": 1,
  "memory_type": "entities"
}
-->