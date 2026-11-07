# 预售附件在转现售中的复用
苏州房地产监测V3的标准，在转现售时复用预售的只读附件。

## 路由定义
- `cashsaleConstants.js` 定义被 `resolveAppendixBusCode` 识别的业务代码 `yszxs`。

## 组件与装配
- 创建 `CashsaleTransferAppendixPanel.vue`，用于获取标记为只读的预售附件（`ysxksq` + `presalePermitId`）。
- 通过 `AnnexUpload` 和 `handleConfig` 拼接表单自身的附件。
- `mapAppendixPackageList` 执行附件的映射。

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：b682e5d0-7ff0-4125-961e-04c9a7ebb147
- 验证证据: src=苏州市房地产监测V3/104.md
- 所属项目: 苏州房地产监测V3; 会话: b682e5d0-7ff0-4125-961e-04c9a7ebb147; baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_transfer_appendix",
  "source_extraction_id": "79cf24bafc744c04973bd842fa4e560f",
  "version": 1,
  "memory_type": "entities"
}
-->