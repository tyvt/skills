- 偏好将 GUI 功能做成独立本地插件（file: 链接、部署在 ~/.dsh/<plugin>、不修改 npm 包），避免编辑压缩的 npm bundle（升级会被覆盖）。
- client 插件手写 ESM factory（window.__ModuleLoader__.load({id, factory})）即可被 host 经 /plugins 自动加载，无需 tsdown 构建链。
- 本机本地插件多为服务端纯 JS 无构建；新建 client UI 插件需确认 host 已扫 Loader 条目、重启 web 生效。

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "user": "github.com-tyvt-skills",
  "topic": "DSH插件开发偏好",
  "source_extraction_id": "272c5dd7adf14815800ef32b6612dbdd",
  "version": 1,
  "memory_type": "preferences"
}
-->