# 视觉回归基线与设计稿不一致的处理
视觉回归相似度下降时，先归因基线过期还是样式退化；基线过期则覆盖同名fixture图并标注「当前实现截图」，原设计稿留git历史。
## 背景
- 基线图两种来源：原始设计稿(交付物)与「当前实现截图」(回归基准)；实现偏离原设计稿时混在一套fixture里无法解释相似度下降
- 后人会把基线图误当设计交付物
## 解决方案
- 先归因：对比页面高度与基线图高度是否错位——本批页面高度1864→1911，确认基线过期而非样式退化
- 重拍基线覆盖同名fixture文件而非新增：operation-guide-designs.ts里index 4/5/6的maskBanner、normalizeIllustration归一化逻辑按原文件路径设计，保留路径即复用参考图管线
- 拍摄参数固定(1920×1080、DPR 2、fullPage、animations:disabled)
- README.md标注这三张是「当前实现截图」、商品房四张仍是原始设计稿；原设计稿留git历史可git checkout取回；临时采集脚本删掉不入库
## 验证与归属
- 验证：覆盖住房租赁(3).png(企业)/住房租赁(2).png(经纪机构)/住房租赁.png(个人)；相似度下降归因页面高度错位
- 涉及文件：tests/e2e/fixtures/operation-guide-designs.ts、src/views/home/operationGuide/README.md、operation-guide-visual.spec.ts
- 来源会话：session-eb7cae1d-c1b7-4d63-a83b-4f50c9385846、session-8d2fa9f1；代码基线：b6165db

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "visual_baseline_overwrite",
  "source_extraction_id": "5d05348d377f486f9526d8d733266d81",
  "version": 1,
  "memory_type": "entities"
}
-->