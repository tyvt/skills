# ExpenseList.vue 重复导入ref修复
苏住房C 项目中 zhi2-mobile-shimin 的 ExpenseList.vue 因从 vue 重复导入 ref 触发 ESLint 报错，已删除多余导入并可重新提交。

## 问题根因
- ExpenseList.vue 第 28 行已 import { inject, ref } from 'vue'，第 34 行又 import { ref } from 'vue' 造成重复导入，ESLint 报错

## 修复方案
- 删除第 34 行的重复导入语句，ESLint 检查通过
- 重新提交前执行 git add zhi2-mobile-shimin/src/pages_owner/maintain/components/ExpenseList.vue 再 git commit

## 涉及文件
- zhi2-mobile-shimin/src/pages_owner/maintain/components/ExpenseList.vue（绝对路径 d:\repository\苏住房C\zhi2-mobile-shimin\src\pages_owner\maintain\components\ExpenseList.vue）

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：82027868-3f83-446c-a0bf-5e3fec501631；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "expense_eslint_fix",
  "source_extraction_id": "c5da469e9b4a4b088bae5107870a77e1",
  "version": 1,
  "memory_type": "entities"
}
-->