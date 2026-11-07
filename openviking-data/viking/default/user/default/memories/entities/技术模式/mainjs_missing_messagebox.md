# main.js漏导MessageBox致加密引用错误
createInstance加密初始化失败时调用MessageBox.alert，但main.js未导入MessageBox导致ReferenceError。

## 问题根因
- main.js未导入MessageBox，而createInstance加密失败逻辑调用了MessageBox.alert
- 导致运行时ReferenceError，加密初始化失败无法提示

## 解决方案
- 在main.js补充import { MessageBox } from 'element-ui'以匹配request.js导入
- 涉及文件：src/main.js、src/utils/element.js、src/utils/request.js

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：src=产品2.0/080.md
- 来源会话ID：acc74245-8bc5-4218-9129-63dabeb7d956
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mainjs_missing_messagebox",
  "source_extraction_id": "d9a197141e654eb98942cde621312789",
  "version": 1,
  "memory_type": "entities"
}
-->