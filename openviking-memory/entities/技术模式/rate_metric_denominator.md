# 统计率类指标分母取聚合字段
苏住房G 详情页户室/资金收缴率须取接口聚合字段为分母，空/0 分母回退 0.00 并禁除零。

## 问题背景
- 户室收缴率=已缴户数/本次申报总户数×100%，资金收缴率=累计实收/累计应收×100%
- 易误写分母取子表 tableData.length（分页/筛选局部数据，非总户数口径）
- 金额侧用列表行累加会漏减免/抵扣行
- 分母 0（新建单未绑房屋）裸除法得 NaN/Infinity 显示「NaN%」

## 解决方案
- 分子分母都取接口下发聚合字段，不用列表长度或行内累加二次派生
- 统一 rate(numerator, denominator) 纯函数：!denominator 或非正数返回 0，否则 toFixed(2)
- 悬浮提示文案与公式逐字一致，放 title/提示组件不另起小字
- 0 是有效值（已收 0 元显示 0.00，不显示 -）

## 验证与归属
- 涉及文件：property/feeDeclare2/detail.vue、index.vue、publicQuery/complex/components/regulatoryAccountPanel.vue
- 所属项目：苏住房G；来源会话：bdac3433-a0bc-4d7d-95c4-8c729d67f294；代码基线：fb3e960

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rate_metric_denominator",
  "source_extraction_id": "dafee6b6ceb14a54b7ef69adae82dbce",
  "version": 1,
  "memory_type": "entities"
}
-->