# 预售弹窗异步加载与监听收敛
苏州市房地产监测V3 中预售申请相关弹窗统一引入异步加载工具与合并监听机制，解决快速关开导致的请求乱序与父级监听失效问题。

## 核心工具
- 新增 `src/utils/dialogAsyncLoad.js`，提供 `beginDialogAsyncLoad(vm, seqKey?)` 统一处理弹窗快速关开导致的请求乱序
- 请求携带 `loadSeq` 以保证顺序正确

## 组件层根因修复
- `zs-select-dialog` 原 `@opened="onOpen"` 会盖住 `v-on="$listeners"`，父组件 `@opened` 不生效，被迫 `watch visible` 拉数
- 改为 `mergedDialogListeners`：先跑内置 `onOpen`，再调用父级 `opened` / `open`

## 已改动业务弹窗
- `PresaleApplyCommitmentDialog` 为预售申请二次确认弹窗（从参数设置接口获取），使用 `@open` + `beginDialogAsyncLoad`，去掉 `watch visible`
- `PresaleSelectBuildingDialog` / `CashsaleSelectBuildingDialog`：`@opened` 拉楼幢；`watch visible` 仅关窗清 `selection`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`src/utils/dialogAsyncLoad.js`、`zs-select-dialog`、多处业务弹窗
- 所属项目：苏州市房地产监测V3；来源会话：e1a0c3c1-9712-4aa2-ae67-4d383688e23e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_async_load",
  "source_extraction_id": "cef2b075f6c0442896293524a42a0f30",
  "version": 1,
  "memory_type": "entities"
}
-->