# 预售选证输入框标准化为 zs-input
苏州市房地产监测V3 的 presale 模块将两个 detail.vue 及对话框的 el-input 改为项目标准 zs-input。

## 变更内容
- permitExtend/detail.vue、permitCancel/detail.vue 由 el-input + @click.native 改为 zs-input（v-model、placeholder、suffix-icon、readonly、data-testid、@focus="openPermitSelect"）
- permitExtend/components/PermitSelectDialog.vue、permitCancel/components/PermitSelectDialog.vue 关键字框同步处理

## 验证
- presale 模块内已无 <el-input>
- ESLint 已通过（含缩进自动修复）
- E2E 的 data-testid 未改动，无需调整测试

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：permitExtend/detail.vue、permitCancel/detail.vue、对应 PermitSelectDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：d6b4b8eb-01cf-400b-bf07-683831f325f0；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "permit_input_std",
  "source_extraction_id": "2c79c87a304d4b9a9dcb02329c6a7a73",
  "version": 1,
  "memory_type": "entities"
}
-->