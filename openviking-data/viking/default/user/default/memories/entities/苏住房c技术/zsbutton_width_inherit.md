# ZsButton宽度继承致flex按钮组重叠
苏住房C小程序中，SuccessCard按钮区flex+space-between与ZsButton内部width:inherit叠加，两个按钮各占100%宽度互相挤压，文字重叠变形。
## 根因
- SuccessCard按钮区display:flex+justify-content:space-between，ZsButton设width:inherit继承父容器100%宽度
- 在flex容器里两个各占100%按钮互相挤压，属自研按钮默认宽度契约与并排布局冲突
## 解决方案
- 不改ZsButton默认width:inherit（影响全站单个按钮铺满），改为按钮组`.btn-group :deep(.zs-button){flex:0 0 300rpx;width:300rpx;margin:0}`
- 改在共享SuccessCard组件层，五个success页一次修好；顺带统一padding避免漂移
- 定位信号：按钮文字重叠且页面flex排布按钮，先怀疑按钮组件width:inherit/100%
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话500973f3，success UI紊乱；修复为.btn-group固定300rpx并统一padding/背景色
- 涉及文件：SuccessCard.vue、ZsButton.vue、owner/success.vue、family/success.vue、uni.scss
- 所属项目：苏住房C；来源会话ID：500973f3-9d75-48cf-8744-7385f4f59190；代码基线：5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "zsbutton_width_inherit",
  "source_extraction_id": "b9d8b7ebce554cb182f77784992bd5df",
  "version": 1,
  "memory_type": "entities"
}
-->