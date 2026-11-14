---
session: clarify-before-act-20261114
status: approved
human_confirmed: true
approved_sha256: 442abcbe6fd69cfdd91e47ff57fa9e5af803c7f013007fdca6e8a8d833101560
approved_version: 1
---

# 不确定先问：新 skill `clarify-first`

## ① 前因后果
模型对「凭据类信息（账号密码、仓库地址、部署地址、库名）」经常自己去检索试错，既慢又不可靠。希望这些只能问用户的事项在不确定时直接弹选项问，而不是硬猜。

## ② 现状与证据
- 已有 `decision-options` skill（C:\Users\Administrator\.dsh\skills\decision-options\SKILL.md，91 行）：负责"有待定事项就弹选项框"，但**只管呈现形式**，不规定"哪些信息必须问、禁止猜"。
- 仓库 D:\repository\skills 是 skill 源码库（decision-options 等）；安装目录 C:\Users\Administrator\.dsh\skills\。
- 新 skill 与 decision-options 互补不重叠：decision-options=出口强制，clarify-first=信息缺口识别 + 恰好只问一次。

## ③ 实施方案
1. 新建 `D:\repository\skills\clarify-first\SKILL.md`（仓库为唯一源，唯一新增文件，disjoint scope）：
   - frontmatter: name/description（触发词收窄为：不确定、账号/密码/token/密钥、仓库地址/分支、部署环境、数据库连接串；不写泛词"地址""连接"）。
   - 核心：**必须问、禁止猜**的信息清单——凭据（账号/密码/token/api key）、仓库地址/分支、部署地址/环境、数据库连接串/库名、外部服务 URL/端口；以及"无法从上下文推断+猜错代价高于一次提问"的信息。
   - **可以自答、不必问**的清单：能 grep/read/glob 得到的代码事实、公开约定、可从现有配置读取的默认值——避免退化成事事都问。
   - 提问方式：复用 `decision-options`（ask_user_question 选项框，带默认/推荐项），并把同类缺口**一次问清**（一次 ask 多 question，≤3）。
   - 不确定判据：结果依赖该信息才能唯一推进、且检索成本/失败代价高。
   - 反例/正例各一小段。
2. 安装：以仓库 SKILL.md 为唯一源复制到 `C:\Users\Administrator\.dsh\skills\clarify-first\SKILL.md`，装后用哈希/内容比对两份一致，防止漂移。
3. （可选）在 `C:\Users\Administrator\.dsh\AGENTS.md`「提问与收尾」小节末尾追加一行指针：`- 遇到只能由用户提供的信息（账号密码/仓库地址/部署地址/连接串）且无法推断时，加载 clarify-first skill 直接弹选项问，不要猜。` 不改动既有条目语义。

## ④ 验证计划
- 内容对照：(a) 凭据/连接串类信息必须走 decision-options 弹框；(b) 能 grep/read/glob 得到的代码事实不得提问——两条在 SKILL.md 正文与反例中均可对应到。
- 安装一致性：仓库与 ~/.dsh/skills 两份 SKILL.md 内容比对一致。
- 下一会话 `<available-skills>` 能列出 `clarify-first`（索引刷新后）。不涉及构建/测试。
