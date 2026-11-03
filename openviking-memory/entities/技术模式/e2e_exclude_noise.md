# E2E 偶发超时先排除并行噪音
跑全流程 E2E 首次出现偶发超时时，先排除 dev server 冷编译与并行排查噪音，再判定产品缺陷。

## 问题根因
- E2E 偶发失败有两类根因：产品缺陷与环境噪音
- 环境噪音常见来源：dev server 冷编译占满 CPU、同时跑别的排查任务（DB 查询、日志 tail、脚本探针）
- 噪音会拖穿 Playwright 默认超时，被误判为缺陷

## 排查做法
- 超时先分类：随机散布多用例且耗时接近阈值多为噪音；固定某步每次都在多为真缺陷
- 排查时串行化：先停并行探针/日志/DB 查询，待 dev server 冷编译完成再跑 E2E
- 给冷启动留余量（预热页面或调大超时），但不用调大超时掩盖稳定失败
- 记录每个用例耗时，便于下次超时对比同一位置
- 重跑全绿后结论写「首次超时因环境噪音，清空干扰后全绿」，不只报 PASS

## 验证证据
- 会话 session-80e78cbf-5439-4db6-bf65-920d4fe3ee80（基线 b6ffc68）全流程 E2E 首次超时因冷编译+并行噪音，清空干扰后 6/6 全绿
- 用例耗时：verify-flood 16.8s / flood-crud 71.0s / flood-crud-video 96.1s / batch1-video 537.2s / batch2-video 384.7s / flood-menus-video 126.2s

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "e2e_exclude_noise",
  "source_extraction_id": "155efbc385c642a1986bf21689227a2b",
  "version": 1,
  "memory_type": "entities"
}
-->