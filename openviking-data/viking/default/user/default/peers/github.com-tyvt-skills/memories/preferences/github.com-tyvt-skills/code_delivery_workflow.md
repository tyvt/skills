- 实现代码改动时，交付给用户评审，不自动提交到 git（另有明确授权时除外）。
- 如果验证交叉检查（例如 JS 与 Python 哈希比对）不一致，停止并报告，而不是自行调整。
- 前端类改动须过实机验证门（agent-browser 打开页面并截图）后再交由用户确认；验证门未通过不算完成。
- 提交前核对 diff 范围，只提交任务相关文件；历史遗留改动、注册表数据与来源不明的临时文件不纳入本次提交（来源不明者先核对时间戳再判断）。
- 推送/拉取遇网络故障时不重复同形态重试，如实报告并保留本地提交，待网络恢复后执行 git push。
- 验证通过后由用户选择提交方式（仅提交 / 提交并推送）；本任务无禅道链接时跳过禅道回写，直接清理临时产物。

<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "code_delivery_workflow",
  "source_extraction_id": "73c4afa79d41462f87ecf9065e268d76",
  "peer_id": "github.com-tyvt-skills",
  "version": 3,
  "memory_type": "preferences"
}
-->