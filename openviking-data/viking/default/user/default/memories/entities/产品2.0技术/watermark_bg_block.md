# 页面白底盖住水印背景
水印挂在 #app-main 背景层，中间链路不透明 background:#fff 卡片会整块盖死水印，需逐层把容器背景改 transparent。

## 问题背景
- 用户要求 app-main 加全站水印，但详情页看不到或局部被白块挡住，反复反馈「还是被挡住」
- 已知「全局水印被页面高层遮挡」由水印侧解决（水印层改挂 body + fixed 对齐，z-index 1990），本条是不动水印改容器透明度
- 详情页链路最易漏的是公共 detail-template 根节点白底，其次是小按钮块

## 解决步骤
- 定位链路 #app-main → 页面容器 → ListTemplate/detail-container → detail-template 根节点，按层实测背景色
- .detail-template 把 background:#fff 换 background-color:transparent，保留 border 与圆角
- .detail-text-button 默认 background-color 改 transparent，:hover/:active 保留浅蓝 #ecf5ff
- 标签与值区域不要单独加白底；若仍被挡优先怀疑 v-html 富文本行内 background 或 .detail-container 卡片底色

## 验证与归属
- 来源会话 0dd4d311：用户连续 3 轮反馈详情页看不到水印，定位 detail-template 根节点白底盖住
- 涉及文件：detail-template.vue、src/styles/index.scss、AppMain.vue、mixins/ListTemplate.js
- 所属项目：产品2.0；代码基线：e0dae0d

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "watermark_bg_block",
  "source_extraction_id": "770fdb55ea6d4c7ebbe5d0d9060bf199",
  "version": 1,
  "memory_type": "entities"
}
-->