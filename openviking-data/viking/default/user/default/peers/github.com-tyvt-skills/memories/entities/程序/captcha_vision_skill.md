# 验证码识图技能 captcha-vision
验证码识图技能，调用视觉模型解析算术验证码，由 github.com-tyvt-skills 维护。

## 基本配置
- 入口脚本 solve-captcha.mjs，配套文档 SKILL.md
- 默认视觉模型 auto/deepseek-v4.1-flash（2026-11-14 由 auto/hy3 切换）
- 支持环境变量 CAPTCHA_VISION_MODEL 覆盖默认模型

## 约束与边界
- auto/hy3 不支持识图，文档已明确标注勿用其做识图（2026-11-14 修正）
- 默认模型对 X-1?= 版面易将减号+1 读成负数（如8-1→-4），属约5%固定弱点
- 确定性复跑稳定，非随机失败

## 测试基线
- 同生成器合成测试：deepseek-v4.1-flash 约95% 通过，旧 hy3 约71%

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "程序",
  "name": "captcha_vision_skill",
  "source_extraction_id": "8a8d1a88a0194313add5e1e14ac7dd8c",
  "version": 1,
  "memory_type": "entities"
}
-->