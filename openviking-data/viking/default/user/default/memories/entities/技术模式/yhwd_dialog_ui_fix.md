# 新增网点弹窗宽度与表单项间距调整
苏州市房地产监测V3 调整了承办银行新增网点弹窗（YhwdDialog.vue）宽度与表单项布局。

## 变更说明
- 弹窗宽度：去掉 `width="60%"`，改为 `zs-size="mini"`（616px）
- 表单结构：去掉外层 `el-row`；`form-box` 内为 `zs-form` 直接包 `el-col :span="24"`；增加 `label-position="left"`、`label-width="120px"`
- 间距：删除对 `el-form-item__content` 的 `line-height: 36px` 覆盖，使用默认表单项间距；逻辑与校验未改

## 验证情况
- 当前环境无针对该页的 E2E；本地 `npm run build` 已通过
- 需在 承办银行详情 → 银行网点管理 → 新增/编辑 查看对齐，若单选组与输入框对齐有问题可微调

## 涉及文件
- `zhi2-web-admin/src/views/supervision/bank/cbyh/components/YhwdDialog.vue`
- `zhi2-web-admin/src/views/system/sysBankBranch/detail.vue`

## 验证与归属
- 所属项目：苏州市房地产监测V3；来源会话：3a875ff9-bacf-404f-a3fe-9efda64d3fa7；验证证据：extracted source=cursor

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "yhwd_dialog_ui_fix",
  "source_extraction_id": "70ada2145f094d8f8e1450f3ecb4f669",
  "version": 1,
  "memory_type": "entities"
}
-->