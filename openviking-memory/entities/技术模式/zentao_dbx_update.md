# 禅道 Bug 状态回写（DBX 直写）
当禅道 API 工具不可用时，通过 DBX 直连数据库事务化更新 bug 状态的可复用工作流。

## 适用场景
- 禅道 API 工具被阻断时，改用 DBX 直连 SQL 更新
- 需同时更新 zt_bug 主表与 zt_action 操作历史表

## 更新 zt_bug 字段
- status=resolved、resolution=fixed、resolvedBuild=trunk
- resolvedBy=处理人、resolvedDate=解决时间、assignedTo=指回原提单人(reporter)
- 事务内 begin/update/insert/verify/commit，提交后另起新连接复核持久化

## 插入 zt_action 操作历史
- 一条 resolved/fixed/rnd 动作，product 取 bug 自身 product（不同 bug 产品可能不同，如 6245 为 42）
- 备注写入根因、修复方案、验证数据、提交号与发布 tag，便于回溯
- 实例：bug 6245（用户管理不显示用户）回写 action #87983，resolvedBy=tiany，assignedTo=zhangleixin
- 实例：bug 5983（Navbar返回首页跳门户）回写 action #89165，resolvedBy=tiany，assignedTo=lichandan，resolvedDate=2026-11-09 11:25:06
- 实例：bug 6235（户室翻页失效）回写 action #89271，resolvedBy=tiany，assignedTo=lichandan，resolvedDate=2026-11-09 13:11:15，备注含订正根因/修复/提交号/验证/待客测回归
- 实例：bug 6173（价格备案户室页面抖动）回写 action #89291，resolvedBy=tiany，assignedTo=lichandan，resolvedDate=2026-11-09 13:27:49，备注含根因/修复/验证/提交号

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zentao_dbx_update",
  "source_extraction_id": "4a4d1f29fd6c432081c7e4bc7fa7172c",
  "version": 4,
  "memory_type": "entities"
}
-->