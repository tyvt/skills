# 门户首页 card-body 上 padding 被更具体选择器覆盖
门户 index-new.vue 只改基础 .card-body 的 padding 常不生效，业务中心、常用功能、待办/公告等子区块用更具体选择器与 !important 把 padding 设回。

## 问题根因
- 基础 .card-body padding 改动被后续更具体规则覆盖
- 业务中心 .business-center .card-body 写 padding: 16px 20px
- 常用功能 .func-grid 带 padding: 20px !important
- 待办/公告 .todo-body、.notice-body 用 !important 单独设上内边距

## 修复方向
- 去掉「上 padding」需在子选择器里将 padding-top 改为 0，左右与下保持不变
- 业务中心内容垂直居中悬空多为 .business-center .card-body 的 justify-content:center，贴顶需改 flex-start
- 排查 592–602 行基础样式后定位到子选择器与 !important 设回

## 验证与归属
- 验证证据：extracted source=cursor project=门户
- 验证证据：用户改 592–602 行基础样式后反馈仍有多余上 padding，改子选择器 top 为 0 后生效；另见 src=门户/047.md
- 涉及文件：zhi2-web-admin/src/views/home/index-new.vue
- 所属项目：门户；来源会话ID：53c81de5-13e7-48d9-a133-ec5ba59583c5；代码基线：04586c4

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "card_body_padding",
  "source_extraction_id": "56a38fda692548cf82b2bcef6e1ba103",
  "version": 2,
  "memory_type": "entities"
}
-->