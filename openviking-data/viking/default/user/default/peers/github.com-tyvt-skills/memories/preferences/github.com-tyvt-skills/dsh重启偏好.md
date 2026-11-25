- 涉及 DSH WEB 配置或插件改动后，要求助手不要自行重启 DSH WEB，由用户自己重启以控制工具清单失效时机。
- 技能目录（C:/Users/Administrator/.dsh/skills）的挂载变更无需重启 DSH WEB：技能发现是运行时动态扫描，新建 Junction 后 catalog 当场热更新；必须重启的是启动时读死的配置（config.yaml planner 池顺序、cordis.patch.yml、graph.py 池结构）。

<!-- MEMORY_FIELDS
{
  "user": "github.com-tyvt-skills",
  "topic": "DSH重启偏好",
  "source_extraction_id": "980e0a51151d4fc7bf02c5cbf5be61aa",
  "peer_id": "github.com-tyvt-skills",
  "version": 2,
  "memory_type": "preferences"
}
-->