# 预售页基本信息统一Headline展示
苏州市房地产监测V3 预售页基本信息原用 zs-tabs 卡片 Tab 或无标题边框，与预售方案 Headline 样式不一致，现统一用 Headline 包裹。

## 问题现象
- 基本信息原使用 zs-tabs 卡片 Tab 或无标题边框
- 与预售方案 Headline 样式不一致

## 解决方案
- PermitInfoPanel.vue 强制用 Headline 包裹表单
- detail.vue 移除单一 zs-tabs 并删 hideHeadline 相关逻辑
- 实现分区标题蓝色圆点统一

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：cursor session=e6742834-ef8f-41c0-9875-0bc367ca292b
- 涉及文件：components/Headline/index.vue、views/presale/permit/components/PermitInfoPanel.vue、views/presale/permit/components/detail.vue、views/presale/permitCancel/detail.vue、components/zs-tabs/zs-tabs.vue、views/presale/permit/components/PermitPlanPanel.vue、views/presale/cashsale/components/CashsaleInfoPanel.vue
- 来源会话ID：e6742834-ef8f-41c0-9875-0bc367ca292b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "presale_headline_unify",
  "source_extraction_id": "e4d17952d7944d45bd6e4325da53fe2a",
  "version": 1,
  "memory_type": "entities"
}
-->