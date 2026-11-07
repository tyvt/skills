# 封批重传故障
`native call arrived after its batch was sealed`错误的根因与修复记录。

## 根因
- 错误来自magpie的cursor通道插件@magpie-community/opencode-cursor-auth的native-session.mjs中acceptCall()封批守卫
- 单调用步+重传组合时：首调用即满足made==expected使状态变awaiting-results封批，Cursor重传同ExecServerMessage.id的exec，首帧未登记导致prior为空，触发502整轮报废
- 守卫上方注释承诺校验重传身份但代码未实现，属设计缺陷稳定复现

## 修复
- 守卫拆两段：terminal仍致命；awaiting-results分支用requestID+digest在this.batches查找，命中丢弃重传return，未命中才502
- 校验不放松：同requestID但digest变也不放行

## 补丁位置
- 已加载副本：~/.config/magpie/plugins/node_modules/@magpie-community/opencode-cursor-auth/native-session.mjs（非install-cache未加载拷贝）
- 补丁目录：~/.dsh/patches/cursor-batch-sealed/（patch-batch-sealed.mjs、batch-sealed.test.mjs、README.md）
- 自动重打：挂入既有计划任务dsh-cursor-quiet-reapply的reapply.mjs，每5分钟运行，锚点失效拒绝写入

## 验证与限制
- node --test batch-sealed.test.mjs → 6/6通过
- 重启plugin-host(PID 31972)使补丁生效，网关127.0.0.1:3425健康，3个cursor模型在线
- 仅让插件符合自身注释承诺；若Cursor在封批后发全新exec仍会502，属协议层异常

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "技术模式",
  "name": "batch_sealed_error",
  "source_extraction_id": "4c452ac334b044f092682d9f0b29e4b7",
  "version": 1,
  "memory_type": "entities"
}
-->