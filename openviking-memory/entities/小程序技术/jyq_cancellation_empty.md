# 注销协议旧键jyq.cancellation返回空白
苏住房C市民端账户注销页因使用遗留配置键jyq.cancellation查不到配置，协议文本整块空白且不报错。

## 问题现象
- 我的→设置→账号安全→账户注销页(cancellationWarning.vue)《用户注销协议》内容整块空白
- 页面不做空态提示，表现为「协议不显示」而非报错

## 根因
- 该页仍用旧项目遗留配置键 jyq.cancellation 调 getConfigKey
- 苏住房端其他协议已统一迁到 szf.user.* 前缀(szf.user.protocol、szf.user.policy、szf.user.third)
- 后端拿旧键查不到配置返回空数据，前端未兼容空态

## 解决方案
- 配置键改为 szf.user.cancellation，与同组协议保持同一前缀
- 取值兼容 getConfigKey 三种返回形态：data 字符串直接用、data.configValue 取二级值、否则回退 res.msg
- 排查同类协议页把 jyq.* 当存量线索全量扫一遍
- 若改完仍为空，去后台「系统参数配置」确认该键已录入内容

## 验证与归属
- 验证会话 de821fae：定位 cancellationWarning.vue 使用旧键 jyq.cancellation，改为 szf.user.cancellation 并兼容三种返回格式
- 涉及文件：src/pages_my/setting/cancellationWarning.vue、src/api/system.js、src/pages/components/AgreementPage.vue、src/pages/about/agreement.vue
- 所属项目：苏住房C；来源会话ID：de821fae-638a-46f8-93fc-2174c53953d4；代码基线：77666f8

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "jyq_cancellation_empty",
  "source_extraction_id": "c44346873fb44f028707ec585c087aa1",
  "version": 1,
  "memory_type": "entities"
}
-->