# 提前结束等弹框校验提示残缺显示修复
园区公共收益项目选项表决详情页撤销/延期/提前结束弹框校验提示被裁切问题已修复，改动集中在 CancelReasonDialog.vue。

## 修改内容
- 样式覆盖：为 zs-dialog 增加 custom-class="cancel-reason-dialog"，将错误提示改为文档流布局，避免被 overflow: hidden 裁切（与 ResetPwdDialog 方案一致）。
- 校验触发：revokeReason、postponeDate 的 trigger 从 ['blur'] 改为 ['blur', 'change']，输入后错误提示即时清除。
- 打开时重置：在 onOpen 中调用 clearValidate()，避免上次校验状态残留。

## 影响范围
- 该组件被选项表决详情页的撤销、延期、提前结束三个弹框共用，本次修复一并生效，无需改各 detail 页面。

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 文件：zhi2-web-admin/src/views/components/CancelReasonDialog.vue、zhi2-web-admin/src/views/autonomy/option/detail.vue、zhi2-web-admin/src/styles/index.scss
- 所属项目：园区公共收益；来源会话：a5325fb9-2e64-40bc-b6ba-0a3479233656；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cancel_dialog_fix",
  "source_extraction_id": "8cb7befab8654af79a9acdf99f050a39",
  "version": 1,
  "memory_type": "entities"
}
-->