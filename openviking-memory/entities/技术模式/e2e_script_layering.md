# 防汛 E2E 脚本分层分批规范
防汛 E2E 扩到8模块后清理27个临时调试脚本，保留分层主脚本与探针，交付前删净 e2e-debug-*。

## 问题现象
- 防汛 E2E 从1模块扩到8模块、全类型批跑58/58通过后，工作区堆了27个 e2e-debug-*.cjs 临时脚本
- 脚本不分层会导致公共逻辑复制多处，调试脚本混主链让交接困难

## 分层方案
- e2e-flood-lib.cjs 放公共能力（登录、接口调用、断言、录像、fixture装配）
- batch1/batch2 按菜单分批跑全类型CRUD，-menu/-merge 覆盖菜单与合并，probe-endpoints 只做接口探针
- 调试脚本一律 e2e-debug-* 前缀，交付前整目录删除不进版本库

## 清理纪律
- fixture数据、SYS_FLOW_CONFIG、本地se配置由用户决定保留，不替用户删
- 历史脏单据先评估影响再决定留清，交付报告写清保留/删除及原因

## 验证与归属
- 来源会话 session-14dff73a（基线6156653）收官：删27个 debug 脚本，保留主脚本与探针
- 遗留风险第3条：4张历史脏单据保留dev可手工提交无业务影响
- 涉及文件：e2e-flood-lib.cjs、e2e-verify-flood.cjs、e2e-flood-crud-video.cjs、e2e-probe-endpoints.cjs

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_script_layering",
  "source_extraction_id": "676b5978950e4a3fbe7a36b00cf074be",
  "version": 1,
  "memory_type": "entities"
}
-->