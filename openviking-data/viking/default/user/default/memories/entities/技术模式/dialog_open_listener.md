# 弹窗打开事件监听修复与异步加载
苏州市房地产监测V3 修复 zs-select-dialog 打开事件覆盖父级监听问题，并新增弹窗异步加载工具。

## 监听合并
- `zs-select-dialog` 原 `@opened="onOpen"` 覆盖 `v-on="$listeners"` 导致父组件 `@opened` 失效
- 改为 `mergedDialogListeners` 先内置 `onOpen` 再调用父级 `opened`/`open`

## 异步加载
- 新增 `src/utils/dialogAsyncLoad.js` 的 `beginDialogAsyncLoad` 处理弹窗快速关开请求乱序
- 业务弹窗改用 `@open` 触发并去除 `watch visible`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/033.md
- 涉及文件：system.js、presale/permit/index.vue、presale/permit/components/index.vue、mixins/listMixins.js、路由信息.json、presale/entrustSale/index.vue、system/config.js、indemnity/contract/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：e1a0c3c1-9712-4aa2-ae67-4d383688e23e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_open_listener",
  "source_extraction_id": "85ea740928034a10883a86b895152c50",
  "version": 1,
  "memory_type": "entities"
}
-->