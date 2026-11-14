# captcha-recognizer

位于 D:\repository\skills 仓库的验证码识图技能，核心脚本为 scripts/solve-captcha.mjs。

## 用途
- 自动识别验证码图片并返回识别文本。
- 由 SKILL.md 文档与可执行脚本 solve-captcha.mjs 组成。

## 模型配置
- 默认识图模型为 auto/deepseek-v4.1-flash，于 2026-11-14 由 auto/hy3 改为此值。
- 同日移除文档中关于 hy3 识图的误述。

## 实测表现
- 同生成器测试下 deepseek-v4.1-flash 准确率约 95%（24 张识别 23/24、40 张识别 38/40），结果确定性稳定。
- 旧默认 auto/hy3 在同条件下准确率约 71%。
- 残余约 5% 失败集中在 `X-1?=` 被读成负数的固定版面弱点。

## 待办
- 阈值触发的合法性校验与低置信重试两项增强按用户建议暂缓，未实施。
- 修复计划留档于 .plan/captcha-model-fix.md，目前仍是未跟踪文件。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "技能/工具",
  "name": "captcha-recognizer",
  "source_extraction_id": "ea33a1dc5f9a42c1861736fd22831fff",
  "version": 1,
  "memory_type": "entities"
}
-->