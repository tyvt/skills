# 二手房详情联系业主区域UI修复
苏住房C小程序二手房详情底部「联系业主」区域UI错乱已修复，涉及 detail.vue 与 ZsImage.vue。

## 问题原因
- 头像用 `ZsImage`，组件内图片为 `width/height: inherit`
- 父组件 scoped 样式 `.header-img { 40px }` 无法穿透子组件
- 图片高度异常拉伸，底部栏被撑高并遮挡上方房源详情

## 修复内容
- `detail.vue`：头像外包固定 `40px` 圆形容器，用 `:deep(img)` 约束图片尺寸；机构图标补缺失的 `company-icon` 样式（原 `w-24` 类不存在）
- `ZsImage.vue`：将 `inherit` 改为 `100%`，由父容器控制尺寸

## 验证与归属
- 底部恢复正常：头像 40px 圆形，「联系业主」按钮与业主信息同行，上方详情不再被遮挡
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`pages_transaction/stockHouse/detail.vue`、`components/ZsImage/ZsImage.vue`、`agentDetail.vue`
- 来源会话ID：3c86796a-b65f-466f-a1d2-266feae580a5


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "stockhouse_contact_fix",
  "source_extraction_id": "7bbfec6e00654c00b561e884e8122dfc",
  "version": 1,
  "memory_type": "entities"
}
-->