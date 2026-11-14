# cordis.patch.yml
DSH web profile 的配置补丁文件。
## 位置与结构
- 实际路径 C:\Users\Administrator\.dsh\profiles\web\，不在 git 仓库内，属用户本地配置
- 含 standard、ptc、cordis、full-tools 预设块；工具 enabled/disabled 由 preset 决定
## 关键设置
- catalogDescriptionMaxLength：standard(L140) 与 full-tools(L355)，2026-11-14 由 120 改为 40
- standard 预设 disabled：tool-schedule、tool-goal、tool-workflow、subagent 系；session_* 全局禁用
## 生效与校验
- 改动必须重启 web 才加载；回滚＝两处改回 120 并重启 web
- 用 dsh --profile web --dump-config 校验（组合树约 2153 行，preset-standard 段约 1001–1211 行）

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "category": "配置文件",
  "name": "cordis.patch.yml",
  "source_extraction_id": "c7e177820f0a4226b8c7ecffec51fb82",
  "version": 1,
  "memory_type": "entities"
}
-->