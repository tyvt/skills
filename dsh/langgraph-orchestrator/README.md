# LangGraph 多模型工具编排器

一个基于 **LangGraph** 的 Agent 编排框架：把**不同工具**交给**不同 magpie 模型**执行，并支持**一个工具绑定多个备用模型**，主模型失败时**自动故障转移**，全部**配置驱动**。

## 特性

- **工具 → 模型池**：每个工具在 `config.yaml` 里绑定一个有序模型池（主 + 多个备用）。
- **自动故障转移**：主模型抛错、超时、返回空回复、或命中 `retry_on` 关键字时，自动切到下一个备用模型。
- **模型内重试 + 失败冷却**：单模型可指数退避重试；被判定失败的模型进入冷却期，短期内排到池尾，避免反复踩雷。
- **LangGraph 编排图**：`plan → dispatch → execute → (循环) → summarize`，规划与执行都经由模型池。
- **全链路可观测**：每次执行记录 `trace` 与每个模型的 `attempt`（耗时/错误），便于排障。
- **纯配置调整**：换模型、加备用、改超时都只改 `config.yaml`，不动代码。

## 目录

```
langgraph-orchestrator/
├── config.yaml            # 网关 + 工具 → 模型池定义（核心配置文件）
├── requirements.txt
├── src/
│   ├── __init__.py
│   ├── config.py          # YAML -> 强类型 dataclass
│   ├── router.py          # 模型路由器：模型池 + 故障转移（核心）
│   ├── graph.py           # LangGraph 编排图
│   └── cli.py             # 命令行入口
└── tests/
    └── test_router.py     # 故障转移单元测试（假客户端，无需联网）
```

## 安装

```powershell
pip install -r requirements.txt
```

## 配置：一个工具多个备用模型

编辑 `config.yaml`：

```yaml
gateway:
  base_url: http://127.0.0.1:3425/v1   # 本机 magpie 网关(OpenAI 兼容)
  api_key: magpie
  request_timeout: 120
  max_retries_per_model: 1             # 每个模型内部重试次数
  failure_cooldown: 600                # 失败模型冷却秒数

tools:
  planner:                             # 工具名
    description: 复杂任务的规划与推理
    max_tokens: 4096
    models:                            # 有序模型池：第 1 个是主，后面是备用
      - model: cursor/grok-4.7@256k    # 主
      - model: workbuddy-ai/hy4free    # 备1
      - model: auto/hy3                # 备2
      - model: autoclaw-cn/zai_glm-5.3-flash   # 备3
```

- 模型名即 magpie `/v1/models` 暴露的 id（本机当前 13 个）。
- 每个模型可单独覆盖 `temperature` / `max_tokens` / `timeout` / `retry_on`。

## 使用

```powershell
# 列出所有工具与其模型池
python -m src.cli --list

# 只调单个工具的模型池（自动故障转移）
python -m src.cli --tool file_reader "用一句话说明什么是 LangGraph"

# 跑完整编排（规划 → 分派工具 → 执行 → 汇总）
python -m src.cli "先解释模型故障转移，再对比它和负载均衡的区别"
```

## 测试

```powershell
# 离线单元测试：用假客户端验证「主挂→备接管 / 空回复→备接管 / 全挂→失败」
python tests\test_router.py
```

## 故障转移判定规则

一个模型在一次尝试中被判为**失败**并触发降级，当且仅当：

1. 调用抛异常（网络错误、404/429/5xx 等）；或
2. 返回内容为空；或
3. 返回内容命中该模型的 `retry_on` 关键字（默认含 `empty reply / 502 / 503 / 429 / rate limit / timeout / connection error`）。

## 扩展：接入真正的工具函数

当前框架把「工具」抽象为一次模型池调用。接入真实工具（读文件、跑命令、调 API）时：

1. 在 `graph.py` 的 `node_execute` 里，按 `step["tool"]` 分派到具体实现；
2. 需要「工具返回值再交给模型处理」时，先执行工具函数，把结果作为 `user` 消息喂给该工具的模型池；
3. 工具自身抛错也可纳入 `ToolResult.attempts` 记录，复用同一套 trace。

模型池层（`router.py`）与编排层（`graph.py`）解耦：换编排逻辑不影响故障转移，换模型不影响编排。
