# 预售转现售交付日期回显修复
苏州市房地产监测V3 项目修复了预售转现售时「项目交付日期」不回显的问题，涉及 CashsaleInfoPanel.vue 等文件。

## 修复内容
- `CashsaleInfoPanel.vue`：转现售模式将禁用 date-picker 改为只读 input，新增 `deliveryDateDisplay` 计算属性，查看态同步格式化日期
- `CashsaleDetail.vue`：在 `detailCallback` 等函数中统一用 `formatDateOnly` 规范化 `deliveryDate`
- `cashsaleConstants.js`：新增 `formatDateOnly` 工具函数兼容 `yyyy-MM-dd HH:mm:ss`

## 验证要点
- 打开已有记录查看/编辑页，「项目交付日期」应显示 `2026-12-23`
- 新增转现售选证后日期应从来源接口回显
- 查看态详情模板日期同样可见

## 归属信息
- 所属项目：苏州市房地产监测V3
- 来源会话：ea7bee22-7116-4196-826f-6c6b9042e05a
- 涉及文件：`CashsaleInfoPanel.vue`、`CashsaleDetail.vue`、`cashsaleConstants.js`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashsale_date_fix",
  "source_extraction_id": "8ac21a9135c44085aa6571c2f9166d98",
  "version": 1,
  "memory_type": "entities"
}
-->
