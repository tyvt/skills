# 门户E2E双栏permit区对齐断言
public-portal-visual.spec.ts 中 expectSharedFormDialogLayout 对容器下全部 .portal-detail-row 要求标签/值落在同一绝对列（max-min ≤ 1px）。

## 问题根因
- PropertyDetailDialog 许可区使用 portal-permit-pair 双栏 grid 时，左右列 x 坐标不同
- 全局单列对齐断言会误报失败

## 解决方案
- 对双栏区域按列 scope 断言、拆成左右子选择器各测一列
- 或为双栏布局单独写 layout spec
- 勿用「整页所有 detail-row 同一列」的共享 helper

## 验证与归属
- 验证证据：会话 5983c99f [MEDIUM] E2E 与双栏排版假设冲突，index 23 仍调用 expectSharedFormDialogLayout
- 涉及文件：zhi2-web-admin/tests/e2e/public-portal-visual.spec.ts、zhi2-web-admin/src/views/home/publicPortal/components/PropertyDetailDialog.vue
- 所属项目：门户；来源会话ID：5983c99f-13e3-4b40-9938-495cc42f24ff；代码基线：门户 zhi2-web-admin @ e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_e2e_permit",
  "source_extraction_id": "ae068e827ad74504ac580e2a7560d494",
  "version": 1,
  "memory_type": "entities"
}
-->