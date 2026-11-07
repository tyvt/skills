# 消息中心msgUrl旧分包路径须前端归一化映射
苏住房C小程序消息接口返回迁移前分包路径，直接navigateTo必报页面不存在，须在normalizePageUrl集中映射。

## 问题现象
- 「我的-消息」点「业主决策」消息无响应，报navigateTo:fail page "pages_owner/decision/detail?id=..." is not found
- 分包改造后真实路径为/pages_vote/decision/detail，但msgUrl仍是/pages_owner/decision/detail
- 后端存历史字符串不随前端调整，直接用必命中页面不存在

## 根因
- 业主决策/选举/投票/建议页已迁到pages_vote分包，消息接口下发旧前缀pages_owner/
- 前端无集中路径兼容，散落判断易漏

## 解决方案
- 在消息跳转唯一入口normalizePageUrl加旧路径前缀映射表：pages_owner/decision|elect|poll|propose → pages_vote/
- 前缀命中即替换后再拼query，不逐条改后端数据也不写if分支
- 推广：凡后端下发前端路由字符串(消息中心、待办、扫码)都应有集中归一化函数做路径兼容
- 排查直接看vConsole报错完整URL与pages.json注册路径差异

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话72fc01c4用户贴MiniProgramError，结论在normalizePageUrl增加前缀映射修复
- 涉及文件：msg.js、message/index.vue、message.vue、pages.json
- 所属项目：苏住房C；来源会话ID：72fc01c4-8530-4edb-8ed0-13cf0599aa37；代码基线：5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "msg_url_map",
  "source_extraction_id": "c721bf307ccf4950b939d5355989b4a1",
  "version": 1,
  "memory_type": "entities"
}
-->