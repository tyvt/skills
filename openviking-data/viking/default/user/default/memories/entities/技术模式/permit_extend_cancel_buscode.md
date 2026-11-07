# 预售许可延展/注销附件 busCode 菜单解析
苏州市房地产监测V3 中 permitExtend 与 permitCancel 模块移除硬编码 busCode，改为与 permit 模块一致的菜单解析方式。

## 修改内容
- `permitExtendConstants.js`：移除硬编码 `EXTEND_APPENDIX_BUS_CODE = 'ysxkyx'`，新增 `resolveExtendAppendixBusCode(route)`
- `permitCancelConstants.js`：移除硬编码 `CANCEL_APPENDIX_BUS_CODE = 'ysxkzx'`，新增 `resolveCancelAppendixBusCode(route)`
- `detail.vue`（两个模块）：`appendixBusCode` 计算属性改为调用上述解析函数

## 解析顺序
- 当前路由 `meta.busCode`
- 按 `filePath` 回退到列表页/详情页菜单
- 兜底查找 `presale/permitExtend/index`、`presale/permitExtend/detail`（延展）；`presale/permitCancel/index`、`presale/permitCancel/detail`（注销）

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 涉及文件：`permitExtendConstants.js`、`permitCancelConstants.js`、`detail.vue`
- 来源会话ID：cf874868-688d-405b-89d8-993329405b67
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_extend_cancel_buscode",
  "source_extraction_id": "7363ffb17ce0413da919427f6f448e60",
  "version": 1,
  "memory_type": "entities"
}
-->