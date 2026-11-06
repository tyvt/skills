# main.js 弹窗未定义修复
产品2.0 修复 `createInstance` 加密初始化失败时因 `MessageBox` 未导入而抛出 ReferenceError 的问题。

## 问题原因
- `createInstance` 在加密初始化失败时会调用 `MessageBox.alert`（约第 228 行）
- `main.js` 里没有导入 `MessageBox`，导致抛出 `ReferenceError: MessageBox is not defined`

## 修复要点
- 在 `main.js` 补充导入：`import { MessageBox } from 'element-ui'`（与 `request.js` 一致）
- 刷新后安全通信初始化失败能正常弹出错误提示框

## 涉及文件
- zhi2-web-admin/src/main.js
- zhi2-web-admin/src/utils/element.js

## 验证与归属
- 验证证据：extracted source=cursor；所属项目：产品2.0
- 来源会话：acc74245-8bc5-4218-9129-63dabeb7d956

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "main.js弹窗未定义修复",
  "source_extraction_id": "2b8112992e1645e285c4faabaeefa847",
  "version": 1,
  "memory_type": "entities"
}
-->