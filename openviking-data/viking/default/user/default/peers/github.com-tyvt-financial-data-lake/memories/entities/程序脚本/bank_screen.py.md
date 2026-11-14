# bank_screen.py
沪深选股脚本共用的银行专项判定模块，位于 D:/repository/数据湖/分析产出/。

## Description
- 提供共用函数 bank_gate（约第 25、71 行），沪市 screen_sh.py 与深市 screen_sz.py 均调用
- 原有判定覆盖核心一级资本、不良率、拨备率等银行专项监管指标

## 2026-11-14 变更
- 新增近三年平均股息率门槛 yld3 > 5%，使用严格大于比较
- 缺失或无效股息率一律判定不通过；非银行标的完全不受影响

## Relations
- 被 screen_sh.py、screen_sz.py 共用，避免沪深银行标准分叉
- 判定说明同步写入《筛选标准_最终版.md》第 104–114 行


<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-financial-data-lake",
  "category": "程序脚本",
  "name": "bank_screen.py",
  "source_extraction_id": "255647515d6a4646a2d7d4bdf2b38fde",
  "version": 1,
  "memory_type": "entities"
}
-->