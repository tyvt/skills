- broker-detail 的 profile 经 `{ ...defaultProfile, ...this.record }` 合并，record 含列表完整行，字段映射须对齐 brokers.js 与 mock 数据。
- 「从业编号」绑定 profile.code 时标签同列表「人员编号」一致。
- netSignAuth 为空时处理空白渲染。
- 验证证据：门户/044.md

<!-- MEMORY_FIELDS
{
  "user": "default",
  "topic": "broker-detail从业编号标签同列表对齐",
  "source_extraction_id": "d66e7ada558a4d5b9a1ada1de81ccffc",
  "version": 1,
  "memory_type": "preferences"
}
-->