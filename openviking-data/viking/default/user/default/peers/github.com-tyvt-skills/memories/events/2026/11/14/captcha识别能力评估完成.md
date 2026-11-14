# Summary
2026-11-14 用户（github.com-tyvt-skills）反映 captcha 识图通过图形验证码能力很差，要求评估现有 skill 并结合历史会话给出优化方式。助手在本地 magpie 视觉网关实测：默认模型 `auto/hy3` 早在 2026-11-09 被确认不支持图像识别，正常噪声 24 张准确率仅 70.8%（17/24），换 `auto/deepseek-v4.1-flash` 达 100%（24/24）；极端噪声 30 张两者均降至约 53-57%，叠加多数投票(K=5)可回升至 73.3%。结论主因为默认模型选错而非识图能力本身，已输出评估报告（D:epository\skills\.tmp_cap\captcha-evaluation.md），纯评估未改代码，落地需走计划→送审→确认流程。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 目前captcha识图给答案通过图形验证码的能力还是很差，评估一下现有的skill，给我一个优化方式，结合skill历史会话记录
...
**assistant [peer=github.com-tyvt-skills]**: 评估完成。下面是结论与优化方式（报告文件：`D:\repository\skills\.tmp_cap\captcha-evaluation.md`）。

## 核心诊断：主要是"默认模型选错了"，不是识图能力本身不行

我在本机 magpie 视觉网关上，用带答案 key 的算术验证码图对**现有脚本**和**候选模型**做了实测对比：

| 场景 | 当前默认 `auto/hy3` | `auto/deepseek-v4.1-flash` |
|---|---|---|
| 正常噪声 24 张（单次） | **17/24 = 70.8%** | **24/24 = 100%** |
| 极端噪声 30 张（单次） | 56.7% | 53.3% |
| 极端噪声 + 多数投票(K=5) | — | **73.3%** |
| 极端噪声 + 3×上采样 | **73.3%** | 53.3% |

**关键发现：`auto/hy3` 早在 2026-11-09 就被确认为"不支持图像识别"（已从全部视觉基准剔除），而 `solve-captcha.mjs` 第 21 行恰恰把它设成默认模型；`SKILL.md` 也写"hy3 支持识图"。** 同一批图换模型直接 70.8%→100%。hy3 的错误形态是"认错数字再算对"（8+9→105、4×8→348），典型弱视觉模型表现。

## 结合历史会话
OpenViking `login_ocr_workflow`（会话 44f9e8a5/be5b577d）记录：之前 Tesseract+规则纠错识别扭曲算式**同样不稳定**（常返回 yee/CW），当时建议"测试环境 /code 直接给 answer 或弱化校验"。→ 说明纯 OCR 在扭曲图上都有天花板，工程上要"识别 + 兜底"两手。你的偏好也明确：**不用 tesseract，走 magpie 识图模型**——本方案遵守。

## 优化方案（按性价比）
- **P0 换默认模型**：`hy3`→`auto/deepseek-v4.1-flash`，并修正 SKILL.md 错误表述。→ 70.8%→100%（零成本最大收益）。
- **P1 抗噪**：加**多数投票(K=3)** + **合法性/自洽校验**（拒绝 348 这类离谱值）；低置信度时可选 **2–3× 上采样**再试（实测对弱模型有效）。
- **P2 工程兜底**：识别失败→**刷新验证码换图重试**（同 uuid 会话内，最多 2–3 次）；可控站点推动 `/code` 返回 `answer` 或固定值做兜底；多模型 fallback。

报告里含改法（`--vote/--upscale/--model` 参数化 + `confidence` 输出）和验证计划（A 组≥95%、B 组≥75%、Playwright 连续登录成功率）。

---
本报告是**纯评估**，我没有改技能代码（改代码需走计划→送审→你确认流程）。要我**按这个方案落地改 `solve-captcha.mjs` + SKILL.md** 吗？如需实施，我会先出 `.plan` 改动计划送审、再请你确认。
...
**assistant [peer=github.com-tyvt-skills]**: 已交付评估报告。总结一句：**识图差的主因是脚本默认用了不支持识图的 `auto/hy3`，换成 `auto/deepseek-v4.1-flash` 实测 70.8%→100%；再叠加多数投票/校验/换图重试可补齐噪声场景的鲁棒性。**

需要我继续**落地改代码**的话告诉我，我会先出改动计划送审、再请你确认后动手。

<!-- MEMORY_FIELDS
{
  "event_name": "captcha识别能力评估完成",
  "goal": "评估验证码识别根因",
  "summary": "2026-11-14 用户（github.com-tyvt-skills）反映 captcha 识图通过图形验证码能力很差，要求评估现有 skill 并结合历史会话给出优化方式。助手在本地 magpie 视觉网关实测：默认模型 `auto/hy3` 早在 2026-11-09 被确认不支持图像识别，正常噪声 24 张准确率仅 70.8%（17/24），换 `auto/deepseek-v4.1-flash` 达 100%（24/24）；极端噪声 30 张两者均降至约 53-57%，叠加多数投票(K=5)可回升至 73.3%。结论主因为默认模型选错而非识图能力本身，已输出评估报告（D:\repository\\skills\\.tmp_cap\\captcha-evaluation.md），纯评估未改代码，落地需走计划→送审→确认流程。",
  "ranges": "0,99,101",
  "source_extraction_id": "c439850a573546f29b3f2658258f1979",
  "version": 1,
  "memory_type": "events"
}
-->