# 首页V2多数据源并发加载序号保护
苏住房G首页 V2（views/home/index-v2.vue）并发加载多面板，每个面板有 tab 切换，需每个加载函数独立持有请求序号防竞态。

## 问题根因
- Vue2 无通用丢弃过期响应机制，多加载函数共享状态只能用「每函数一个 seq」
- 已有 keyDataFetchSeq/todoPanelFetchSeq，但后加的 loadStudyList 无 seq，快速连点 tab 时旧慢响应先返回覆盖新 tab 内容，表面「点 tab 没反应/数据串了」无报错
- loadBenefitData/loadRepairData 同样缺竞态保护

## 解决方案
- 每个异步加载函数声明模块内递增计数器（如 studyListFetchSeq++），请求前 const seq = ++xxxSeq，then/finally 先判 if (seq !== xxxSeq) return 再写状态
- 评审按「加载函数清单」逐个核对 seq，新增面板把 seq 当必写项

## 验证与归属
- 验证：评审指出 index-v2.vue:274-291 loadStudyList 未用 seq，230-272 loadBenefitData/loadRepairData 同样无保护
- 涉及文件：zhi2-web-admin/src/views/home/index-v2.vue
- 所属项目：苏住房G；来源会话ID：22db11e4-4ebb-4504-8a6e-e93aa9791182；代码基线：9e5c499

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "v2_load_seq",
  "source_extraction_id": "b3536856883b46aa95bcd23a6b8147f5",
  "version": 1,
  "memory_type": "entities"
}
-->