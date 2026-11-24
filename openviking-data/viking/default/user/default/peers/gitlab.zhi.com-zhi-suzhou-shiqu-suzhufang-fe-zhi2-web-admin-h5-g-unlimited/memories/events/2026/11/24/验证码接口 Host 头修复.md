# Summary
2026-11-24 苏住房G 的 `/api/v2.0/code` 在 8165/8167 返回 500，定位为生成的 conf 使用 `proxy_set_header Host $host` 传 localhost，导致测试网关按 Host 路由失败（响应头 `x-proxy-url` 的 host 为空）；改为按项目网关域名设置 Host 后，两端口验证码接口均返回 200 JSON。
# 2026-11-24 (Tuesday) ChatLog:
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 决定性证据：`x-proxy-url: http:///v2.0/code` —— proxy_pass 的网关变量为空！这是 **`苏住房G.conf`（旧 legacy 文件）** 里的配置，用的是变量（如 `$gateway` 未定义），不是新生成的。而且 access.log 显示 **8120 端口** `/api/v2.0/code` 返回 200——别的环境（园区公共收益）代理是好的。

关键问题：8165/8167 命中了带空变量的旧 conf。看生效配置里 8165/8167 的完整 server 块。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 生效配置里 8165/8167 的 v2.0 代理完全正确（proxy_pass 有真实网关），但响应 `x-proxy-url: http:///v2.0/code`。这个 header 来自 **dist 里前端代码或另一层**——注意 `x-proxy-url` 不是我 conf 里设的。而且 8120 端口的 code 返回 200（`http://localhost:8120/` 是园区公共收益，可能是并发的别人浏览器）。

关键：`x-proxy-url: http:///v2.0/code` 中的空 host 说明有个**通用 include conf**（conf.d/ 或 8120 那个）用了变量。但 8165 server 块是独立的。等等——`x-proxy-url` 可能是**上游网关返回的 header**透传回来的！网关返回 500，带 `x-proxy-url: http:///v2.0/code`（网关内部配置问题）。

验证：直连网关 `/api/v2.0/code` 之前返回 200。让我再直连一次，看 header。若直连 200 而经 nginx 500，则是 nginx 传参问题（proxy_set_header Host $host 导致网关路由失败）。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: `x-proxy-url` 是网关根据 Host 路由：直连时 `http://172.10.1.2:8080/v2.0/code`（正常），经 nginx 时 `http:///v2.0/code`（空）——我的 conf `proxy_set_header Host $host` 传了 localhost，网关无法路由。而 8120 园区收益的 code 返回 200。一次验证假设 + 对比好的配置。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: **根因确认**：`proxy_set_header Host $host` 传 localhost，网关按 Host 路由失败；带正确 Host 时 200。园区收益等可用配置都是 `proxy_set_header Host <网关域名>`。

修复：把 gen 模板 fdcApi 的 `proxy_set_header Host $host` 改为按项目网关域名设置。但模板是通用的（`__GATEWAY__` 可替换），用 `__GATEWAY_HOST__` 占位符从网关 URL 提取 host。改 gen 脚本 + 重新生成 + reload。先精确改 gen 脚本两处。
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 我需要在 serverTpl 里把 `proxy_set_header Host $host;` 改成可替换占位符，并在生成循环里计算网关 host。改 3 处：serverTpl 的 Host 行、循环里加 `$gwHost` 计算、Replace 链加 `__GATEWAY_HOST__`。

先看 serverTpl 里 Host 行确切内容（line 94 已见 `proxy_set_header Host $host;`）。执行 edit。
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited]**: 两端口验证码接口都返回正常 JSON。nginx 修复完成。更新 todo，进入登录+验证阶段。

<!-- MEMORY_FIELDS
{
  "event_name": "验证码接口 Host 头修复",
  "goal": "修复验证码 500",
  "summary": "2026-11-24 苏住房G 的 `/api/v2.0/code` 在 8165/8167 返回 500，定位为生成的 conf 使用 `proxy_set_header Host $host` 传 localhost，导致测试网关按 Host 路由失败（响应头 `x-proxy-url` 的 host 为空）；改为按项目网关域名设置 Host 后，两端口验证码接口均返回 200 JSON。",
  "ranges": "83-93,125",
  "source_extraction_id": "f8303174bada44ae9cff759a99ae421c",
  "version": 1,
  "memory_type": "events"
}
-->