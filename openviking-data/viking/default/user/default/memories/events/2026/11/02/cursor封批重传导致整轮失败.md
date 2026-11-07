cursor 通道报 native call arrived after its batch was sealed 的根因与修复

现象：用 cursor/deepseek-v41-flash-1017 等 cursor 通道时整轮突然失败，turn/end 里 kind=error、code=PI_AI_ERROR、message="native call arrived after its batch was sealed"。典型痕迹：前一步并行调用正常完成，本步只发一个工具调用，几十毫秒后即报错结束。

根因位置：magpie 的 cursor 插件 @magpie-community/opencode-cursor-auth 的 native-session.mjs，NativeSession.acceptCall() 封批守卫：if (this.terminal || this.state === "awaiting-results") invalid("native call arrived after its batch was sealed", 502)。

触发机制：①某步工具调用数等于声明数（尤其只发一个时），acceptCall 末尾 sealBatch() 在第一条调用进来就满足 made==expected，状态立刻变 awaiting-results、批次封口；②此时 Cursor 连接未收尾，可能重传同 ExecServerMessage.id 的 exec 帧；③去重靠 this.execs.get(call.requestID)，首帧若被丢弃未登记则 prior 为空，代码继续走到封批守卫抛 502，整轮报废。

关键判断：守卫上方注释已写明「重传可能在本批封口后到达，要先校验身份，只有新 exec 才违规」，但代码没实现，直接把重传也判成新调用。所以不是偶发，是设计缺陷导致的稳定复现。

修复方式：把守卫拆成两段——terminal 仍致命；awaiting-results 分支先用 requestID+digest 在 this.batches 里找匹配，命中则 return 丢弃重传，找不到才 502。同 requestID 但 digest 变了也不放行，保持上游「exec 身份中途被改」的判断。

落地位置：补丁写在已加载副本 ~/.config/magpie/plugins/node_modules/@magpie-community/opencode-cursor-auth/native-session.mjs（不是 ~/.cache/magpie/bun/install-cache 那份未加载拷贝，早期 quiet 补丁盯错目录一直不生效）。补丁目录 ~/.dsh/patches/cursor-batch-sealed/，已挂进 dsh-cursor-quiet-reapply 计划任务（登录时+每5分钟）自动重打，锚点失效时拒绝写入。

生效条件：打完必须重启 magpie-bun（plugin-host），否则内存里仍是旧代码。

验证：node --test batch-sealed.test.mjs 6/6 通过；还原成 pristine 后跑 reapply 自动回到 patched。

局限：治标——让插件符合它自己注释的承诺；若 Cursor 真在封批后发全新 exec 仍会 502，那属于协议层异常。

提交：skills 仓库 main 分支 4742b76（dsh/patches/cursor-batch-sealed/ 新增 + cursor-quiet/reapply.mjs 接入），已推送 origin。

<!-- MEMORY_FIELDS
{
  "version": 1
}
-->