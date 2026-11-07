# 业主决策确认弹窗适用区标注与发布tag规范
业主决策确认弹窗须红字标注适用区；交付时 tag 仅打在父仓。

## 弹窗文案
- 小程序/H5 点击业主决策前的确认弹窗在原文案上方空一行增加：业主决策功能适用范围：梁溪区、滨湖区、新吴区。（红字加粗）

## 发布规范
- 子模块 dev_wuxi-sfb 提交后，父仓 zhi2-mobile-shimin-h5-c-unlimited 更新子模块指针
- tag 只打在父仓（如 202610231020 指向含子模块提交的父提交），子模块可不打 tag

## 验证与归属
- 验证会话：01a16680-39de-70c5-a400-76a50aec295e
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/components/owner-decision-confirm-modal/owner-decision-confirm-modal.vue、src/hooks/usePortal.js
- 所属项目：无锡市区小程序嵌入H5；代码基线：290ba16

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "owner_decision_confirm_tag",
  "source_extraction_id": "0957e23374eb461f907f3dcfd6432d36",
  "version": 1,
  "memory_type": "entities"
}
-->