# Summary
用户提出需求：模型在不确定时应先向用户确认（账号密码/仓库地址/部署地址等仅用户可提供的信息），而非自行检索或猜测。助手于 2026-11-14 创建 clarify-first skill（仓库唯一源 D:\repository\skills\clarify-first\SKILL.md），复制安装到 C:\Users\Administrator\.dsh\skills\clarify-first\SKILL.md（SHA256 A7D6E5C6… 两份哈希一致，本会话已生效），在 AGENTS.md「提问与收尾」加「不确定先问（clarify-first）」指针，计划文件 .plan\clarify-before-act-20261114.md 置 approved + human_confirmed。是否提交 git 待用户确认。
# 2026-11-14 (Saturday) ChatLog:
**user [peer=github.com-tyvt-skills]**: 我需要做一个skill，或者设置，让模型不确定的时候多问我问题，比如账号密码这种的，肯定只能问我。还有仓库地址啊，部署地址啊，都可以问我一下，这样省很多自己检索确认的工作，给我一个方案，也可以不是skill。
...
**assistant [peer=github.com-tyvt-skills]**: User chose: skill + AGENTS.md pointer + install now. Let me create the skill file.
...
**assistant [peer=github.com-tyvt-skills]**: 已经落地完成。下面是方案和实际做好的东西。

## 结论：用一个新 skill `clarify-first` + 已在 AGENTS.md 加一行指针

它和已有的 `decision-options` 分工互补：
- `decision-options` 管**怎么问**（有决定就弹选项框）；
- `clarify-first` 管**什么该问、什么不该问**（凭据/地址类只能问用户，代码事实自己查）。

### `clarify-first` 的核心内容
- **必须问、禁止猜**：账号/密码/token/密钥、仓库地址/分支、部署环境地址、数据库连接串/库名、外部服务 URL/端口，以及「猜错代价高于问一次」的信息。
- **可以自答、不必问**：能 grep/read/glob 得到的代码事实、现有配置里的默认值、用户上轮已说过的——避免退化成事事都问。
- **判据**：①没它无法唯一推进 ②代码/配置里确实拿不到 ③猜错要返工或污染，三条同时满足才问。
- **问法**：一次 ask 多问题（≤3）问清，走 `decision-options` 的选项框规范；密码/token 让用户自己填，不给猜测选项。

### 已完成的落地
1. 新建 [clarify-first/SKILL.md](D:\repository\skills\clarify-first\SKILL.md)（仓库唯一源）。
2. 已复制安装到 `C:\Users\Administrator\.dsh\skills\clarify-first\SKILL.md`，**两份哈希一致**（SHA256 `A7D6E5C6…`），已在本会话 `<available-skills>` 中生效。
3. 在 [AGENTS.md](C:\Users\Administrator\.dsh\AGENTS.md)「提问与收尾」加了一行 `**不确定先问（clarify-first）**` 指针，既有条目语义未改。
4. 计划文件 [.plan/clarify-before-act-20261114.md](D:\repository\skills\.plan\clarify-before-act-20261114.md) 已置 approved + human_confirmed。

下次会话起，遇到账号密码/仓库地址/部署地址这类只能你提供的信息，模型会先弹选项问你，而不是自己去翻找或猜。

要提交到 git 仓库吗？仅提交 / 提交并推送 / 暂不处理——你说了我再动。

<!-- MEMORY_FIELDS
{
  "event_name": "clarify-first技能落地",
  "goal": "记录技能创建结果",
  "summary": "用户提出需求：模型在不确定时应先向用户确认（账号密码/仓库地址/部署地址等仅用户可提供的信息），而非自行检索或猜测。助手于 2026-11-14 创建 clarify-first skill（仓库唯一源 D:\\repository\\skills\\clarify-first\\SKILL.md），复制安装到 C:\\Users\\Administrator\\.dsh\\skills\\clarify-first\\SKILL.md（SHA256 A7D6E5C6… 两份哈希一致，本会话已生效），在 AGENTS.md「提问与收尾」加「不确定先问（clarify-first）」指针，计划文件 .plan\\clarify-before-act-20261114.md 置 approved + human_confirmed。是否提交 git 待用户确认。",
  "ranges": "0,33,45-52",
  "source_extraction_id": "dd41b3700f244a8899c5cd71dc79ba9a",
  "version": 1,
  "memory_type": "events"
}
-->