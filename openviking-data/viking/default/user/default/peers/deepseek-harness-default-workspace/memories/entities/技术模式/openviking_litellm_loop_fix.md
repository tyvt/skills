# OpenViking LiteLLM嵌入器跨循环关闭错误修复
OpenViking 的 litellm 嵌入器因 LiteLLM 全局异步客户端在错误事件循环上被析构关闭，抛出 aiohttp 跨循环 RuntimeError，已通过改用 httpx 与主动关闭修复。

## 症状
- 日志出现 `Task exception was never retrieved` 伴随 `RuntimeError: Task ... got Future ... attached to a different loop`
- 每次嵌入客户端被垃圾回收时刷一条错误，并伴随检索超时、Ollama 连接被断开现象
- 错误本身不导致服务崩溃，但会在嵌入客户端回收时反复出现

## 根因
- OpenViking 的嵌入队列运行在自有私有事件循环里
- LiteLLM 的全局异步客户端内部持有绑定到该循环的 `aiohttp.ClientSession`
- 客户端被垃圾回收时，其析构函数在另一个事件循环上调用 `ClientSession.close()`
- aiohttp 不允许跨循环关闭连接器，故抛出 RuntimeError

## 修复
- 修改 `C:\Program Files\Python310\Lib\site-packages\openviking\models\embedder\litellm_embedders.py`
- 模块加载时设置 `DISABLE_AIOHTTP_TRANSPORT=True`，使 LiteLLM 异步客户端改用 httpx；httpx 传输层不绑定事件循环，跨循环关闭不再触发该错误
- 每次异步嵌入返回后，在创建它的循环仍存活时主动 `close()` LiteLLM 全局异步客户端并清缓存，避免拖到 GC 阶段才关闭

## 验证与注意
- 重启 OpenViking 后 `/health` 返回 200
- 向 `/api/v1/search/find` 发送一次真实检索返回 200 且带结果，10 秒后健康检查仍为 200
- 此修改为 site-packages 就地补丁，`pip install -U openviking` 升级会被覆盖，同报错将重现

<!-- MEMORY_FIELDS
{
  "peer_id": "deepseek-harness-default-workspace",
  "category": "技术模式",
  "name": "openviking_litellm_loop_fix",
  "source_extraction_id": "10a5b6db04964ff69bb531bc5aeb19fe",
  "version": 1,
  "memory_type": "entities"
}
-->