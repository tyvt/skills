# 房屋质量保证金备注不显示修复
修复房屋质量保证金管理详情页备注不显示的问题，涉及查看模式隐藏与数据解析不完整两处原因。

## 问题原因
- 查看模式隐藏备注字段：contentInfo 中备注配置 visible: !!this.form.remark，备注为空时整行不渲染
- 详情数据解析不完整：detailCallback 只使用 response.data.summary，remark 在 data 根节点时保存后刷新丢失

## 修复内容
- guaranteeDepositAccount/detail.vue 去掉备注 visible 条件，查看模式始终显示备注（无内容显示 -）
- 调整 detailCallback 合并 summary 与根级字段，确保 remark 正确回填
- 新增明确 getForm()，保存时显式提交 remark 字段

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 所属项目：产品2.0
- 来源会话：3faac03b-5c75-454c-a0d1-79ae56a3ac95
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "guarantee_remark_fix",
  "source_extraction_id": "34b4c24c5f494281ba1ca2287f22b231",
  "version": 1,
  "memory_type": "entities"
}
-->