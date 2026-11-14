- 模型不确定时（尤其账号/密码/token/密钥、仓库地址/分支、部署环境地址、数据库连接串/库名、外部服务 URL/端口，以及「猜错代价高于问一次」的信息）必须先问用户，禁止自己猜测或检索 (as of 2026-11-14)
- 可自答、不必问：能 grep/read/glob 得到的代码事实、现有配置里的默认值、用户上轮已说过的，避免事事都问 (as of 2026-11-14)
- 问的判据：①没它无法唯一推进 ②代码/配置里确实拿不到 ③猜错要返工或污染，三条同时满足才问 (as of 2026-11-14)
- 问法：一次 ask 多问题（≤3）问清，走 decision-options 选项框规范；密码/token 让用户自己填，不给猜测选项 (as of 2026-11-14)

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "user": "github.com-tyvt-skills",
  "topic": "clarify-first提问原则",
  "source_extraction_id": "dd41b3700f244a8899c5cd71dc79ba9a",
  "version": 1,
  "memory_type": "preferences"
}
-->