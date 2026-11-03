# src/utils/index.js 多余括号致编译失败
src/utils/index.js 第322行 amountTransform 函数多余右括号导致语法错误，移除后正常返回格式化数值。

## 问题现象
- src/utils/index.js 第322行 amountTransform 函数存在多余右括号导致语法错误

## 解决方案
- 移除多余右括号
- 函数正确返回格式化数值

## 验证与归属
- 验证证据：src=i-H5/001.md
- 涉及文件：src/utils/index.js
- 所属项目：i-H5；代码基线 none；来源会话 875e0e77-9f6b-4bd3-97c0-7a51e3f5ec9f

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "amount_transform_paren",
  "source_extraction_id": "7bf82be17f474ef1b475cb00d486216c",
  "version": 1,
  "memory_type": "entities"
}
-->