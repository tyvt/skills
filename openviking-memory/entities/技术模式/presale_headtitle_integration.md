# 预售模块详情页接入HeadTitle
苏州市房地产监测V3 的预售与现售备案详情页已按计划接入 HeadTitle 顶栏组件。

## 现售备案改动
- `zhi2-web-admin/src/views/presale/cashsale/components/CashsaleDetail.vue`：顶栏展示申请编号、业务状态（tag）、创建时间
- 有 `recordNo` 时增加「现售备案编号」
- 右侧方案/要件标题行 56px 对齐
- `zhi2-web-admin/src/views/presale/cashsale/components/CashsaleInfoPanel.vue`：查看态增加「基本信息」Headline
- `DetailTemplate` 去掉与顶栏重复字段

## 预售许可改动
- `zhi2-web-admin/src/views/presale/permit/components/detail.vue` + `PermitInfoPanel.vue`：同上模式（申请编号 / 状态 / 创建时间）

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 所属项目：苏州市房地产监测V3
- 来源会话：36af5c21-311a-4501-8279-0576fa11d22e
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_headtitle_integration",
  "source_extraction_id": "f096da90f9b54af4ad0fcc8abdafe82d",
  "version": 1,
  "memory_type": "entities"
}
-->