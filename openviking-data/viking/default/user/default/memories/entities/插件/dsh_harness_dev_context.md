# dsh-harness-dev-context

DSH 的开发模式上下文插件，为能检视与扩展 DSH 自身的 agent 注入运行时/开发说明。

## 注入内容
- `HARNESS_SOURCE_PROMPT`：说明 runtime context 里的 agent implementation checkout 路径、用 pwd 判断工作目录，仅用于检视/扩展 DSH。
- `WEB_SURFACE_PROMPT`：Web GUI 交互说明（HMR、apps/web Vite、window.__DSH_BOOT__ 等）。
- 两段合计约 1400 字符、约 560 token，每轮固定重发，是系统提示 1.7k 中“对你无意义”内容的主要来源。

## 依赖与安全边界
- 不 provide 任何服务、不 gate 任何工具，只消费 systemPrompt、sessionProjections、webApp。
- 唯一副作用是注册 legacy 会话投影（legacyPromptProjectionHandle）；禁用不影响 Web GUI/HMR/工具。
- 在组合树 L845 由 bundle 挂载，profile 原本无覆盖条目，可直接加 disabled: true 关闭。

## 状态
- 2026-11-14 已在 `~/.dsh/profiles/web/cordis.patch.yml` 末尾禁用（disabled: true），dump 校验通过，待手动重启验证预期节省 500–600 token/步。
- 定位过程：用户指出系统提示 1.7k 中有无意义内容后，先排除 dsh-system-prompt（includeHarnessIdentity:false 已关、harness identity 仅 “You are an AI agent.”）与 dsh-persona（prefix 为空），再定位到该插件。

<!-- MEMORY_FIELDS
{
  "category": "插件",
  "name": "dsh_harness_dev_context",
  "source_extraction_id": "c1ce226d81f64754ab4e8bd1b7ab0720",
  "version": 1,
  "memory_type": "entities"
}
-->