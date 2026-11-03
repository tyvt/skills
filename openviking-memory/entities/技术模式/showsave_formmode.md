# 一键申报详情保存按钮显隐修复
物业费申报页点「一键申报」进详情后「保存」按钮误显示，需将显隐判定收敛为仅看 formMode。

## 问题根因
- 原写法 showSave = formMode != 'view' && (formMode == 'edit' || active == 0)。
- 一键申报进来 formMode=add 且 active=0，条件恒真，保存按钮一直显示。
- active 是页内步骤下标，与业务形态无关，属「把视图状态当业务权限」典型误用。

## 解决方案
- showSave 收敛成 formMode == 'edit' 单一条件：新增只留「返回」「下一步」，编辑态显示保存，查看态不显示。
- 新增落库继续由第一步「下一步」调用 submitForm() 完成，保存链路不动。
- 通用约定：详情页顶栏按钮显隐（保存/提交/打印）一律只由 formMode + 业务状态决定，页内 active/step 等 UI 下标不得参与。

## 验证与归属
- 验证证据：会话 a1f996bc（基线 ad5bbd9）产品要求一键申报进详情去掉保存按钮，改 operation-btn-group showSave 为 "formMode == 'edit'"，行为 add 不显示、edit 显示、view 不显示。
- 涉及文件：zhi2-web-admin/src/views/property/feeDeclare2/detail.vue、index.vue。
- 所属项目：苏住房G；来源会话ID：a1f996bc-685b-423d-a130-f23d676a6962；代码基线：ad5bbd9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "showsave_formmode",
  "source_extraction_id": "b318b5f0cb1c4578bf248ffcf2cf1f85",
  "version": 1,
  "memory_type": "entities"
}
-->