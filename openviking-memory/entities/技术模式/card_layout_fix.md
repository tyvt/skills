# 工作牌与信息卡弹窗布局修复
苏州市房地产监测V3 的 zhi2-web-admin 修复了机构人员详情页中工作牌与电子信息卡弹窗的布局错乱与未居中问题。

## 问题原因
- `vue-qr` 默认是 inline 元素，`margin: 0 auto` 不生效导致二维码未居中
- 字段标签宽度不一致，内容起始位置参差不齐
- 工作牌头部机构 logo 与名称未居中
- 卡片在弹窗内缺少 `width: 100%`、`margin: 0 auto` 等约束，未稳定居中

## 修复内容
- `InfoCardDialog.vue`：二维码外层增加 flex 居中容器；字段改为 `label + value` 行布局，标签固定 `5.5em` 右对齐；卡片水平居中并限制 `max-width: 100%`
- `WorkCardDialog.vue`：头部机构信息居中；信息区字段同样采用对齐行布局；底部二维码增加白底容器；长机构名称支持换行避免挤压二维码

## 验证与归属
- 验证：刷新后在已备案人员详情页点击「个人工作牌」「电子信息卡」查看效果
- 所属项目：苏州市房地产监测V3
- 涉及文件：`InfoCardDialog.vue`、`WorkCardDialog.vue`、`AgencyPersonnelDetail.vue`
- 来源会话ID：3bb79189-7e5a-4f02-909b-f9bdf9a2ecb3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "card_layout_fix",
  "source_extraction_id": "4c5863872528481481ed07628faa9249",
  "version": 1,
  "memory_type": "entities"
}
-->