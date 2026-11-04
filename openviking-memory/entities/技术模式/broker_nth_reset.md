# 门户双栏表单 nth-child 标签宽断点重置
BrokerPages 等机构信息区用固定两列 grid 配合 nth-child 设置左右列不同标签宽，窄屏单列化时必须统一并覆盖 nth-child 规则。

## 问题根因
- BrokerPages 等机构信息区用固定两列 grid（如 455px 284px），通过 nth-child(2n)/nth-child(2n+1) 为左右列设置不同 --portal-form-label-width（360px vs 168px）
- 窄屏（max-width:760px 或 1200px）改为单列堆叠后，奇偶 nth-child 不再对应「左/右列」
- 导致标签宽 360px 与 168px 交替、值列无法纵向对齐

## 修复方向
- 窄屏统一 --portal-form-label-width（全宽行 .broker-field-full 可单独加宽）
- 移除或覆盖窄屏下的 nth-child 变量规则
- 需说明 DOM 顺序与桌面双栏奇偶对应关系

## 验证与归属
- 验证证据：会话 03d20bf9 [HIGH] 窄屏单列仍沿用机构 nth-child 标签宽
- 涉及文件：zhi2-web-admin/src/views/home/publicPortal/pages/BrokerPages.vue
- 所属项目：门户；来源会话ID：03d20bf9-e86f-46c1-aa96-4b6f60f3e8f1；代码基线：门户 zhi2-web-admin @ e1f8e0b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "broker_nth_reset",
  "source_extraction_id": "53b97c16cee14d85a13ad8202c60d342",
  "version": 1,
  "memory_type": "entities"
}
-->