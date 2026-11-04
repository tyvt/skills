# 登录页增加 loading 并在全部接口完成后关闭
无锡锡山业主决策H5 的 src/pages/common/login.vue 增加登录 loading，确保全部接口调用完毕或失败后关闭。

## 问题背景
- 登录流程缺少 loading 反馈，且异常路径可能未关闭 loading

## 解决方案
- onLoad 开始时调用 uni.showLoading({ title: '登录中...', mask: true })
- 登录成功链路改为带 catch/finally 的 Promise 链：login -> lingxiLogin -> queryUser -> 跳转首页，任一环节失败走 catch 提示"登录失败"，finally 执行 uni.hideLoading()
- 非 200 认证结果（如 9005）与 getInitCode 无值/异常均增加失败提示并关闭 loading
- 检查 lint 无新增报错

## 验证与归属
- 涉及文件：src/pages/common/login.vue
- 所属项目：无锡锡山业主决策H5；来源会话：b52e14fe-c430-4ac6-91d3-cc3e34a5328d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_loading_fix",
  "source_extraction_id": "c1033b18a29d424db2ab4b71f4c4cb5d",
  "version": 1,
  "memory_type": "entities"
}
-->