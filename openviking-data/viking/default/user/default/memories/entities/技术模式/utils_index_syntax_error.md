# src/utils/index.js 语法错误导致编译失败
src/utils/index.js 第 322 行多了一个右括号，导致 `[plugin:uni:mp-inject] Unexpected token (322:22)` 构建报错，移除多余括号后构建成功。

## 问题根因
- src/utils/index.js 第 322 行存在多余 `)` 语法错误
- 触发 `[plugin:uni:mp-inject] Unexpected token (322:22)` 终端报错

## 解决方案
- 修改 amountTransform 函数，移除多余右括号
- 重新构建验证通过（exit_code: 0）

## 验证与归属
- 验证证据：extracted source=cursor project=i-H5
- 涉及文件：src/utils/index.js、dist/dev/mp-weixin/utils/coordinateTransformer.js
- 所属项目：i-H5；来源会话ID：875e0e77-9f6b-4bd3-97c0-7a51e3f5ec9f；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "utils_index_syntax_error",
  "source_extraction_id": "57bd400ac05b43899f12695d6493c645",
  "version": 1,
  "memory_type": "entities"
}
-->