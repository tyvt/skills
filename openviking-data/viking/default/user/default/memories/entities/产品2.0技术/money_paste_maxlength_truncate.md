# 金额指令粘贴被maxlength截断
产品2.0 金额输入框粘贴「1,111,111」时被截断成 1111，根因是 maxlength 在清洗前抢先截断含千分位逗号的原文。

## 问题现象
- 金额输入框粘贴「1,111,111」只能进 4~5 位变成 1111，后几位凭空丢失
- 发生在 src/directives/formatter/money.js 的 onpaste 逻辑

## 根因分析
- 输入框带 maxlength 时，浏览器先把剪贴板原文（含千分位逗号）按字符数截断，之后指令 setTimeout 才去 input.value 去逗号
- 逗号在截断时已占用 maxlength 配额，被删后得到的就是双重损耗的值

## 解决方案
- 粘贴处理必须 e.preventDefault() 放弃浏览器默认插入，用 e.clipboardData.getData('text') 取原文
- 用 stripMoneyGrouping 正则（/[,，\s\u00A0\u202F]/g，覆盖中英文逗号与各类不间断空格空白）先去分组符，再按当前选区拼进已有值，最后对整段再统一去一次分组符
- 重写 value 前先算 prefixCleanLen，用 requestAnimationFrame 恢复光标位置避免错位
- 核心结论：凡「先插入、后异步清洗」的输入处理都会被 maxlength 抢先截断，清洗必须前移到 preventDefault 之后的同步阶段

## 验证与归属
- 会话 9c57feb1 结论：onpaste 改为 preventDefault + clipboardData 取原文 + stripMoneyGrouping 先清洗再拼值，修复「1,111,111 被卡成 1111」
- 涉及文件：src/directives/formatter/money.js；所属项目：产品2.0；来源会话：9c57feb1-7d80-4322-82da-ffd6c882352d；代码基线：8d416b2

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "money_paste_maxlength_truncate",
  "source_extraction_id": "bc5533b031084dca9b5380a9980fa8ec",
  "version": 1,
  "memory_type": "entities"
}
-->