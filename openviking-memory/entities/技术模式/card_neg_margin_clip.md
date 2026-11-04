# 首页卡片负上边距与溢出隐藏裁切
门户首页 index-new 卡片因 .card-body 设负 margin-top 且容器 overflow:hidden，导致顶部图标与文字被裁切。

## Description
- 现象：常用功能图标与公告首行被切，根因为 .card-body 设 margin-top:-8px 且容器 overflow:hidden。
- 涉及文件：zhi2-web-admin/src/views/home/index-new.vue、src/styles/index.scss 等。
- 来源会话ID：2a87516f-bc63-420e-9c43-3e2e10205bfd（extracted source=cursor）。

## Solution
- 去掉负 margin，统一 `$design-card-body-padding-top:6`（约506行）。
- 将常用功能/公示公告 .card-body 改 overflow:visible。
- 同步修改 e2e 文件 portal-home-visual.spec.ts 等确保布局。

## Verification
- 验证证据：extracted source=cursor session=2a87516f-bc63-420e-9c43-3e2e10205bfd。
- 涉及文件含 index-new.vue、index.scss、zs-table.vue、package.json、playwright.config.ts。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "card_neg_margin_clip",
  "source_extraction_id": "96758bb922ef469fa059939f20317c82",
  "version": 1,
  "memory_type": "entities"
}
-->