# 葡语路径记忆溯源

非用户葡语对话：OpenViking VLM 在批量导入（distilled/Cursor 会话 commit）时把 entities 分类目录写成葡语（padrão técnico 等），正文常混 Evidência/src=中文项目路径。

| 指标 | 数量 |
|------|------|
| 葡语/误分类路径下的 .md | **1** |
| 中文目录已有同名 slug（可安全 quarantine） | **0** |
| 仅存在于葡语路径（需迁移或保留中文改写） | **1** |

## 典型来源（distilled src=，非葡语会话）
- `(no src=)` × 1

## 关联 Cursor/DSH session（节选）

完整 JSON: portuguese-trace.json