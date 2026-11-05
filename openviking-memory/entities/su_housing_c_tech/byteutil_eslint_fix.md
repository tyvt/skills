# byteUtil.js ESLint混合缩进修复
苏住房C 项目中 zhi2-mobile-shimin 的 byteUtil.js 因混用空格与 Tab 触发 ESLint 的 no-mixed-spaces-and-tabs 规则，已修复并可重新提交。

## 问题根因
- byteUtil.js 在 longToByte 和 intToByte 函数中混用空格与 Tab，触发 no-mixed-spaces-and-tabs 规则导致 pre-commit 检查失败

## 修复方案
- 统一第 40–43 行、54–57 行的缩进，消除混合缩进
- 对该文件执行 eslint --fix 自动修正其余可修复项
- 重新提交前需先 git add zhi2-mobile-shimin/src/static/js/utils/byteUtil.js 再 git commit

## 涉及文件
- zhi2-mobile-shimin/src/static/js/utils/byteUtil.js（绝对路径 d:\repository\苏住房C\zhi2-mobile-shimin\src\static\js\utils\byteUtil.js）

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：926ce7a5-ca77-4897-82df-2246d6158736；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "byteutil_eslint_fix",
  "source_extraction_id": "c5da469e9b4a4b088bae5107870a77e1",
  "version": 1,
  "memory_type": "entities"
}
-->