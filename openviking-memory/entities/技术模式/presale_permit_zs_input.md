# 预售选证输入框改用zs-input聚焦打开对话框
苏州市房地产监测V3 预售模块选证字段由 el-input + @click.native 改为 zs-input 并绑定 @focus 打开选择对话框。

## 变更内容
- permitExtend/detail.vue 与 permitCancel/detail.vue 选证字段由 el-input 改为 zs-input
- 绑定 @focus="openPermitSelect" 替代原 click 事件
- PermitSelectDialog.vue 同步处理，presale 模块已无 el-input

## 验证情况
- ESLint 通过，E2E 的 data-testid 未变
- 涉及文件：permitExtend/detail.vue、PermitInfoPanel.vue、permitCancel/detail.vue、PermitSelectDialog.vue 等

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/066.md
- 来源会话ID：d6b4b8eb-01cf-400b-bf07-683831f325f0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_permit_zs_input",
  "source_extraction_id": "f693a59fc8b14fa8a5001f904bae2259",
  "version": 1,
  "memory_type": "entities"
}
-->