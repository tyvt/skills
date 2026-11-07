# Cursor 通道批处理封口 502 报错根因与修复
Cursor 通道整轮失败时报 native call arrived after its batch was sealed，根因是 magpie cursor 插件封批守卫未区分重传 exec 帧，已通过两段式守卫补丁修复。

## 现象
- 用 cursor/deepseek-v41-flash-1017 等 cursor 通道时整轮突然失败，turn/end 里 kind=error、code=PI_AI_ERROR、message="native call arrived after its batch was sealed"。
- 前一步并行调用正常完成，本步只发一个工具调用，几十毫秒后即报错结束。

## 根因
- 根因位于 magpie cursor 插件 @magpie-community/opencode-cursor-auth 的 native-session.mjs，NativeSession.acceptCall() 封批守卫：if (this.terminal || this.state === "awaiting-results") invalid("native call arrived after its batch was sealed", 502)。
- 某步工具调用数等于声明数（尤其只发一个时），sealBatch() 在第一条调用进来就满足 made==expected，状态立刻变 awaiting-results、批次封口。
- Cursor 连接未收尾可能重传同 ExecServerMessage.id 的 exec 帧；去重靠 this.execs.get(call.requestID)，首帧被丢弃未登记则 prior 为空，走到封批守卫抛 502。
- 守卫上方注释已写明重传应在封口后先校验身份、只有新 exec 才违规，但代码未实现，直接把重传判成新调用，属稳定复现的设计缺陷。

## 修复方案
- 把守卫拆两段：terminal 仍致命；awaiting-results 分支先用 requestID+digest 在 this.batches 里找匹配，命中则 return 丢弃重传，找不到才 502。
- 同 requestID 但 digest 变了也不放行，保持上游「exec 身份中途被改」的判断。
- 仅治标：让插件符合自身注释承诺；若 Cursor 真在封批后发全新 exec 仍会 502，属协议层异常。

## 落地与验证
- 补丁写在已加载副本 ~/.config/magpie/plugins/node_modules/@magpie-community/opencode-cursor-auth/native-session.mjs（非 ~/.cache/magpie/bun/install-cache 那份未加载拷贝）。
- 补丁目录 ~/.dsh/patches/cursor-batch-sealed/，已挂入 dsh-cursor-quiet-reapply 计划任务（登录时+每5分钟）自动重打，锚点失效时拒绝写入。
- 打完必须重启 magpie-bun（plugin-host）内存才生效；验证 node --test batch-sealed.test.mjs 6/6 通过，还原 pristine 后 reapply 自动回到 patched。
- 已提交 skills 仓库 main 分支 4742b76（dsh/patches/cursor-batch-sealed/ 新增 + cursor-quiet/reapply.mjs 接入），推送 origin。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cursor_batch_sealed",
  "source_extraction_id": "ac3b0f88569842189c57f9759b6f6acb",
  "version": 1,
  "memory_type": "entities"
}
-->