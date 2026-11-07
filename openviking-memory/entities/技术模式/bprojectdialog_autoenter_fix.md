# 物业管理区域弹窗2秒自动进入修复
园区公共收益项目物业管理区域选择弹窗（bProjectDialog.vue）2秒自动进入失效问题已修复。

## 问题原因
- 倒计时被反复重置：弹窗挂载时 visible 监听器在无 currentProjectId 时强制 emit('update:visible', true)，与父组件 layout/index.vue 的 syncProjectDialogVisibility 抢控制权，2秒倒计时一直被清掉。
- visible 状态不可靠：原用 this.$attrs.visible 判断弹窗打开，Vue 2 下响应不稳定，setTimeout 回调可能读到 false，自动提交不执行。
- 数据未加载完就启动倒计时：区域列表接口还在加载时就开始倒计时，与 onOpen 异步逻辑冲突。

## 修复内容
- 将 visible 改为显式 prop，用 dialogVisible 正确绑定 el-dialog。
- 仅在用户主动关闭且未选区域时重新打开弹窗，初始挂载不再强制打开。
- 等数据加载完成（!dataLoading）后再启动自动进入倒计时。
- 用 generation 令牌避免过期定时器误触发，倒计时数字正常从 2 递减。

## 涉及文件与来源
- 文件：zhi2-web-admin/src/views/home/bProjectDialog.vue、zhi2-web-admin/src/layout/index.vue、zhi2-web-admin/src/views/home/ResetPwdDialog.vue
- 所属项目：园区公共收益；来源会话：022cfbb6-b498-4713-a286-66050471cfb5；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bprojectdialog_autoenter_fix",
  "source_extraction_id": "8cb7befab8654af79a9acdf99f050a39",
  "version": 1,
  "memory_type": "entities"
}
-->
