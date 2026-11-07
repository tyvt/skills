# 网格最高备案均价校验pattern缺失修复
苏州市房地产监测V3 中「网格最高备案均价」因引用未定义的校验 pattern 导致合法小数被误判。

## 问题根因
- 文件：`priceParameters/detail.vue` 使用 `this.patterns.twoNumber` 做格式校验
- `@/patterns/index.js` 中一直未定义 `twoNumber`（同文件被引用的 `twoDecimalNumber` 也缺失）
- 校验规则无效或不一致时，合法小数如 `10000.89` 仍提示「请输入正确数字」
- 同目录价格备案页面（如 `recordPriceMngSuzhou`）对类似数字字段使用 `this.patterns.numeral`

## 修改内容
- `src/patterns/index.js`：补充 `twoNumber`、`twoDecimalNumber`（非负数，最多两位小数），修复存量、协议等页面引用
- `priceParameters/detail.vue`：将「网格最高备案均价」格式校验改为 `this.patterns.numeral`，与同模块其它价格字段一致；`10000.89`、`10000`、`0.5` 等均可通过

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证：重新编译/刷新后，在「价格备案参数维护」填 `10000.89` 失焦或保存验证
- 涉及文件：`priceParameters/detail.vue`、`@/patterns/index.js`、`src/patterns/index.js`
- 所属项目：苏州市房地产监测V3；来源会话ID：2543dc3c-a272-4323-8d7b-c3aed6515a71；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "price_pattern_missing",
  "source_extraction_id": "6677b5f047cc425687d16521ea64a021",
  "version": 1,
  "memory_type": "entities"
}
-->