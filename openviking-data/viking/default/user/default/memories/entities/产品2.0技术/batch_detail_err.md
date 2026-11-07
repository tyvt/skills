# 批量接口改 /detail 误伤动作与统计类接口
按 V3 规范批量将拼主键的接口改为 POST …/detail 会误伤动作类与统计类接口，须按「实体详情 / 查询 / 动作」三类分词后改造。

## 问题根因
- 脚本按 URL 形态匹配，把 publish、calculationChart 这类非详情接口也改成 …/detail
- 真正规范应按语义分三类：实体详情拼 /detail，纯查询与动作接口保持原路径 + body
- 误改后消息发布、表决图表、大屏统计等接口路径错乱，前端报 invalid JS syntax、vue 模块加载失败白屏

## 解决方案
- 改造前先产出「接口 → 类别」清单并人工过一遍，动作类（publish/pass/cancel/submit）与统计图表类一律排除
- 逐个改完跑一次 vite build 兜底语法与引用错误（本次恢复后 build 约 2m27s 通过），不要只看 dev 热更
- 把误改清单落盘成 scripts/audit-wrong-detail-apis.json 供联调比对
- 联调回归重点覆盖消息发布/撤回、表决图表、大屏统计这三类被误伤的接口

## 验证与归属
- 来源会话 ab733ff8：用户要求把拼 ID 接口全部改掉并全局排查，批量脚本误改 publish、calculationChart 等
- 最终按「操作类 action + body、查询类原路径 + body、实体详情保留 /detail」回滚约 93 个文件，列出误改清单 JSON
- 涉及文件：zhi2-web-admin/src/api、zhi2-web-admin/scripts/audit-wrong-detail-apis.json
- 所属项目：产品2.0；代码基线：62d5fb9

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "batch_detail_err",
  "source_extraction_id": "8bfe7b9f72d7470eae3c3aa21cb9be36",
  "version": 1,
  "memory_type": "entities"
}
-->