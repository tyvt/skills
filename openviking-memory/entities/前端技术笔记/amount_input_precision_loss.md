# 金额输入框失焦精度被静默改写
金额输入框（AmountInput）对超大数值（整数部分接近 15-17 位双精度上限）失焦时执行 parseFloat().toFixed(2)，导致末位精度被静默改写且用户改不动。

## 现象
- 用户输入 125624562315348.15，失焦后自动变回 .16 且无法改回
- 不是表单校验问题，而是 JS 双精度浮点表示极限所致

## 根因
- parseFloat('125624562315348.15') 本身被舍入成 125624562315348.16，任何走 Number 通道的格式化都必然丢失末位精度

## 解决方案
- 失焦格式化改用字符串处理函数 formatFixedDecimal，彻底绕开 parseFloat/toFixed
- 千分位展示的 currencyFormatter 也一并改为字符串处理
- 若业务需要更大金额，后端用字符串或 Decimal 类型存储，前端全程按字符串处理
- 排查「值改完又跳回去」类问题时先看数值位数是否超 15 位

## 验证与归属
- 验证：会话 5c77c754 用户报告 125624562315348.15 失焦变 .16；根因定位为 AmountInput 失焦执行 parseFloat().toFixed(2) 浮点舍入，改为字符串格式化后修复
- 涉及文件：src/components/AmountInput/index.vue、src/formatters/index.js、src/directives/formatter/money.js
- 所属项目：园区物管2.0；来源会话ID：5c77c754-4ae9-4947-9275-18a14a38dd9d

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "amount_input_precision_loss",
  "source_extraction_id": "5b26d684e1994d57a0497c243d77061a",
  "version": 1,
  "memory_type": "entities"
}
-->