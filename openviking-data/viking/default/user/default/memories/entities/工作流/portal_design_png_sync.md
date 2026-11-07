# 门户设计稿 PNG 与 PORTAL_DESIGNS 对接
仓库视觉底座默认要求设计目录恰好 24 张 PNG、按文件名 Unicode 排序并与 PORTAL_DESIGNS 24 条逐条对应。

## 背景
- 新版设计仅 20 张时不能只替换下载目录，需通过 portal-visual-reference.py 等生成 hybrid 参考、更新夹具索引/几何，并在报告中记录「忽略的旧变体」
- 未改 mock、路由与原始下载目录

## 操作流程
- 对齐任务前应快照分支便于回滚
- 交付报告需含「忽略的 10 个旧变体」与 portal-visual-reference.py；新版 20 张、旧版 24 张路径并列说明

## 涉及文件
- zhi2-web-admin/tests/e2e/fixtures/public-portal-designs.ts
- zhi2-web-admin/scripts/portal-visual-reference.py
- zhi2-web-admin/test-results/portal-design-sync-report.md

## 关联信息
- 所属项目：门户；来源会话 ID：2bcfc14a-d4b3-4c95-bd2c-a5ae8c791258；代码基线：2785dd9

<!-- MEMORY_FIELDS
{
  "category": "工作流",
  "name": "portal_design_png_sync",
  "source_extraction_id": "54e46530937a4ae2aa43b2926881ee38",
  "version": 1,
  "memory_type": "entities"
}
-->