# 组织架构页横幅写死宽高导致图片拉伸
远程横幅图 `header.png` 实际尺寸 1125×240，旧实现写死宽高导致比例失调拉伸。
## 问题根因
- 远程横幅图 `header.png` 实际尺寸 1125×240。
- 旧实现 hero 高 400rpx 且图片写死 `width: 1875rpx` 右对齐裁切，导致比例失调拉伸。
## 解决方案
- 应按实际宽高比动态适配布局。
## 验证与归属
- 验证证据：src=泰兴小程序/019.md
- 涉及文件：src/pages/staff/organization/index.vue、src/components/ZsImage/ZsImage.vue、src/staff/hooks/useStatusBar.js、src/pages.json、C:/Users/Administrator/.workbuddy/plans/swift-cascade-einstein-xdoWLiJG.md、D:/repository/泰兴小程序/.workbuddy/memory/2026-09-11.md、D:/repository/泰兴小程序/.workbuddy/memory/MEMORY.md
- 来源会话ID：371a6c86-dc85-4ff6-8ae9-d65fa186df19
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "org_banner_stretch",
  "source_extraction_id": "7d61ff9cb043451387acea9d3a28c31a",
  "version": 1,
  "memory_type": "entities"
}
-->