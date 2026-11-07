# 主包旧路径msgUrl前端归一化映射
苏住房C小程序消息接口返回迁移前主包路径，navigateTo报页面不存在，须在跳转层normalizeLegacyPageUrl集中映射。

## 问题现象
- 消息中心点击公告消息报 navigateTo:fail page "pages/announcement/detail?..." is not found
- 首页迁到 pages_main 分包后真实路径为 pages_main/announcement/detail，但后端 msgUrl 仍是旧主包前缀 pages/
- 后端不为存量数据回刷，历史消息/推送/收藏入口均可能复现

## 根因
- 页面从主包迁到分包后 pages.json 注册路径变更，历史消息记录存写死旧前缀
- 后端不回刷存量，前端路由拼错非主因

## 解决方案
- 新增 src/utils/route-map.js 的 normalizeLegacyPageUrl，维护「旧前缀→新分包前缀」目录级映射表
- 在 src/utils/index.js 的 goto/openPage 统一自动归一化，message.vue 显式复用同一函数
- 映射示例：pages/announcement/detail?msgId=... → /pages_main/announcement/detail?msgId=...，query 原样保留
- 覆盖所有主包迁到 pages_main 的目录前缀（news、message 等）

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 01893cc7 用户贴 MiniProgramError，结论新增 route-map.js 归一化、utils/index.js 统一修正、message.vue 复用；构建验证步骤见结论
- 涉及文件：zhi2-mobile-shimin/src/utils/route-map.js、src/utils/index.js、src/pages_main/message/message.vue、src/pages.json
- 所属项目：苏住房C；来源会话ID：01893cc7-e8de-4690-b98f-18f412beec9e；代码基线：b7bf813

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "msg_url_mainpkg",
  "source_extraction_id": "a54db745c05a4f788c392edfc908a8f7",
  "version": 1,
  "memory_type": "entities"
}
-->