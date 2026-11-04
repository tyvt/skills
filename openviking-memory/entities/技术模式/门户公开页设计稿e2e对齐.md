# 门户公开页设计稿对齐 E2E 与分支约定
zhi2-web-admin 公开门户（publicPortal）UI 与设计稿对齐时的回归测试与批量改动分支约定。

## E2E 回归
- 回归命令：npm run test:e2e:public-portal，像素相似度门槛约 95%，弹窗态约 85%
- 视觉测试规格：public-portal-visual.spec.ts；设计稿 fixtures：public-portal-designs.ts；参考脚本：portal-visual-reference.py
- 新稿目录文件名与 fixtures 不一致时，先做「混合目录 + 按状态过滤」再跑 public-portal-visual.spec.ts

## 分支与报告
- 大批量 overnight 改动应先切独立分支并提交快照
- 对齐报告落在 test-results/portal-design-sync-report.md
- 分支保留待人工 review，不自动合并

## 验证与归属
- 验证证据：定时任务说明 14 个可匹配状态、test:e2e:public-portal 95%/弹窗 85%、portal-design-sync 分支与报告路径
- 涉及文件：zhi2-web-admin/tests/e2e/public-portal-visual.spec.ts、zhi2-web-admin/tests/e2e/fixtures/public-portal-designs.ts、zhi2-web-admin/scripts/portal-visual-reference.py、zhi2-web-admin/src/views/home/publicPortal/README.md
- 所属项目：门户；代码基线：2785dd9；来源会话：2f4babe0-cf16-41eb-a18d-0455aa70129e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "门户公开页设计稿E2E对齐",
  "source_extraction_id": "62fc301bc6864bb894572ac62ef8afce",
  "version": 1,
  "memory_type": "entities"
}
-->