# 电梯维护费明细异步参数丢失修复
修复电梯维护费/公共能耗明细因异步导致 mainId 丢失、列表无法加载的问题。

## 改动说明
- detail.vue：给 z-paging 增加 :auto="false"，避免 onLoad 赋值前自动请求
- detail.vue：queryList 增加 mainId 校验，缺失时直接 complete([]) 返回不发无效请求
- detail.vue：保留 onLoad 里 nextTick 后的 reload()，等参数就绪再加载
- index.vue：跳转时 mainId 取值 row.mainId || row.maintenanceId，兼容接口返回 maintenanceId

## 验证方式
- 电梯维护费 → 点「明细」→ 列表正常加载
- 公共能耗 → 点「明细」→ 正常
- 切换「收入/支出」tab → 正常刷新

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 涉及文件：pages_benefit/elevatorPubEngCons/detail.vue、index.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：18d36ae9-021f-4f26-8bea-d76327f2b6e8

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "elevator_param_fix",
  "source_extraction_id": "02646a38798d4274816c0f4acd8a2a27",
  "version": 1,
  "memory_type": "entities"
}
-->