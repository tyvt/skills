# 价格备案苏州详情页项目名称弹窗修复
苏州市房地产监测V3 项目修复价格备案苏州详情页「项目名称」弹窗 SelectDialog 无「确定」按钮的问题。

## 问题根因
- 「项目名称」弹窗的 SelectDialog 被写成 `:show-checkbox="false"` 和 `:show-confirm="false"`
- 组件选择列由 `showCheckbox` 控制，为 `false` 时不渲染左侧勾选列，只剩「关闭」、没有「确定」

## 修复方案
- 去掉上述两个属性，恢复默认勾选列和「确定」按钮
- 增加 `@setData="pickProject"`，选中后点确定仍走原 `setProject` 并关闭弹窗
- 「项目名称」列改为普通文本，与同项目其他 SelectDialog 用法一致

## 验证与归属
- 刷新页面后重开「开发项目」选择弹窗，左侧应出现勾选列、底部为「取消 / 确定」
- 仍异常可硬刷新或重启前端 dev 服务
- 涉及文件：recordPriceMngSuzhou/detail.vue、List.vue、zs-select-dialog-func.vue
- 所属项目：苏州市房地产监测V3；来源会话：bfa17afc-3bee-45e4-bec0-2bbab63d0c19

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhou_dialog_fix",
  "source_extraction_id": "f8016802bbdc45ea86428e1387fbac2b",
  "version": 1,
  "memory_type": "entities"
}
-->