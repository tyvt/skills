# flex 横向卡片长文本挤压封面图
苏住房C 辖区小区列表 flex 横向卡片中长地址把左侧封面图挤压变形，需三件套 flex-shrink:0 + min-width:0 + word-break。

## 现象与根因
- pages_owner/community/info/index 的 .detail_item 为 flex 横向排列（左封面图 .link-icon，右文字区 .item_bottom），地址一长左侧封面图被挤窄变形
- 根因：flex 子项默认 flex-shrink:1，只写 width:100px 不能阻止压缩；右侧文字区未设 min-width:0 时默认 min-width:auto 让长串文字反向撑开抢空间
- 两个方向力叠加使图片变窄；任何「图标/头像/缩略图 + 可变长文本」横排卡片有极端长文本即复现

## 解决方案
- 图片侧加 flex-shrink: 0 并显式写死宽高 100px × 76px（像素为准）
- 文字容器加 flex: 1; min-width: 0，占剩余空间不撑开
- 地址等长文本加 word-break: break-all，保证换行不外溢
- 同类布局（消息列表、附件行、成员卡片）默认套用这三件套

## 验证与归属
- 验证证据：会话 1db8ec36 用户截图反馈地址挤压封面图；修改 .link-icon 增 flex-shrink:0 固定 100px×76px，.item_bottom 增 flex:1; min-width:0，.item_address 增 word-break:break-all
- 涉及文件：pages_owner/community/info/index.vue、subdistrict/info/index.vue、company/info/index.vue、committee/info/index.vue
- 所属项目：苏住房C；来源会话ID：1db8ec36-d2b1-4f40-9ca7-140c53112d51；代码基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "flex_card_shrink",
  "source_extraction_id": "822c31f3d8f34cd88bf5d0b804a2c0f8",
  "version": 1,
  "memory_type": "entities"
}
-->