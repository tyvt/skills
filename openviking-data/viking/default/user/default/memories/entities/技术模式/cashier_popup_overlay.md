# 收款明细弹窗未隐底栏遮罩透明致叠层
物业手持B端收款明细弹窗因未隐藏 fixed 底栏且遮罩透明导致双底栏与穿透。

## 问题根因
- 根因：`src/pages/cashier/result.vue` 打开收款明细弹窗时未隐藏 fixed `payment-bar` 且遮罩透明导致双底栏与穿透

## 解决方案
- 隐藏 `payment-bar`、遮罩改 `rgba(0,0,0,0.45)`
- 隐藏 `collect-detail-popup::after` 并强制全宽白底 column 布局
- footer 复用 `popup-total` 横向布局，移除 `min-height:360rpx`

## 验证与归属
- 所属项目：物业手持B端
- 验证证据：extracted source=cursor project=物业手持B端
- 验证证据：src=物业手持B端/003.md
- 涉及文件：src/pages/cashier/result.vue、src/components/ZsPopup/ZsPopup.vue、src/components/ZsTab/ZsTab.vue、src/components/ZsPicker/ZsPicker.vue、package.json
- 来源会话ID：0d7926b1-415d-4b76-a62c-ff3faf16bc27
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cashier_popup_overlay",
  "source_extraction_id": "b4c8026653be44108193df34322483d4",
  "version": 1,
  "memory_type": "entities"
}
-->