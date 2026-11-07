# 银行日明细提示语优化
园区公共收益项目将银行回单提示语优化为直接可执行的句式。

## 优化内容
- 原提示「查询银行回单需选择未对账」优化为「请将对账方式、对账状态均设置为「未对账」」
- 去掉「查询银行回单需」：用户已点击「银行回单」按钮，无需重复说明操作场景
- 「选择未对账」改为「设置为「未对账」」：明确这是两个筛选项要填的值
- 与同页第 299 行「请选择管理账户和记账日期」句式统一，采用直接可执行句式

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 涉及文件：src/views/benefit/pubBankDetailDay/index.vue
- 所属项目：园区公共收益；来源会话：5ac0a40f-9d17-413b-8527-695560ab5344

<!-- MEMORY_FIELDS
{
  "category": "园区公共收益技术",
  "name": "pubbank_prompt_fix",
  "source_extraction_id": "097cc9e742094ebe90d460565fc77958",
  "version": 1,
  "memory_type": "entities"
}
-->