# 物管会单区域登录后2秒自动进入失效
物管会账户绑定单区域时登录后2秒自动进入提示失效，倒计时被反复清除不提交。

## 问题根因
- bProjectDialog.vue 中 visible 监听器在无 currentProjectId 时强制 emit('update:visible', true)，与 layout/index.vue 的 syncProjectDialogVisibility 抢控制权，弹窗状态反复切换清除定时器
- 使用 this.$attrs.visible 判断打开在 Vue2 下不稳定，setTimeout 回调可能读 false
- 区域列表仍在 dataLoading 时就启动倒计时，与 onOpen 异步逻辑冲突

## 解决方案
- visible 改为显式 prop，用 dialogVisible 绑定 el-dialog
- 仅用户主动关闭且未选区域时再打开，初始挂载不强制打开
- !dataLoading 后再启动自动进入，用 generation 令牌丢弃过期定时器，失败可重试
- 注意同屏「修改密码」弹窗也会挡住流程

## 验证与归属
- 验证：会话 022cfbb6 用户报 2 秒自动进入未执行，结论列三条根因及 generation 令牌修复
- 涉及文件：zhi2-web-admin/src/views/home/bProjectDialog.vue、zhi2-web-admin/src/layout/index.vue
- 所属项目：园区公共收益；来源会话：022cfbb6-b498-4713-a286-66050471cfb5；代码基线：36a9a7e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bprojectdialog_visible_bug",
  "source_extraction_id": "d709eae86a0446e2bbf553bea5add833",
  "version": 1,
  "memory_type": "entities"
}
-->