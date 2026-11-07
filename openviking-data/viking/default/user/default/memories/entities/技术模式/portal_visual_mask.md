# 门户视觉比对设计稿头部 1px 伪影屏蔽
public-portal 视觉失败若集中在设计 PNG 头部色块最底 1px 白边，而实机渲染为纯色底：先按像素坐标确认是否为切图伪影。

## 处理规则
- 属伪影时在 public-portal-designs.ts 对该行加 masks（比对双方同置白）通过门槛
- 不要为通过测试去改 UI 色值
- 本会话索引 12 头部 94.07%→95.58% 即如此修复

## 验证与归属
- 验证证据：设计稿头部切片在 66px 绿底最底行（全图 y=111）带 1px 白边裁切伪影，在夹具对该 1px 行加 masks 屏蔽（双边同置白，不改 UI）
- 涉及文件：zhi2-web-admin/tests/e2e/fixtures/public-portal-designs.ts
- 所属项目：门户；来源会话 ID：2bcfc14a-d4b3-4c95-bd2c-a5ae8c791258；代码基线：be0bc4eaa

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "portal_visual_mask",
  "source_extraction_id": "e88d7ad093b243e2bf01f883f5d8b250",
  "version": 1,
  "memory_type": "entities"
}
-->