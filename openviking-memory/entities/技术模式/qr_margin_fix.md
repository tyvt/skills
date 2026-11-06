# 电子信息卡弹窗二维码边距修复
苏州市房地产监测V3 修复 `vue-qr` 默认 `margin=20` 导致电子信息卡/工作牌弹窗二维码留白过大问题。

## 根因
- `vue-qr` 默认 `margin=20`，在 `:size="50"` 时留白占比过大，叠加容器 `padding:4px` 更明显

## 改动
- `vue-qr` 增加 `:margin="0"`、`:white-margin="false"` 让码图铺满 50px
- 容器 `.work-card__qr-wrap` / `.info-card__qr-wrap` 去掉 `padding:4px`，固定 50×50px 且 `overflow:hidden`
- 两个弹窗（WorkCardDialog、InfoCardDialog）同步修改；若扫码异常可把 `margin` 调为 `1`

## 涉及文件
- `src/views/institution/agencyPersonnel/components/WorkCardDialog.vue`
- `src/views/institution/agencyPersonnel/components/InfoCardDialog.vue`
- `src/views/presale/cashsale/components/CashsaleDetail.vue`
- `src/views/presale/cashsale/components/CashsaleInfoPanel.vue`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：271fe773-92e0-4ead-a113-8889fcea1743
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "qr_margin_fix",
  "source_extraction_id": "2ba2686ff52a4d9c9c970639d6f824f6",
  "version": 1,
  "memory_type": "entities"
}
-->