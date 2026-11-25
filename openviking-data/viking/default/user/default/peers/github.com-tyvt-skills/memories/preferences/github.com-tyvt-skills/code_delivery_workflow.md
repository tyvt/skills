- 实现代码改动时，交付给用户评审，不自动提交到 git（另有明确授权时除外）。
- 验证通过后由用户选择提交方式（仅提交 / 提交并推送），但带禅道链接的任务例外：确认验证通过即视为已授权提交推送+回写禅道、不再二次询问提交方式（禅道任务免二次问 P0，详见「禅道bug回写时机」偏好）；无禅道链接时跳过禅道回写，直接清理临时产物。
- 前端类任务的提交/推送方式征询推迟到实机验证出图并经用户确认之后再问，不在计划确认轮提出。

<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "code_delivery_workflow",
  "source_extraction_id": "f64e8adab86e4b74bcdd0adb628dd3f6",
  "peer_id": "github.com-tyvt-skills",
  "version": 8,
  "memory_type": "preferences"
}
-->