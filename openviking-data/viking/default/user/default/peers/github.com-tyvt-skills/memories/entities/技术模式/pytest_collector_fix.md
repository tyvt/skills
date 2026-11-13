# pytest 采集器版本兼容崩溃与修复
pytest 9.x 与 anyio/langsmith/pluggy 等插件不兼容导致采集器启动崩溃（NodeId._str_cache 缺失）的识别与锁版本修复方案。

## 问题根因
- pytest 9.2.0 移除/重命名了 NodeId._str_cache 属性；anyio 4.12.1、langsmith 0.14.17、pluggy 1.7.0 等插件仍假定 8.x 内部结构
- 崩溃路径：FixtureDef.__init__ 读取 node.nodeid → NodeId.__str__ → self._str_cache 缺失，抛 'NodeId' object has no attribute '_str_cache'
- 全量 pytest 会话因此起不来，无法做回归验证

## 修复方案
- 降级并锁定 pytest 到 8.x 系列（pip install "pytest>=8.4,<9"，实测 8.4.2 可用）
- 在 requirements.txt 锁 pytest>=8,<9 并注明原因，防止被升到 9.x 复发
- 锁版本后全量 pytest 回归通过（43 passed，含新增 test_plan_review_p0.py 6 用例）

## 验证与归属
- 会话 2026-11-13：诊断 pytest 9.2.0 为元凶，降级至 8.4.2 后 43 passed，方案第6节改为「已修复 + 全量 pytest 回归」
- 关联：audit_link_fix 曾因同款 NodeId._str_cache 崩溃改用直接断言验证，本修复后该绕行不再需要

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "技术模式",
  "name": "pytest_collector_fix",
  "source_extraction_id": "c389a0fa386a43f0b8517315442aad33",
  "version": 1,
  "memory_type": "entities"
}
-->