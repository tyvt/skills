# ZsImage默认width:100%/height:100%需父容器给确定尺寸否则算成0
苏住房C小程序两处图片不显示，资源路径都存在，根因都是ZsImage默认尺寸在父容器里失去参照算成0宽或0高。

## 问题现象
- pages_owner/house/index「历史添加记录」前的蓝色历史图标看不见
- pages_owner/house/owner/addHouse 帮助弹窗里的示例图只剩空白占位（margin-bottom 还在）

## 根因
- ZsImage 内部默认 width:100%、mode=aspectFill 时 height:100%
- 图标放 flex 行且自身没定尺寸，父容器宽度由内容撑开 → 100% 参照为 0，算成 0 宽
- 弹窗 .instructions-img 写固定 height:284rpx 与组件内部 height:100% 冲突，实际渲染高度为 0

## 解决方案
- 图标外套固定尺寸容器（如 28rpx×28rpx）让 100% 有参照，补 subpackage="pages_owner" 并设 mode="aspectFit"
- 演示/说明图改用 mode="widthFix" 按宽等比缩放，删掉外层固定 height 不再冲突
- 弹窗内图用 v-if="visible" 等打开后再渲染，小程序对隐藏容器里的 image 不加载

## 验证与归属
- 验证：会话 2d44d303 图标宽度算成0改固定28rpx容器+subpackage+aspectFit；会话 44137331 弹窗改 widthFix 去固定高 + v-if 延后渲染
- 涉及文件：components/ZsImage/ZsImage.vue、pages_owner/house/index.vue、pages_owner/house/owner/addHouse.vue、utils/index.js
- 所属项目：苏住房C；来源会话ID：2d44d303-a0e8-48dd-9747-099eab934704, 44137331-91dc-4b0c-ad74-f6c700c9aaf6；代码基线：f1939b0

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "zsimage_size_bug",
  "source_extraction_id": "fe7c48b530a64b4a9825c5f0ecbd6ae5",
  "version": 1,
  "memory_type": "entities"
}
-->