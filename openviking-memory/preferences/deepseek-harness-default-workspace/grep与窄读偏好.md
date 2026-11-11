- grep 先行、read 窄读：对同一文件先 grep -n 拿全部命中行号，再合并成 1–2 次 read offset/limit（单次 ≤120 行），禁止边读边猜下一段；禁止整读超过 300 行的文件，同一文件同一段落不重复读。
- grep 必须限定到目标业务目录；全仓/跨目录 grep（如 src/**/*.vue）必须先缩范围或走 orchestrate，否则易打穿成本阈值（2026-11-10 审计：seq 85 全仓 grep 约 16–17k 未命中）。
- 列表列宽类 bug 不读截图：grep `label: '<列名>'` → read offset 定位 → edit 宽度，截图非必需（2026-11-10 bug6401 报告建议，已落地 SKILL.md）。

<!-- MEMORY_FIELDS
{
  "user": "deepseek-harness-default-workspace",
  "topic": "grep与窄读偏好",
  "source_extraction_id": "e79985170b10468ab5a79b5307f3ffae",
  "version": 2,
  "memory_type": "preferences"
}
-->