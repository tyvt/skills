# Summary
2026-11-13，用户确认采用 A+C 组合方案维护 DSH 本地插件单一副本。方案 A：在 node_modules 下建目录联接指向源码 D:\repository\skills\dsh\orchestrator，改源码重启 Web 即生效；方案 C：post-install 钩子脚本在每次 pnpm install 后重建目录联接。用户认可先仅对 dsh-orchestrator 单插件做最小验证的风险控制步骤，并建议脚本参数化、不硬编码路径。
# 2026-11-13 (Friday) ChatLog:
**user [peer=github.com-tyvt-skills]**: A + C 的组合是当前约束下的合理选择
A 负责“平时零心智负担”：建一次 junction，日常改源码重启 Web 即生效。C 负责“安装后自愈”：每次 pnpm install 之后跑一次脚本，把可能被 pnpm 替换掉的 junction 重建回来。这个组合把“唯一副本”的承诺维持在了源码目录上。

但原方案末尾的现实约束提示不应被跳过：这是对 ~/.dsh/profiles 的结构性改动，会影响所有插件的加载方式。最小验证的建议（先只对 dsh-orchestrator 单个插件建 junction，确认 DSH 能正常加载后再推广）是正确的风险控制步骤。如果验证时 DSH 加载失败，回退路径也很清楚：删掉 junction，重新跑一次 pnpm install 让 pnpm 恢复实体目录即可。

一个小的改进建议：link-plugins.ps1 不应该硬编码用户路径。把 $nm 和 $src 作为参数或从环境变量读取，会让这个脚本在 profile 路径变化或多用户环境下仍然可用。

<!-- MEMORY_FIELDS
{
  "event_name": "确认A加C插件单副本方案",
  "goal": "确认DSH插件单副本方案",
  "summary": "2026-11-13，用户确认采用 A+C 组合方案维护 DSH 本地插件单一副本。方案 A：在 node_modules 下建目录联接指向源码 D:\\repository\\skills\\dsh\\orchestrator，改源码重启 Web 即生效；方案 C：post-install 钩子脚本在每次 pnpm install 后重建目录联接。用户认可先仅对 dsh-orchestrator 单插件做最小验证的风险控制步骤，并建议脚本参数化、不硬编码路径。",
  "ranges": "34-36",
  "source_extraction_id": "df58c1ba978f4b36a24dd84f7cd4ecaf",
  "version": 1,
  "memory_type": "events"
}
-->