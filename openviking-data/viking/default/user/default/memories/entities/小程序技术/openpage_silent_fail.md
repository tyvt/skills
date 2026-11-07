# openPage相对路径补斜杠不全致跳转无反应
苏住房C分包改造后 pages_vote/elect/detail 点「参与选举」无反应无报错，根因是 redirectTo 传相对路径且 openPage 未加 fail 回调静默吞错。

## 问题现象
- 分包改造后 pages_vote/elect/detail 点「参与选举」按钮能点但不跳转、无日志
- 从消息中心用绝对路径进详情页正常，说明仅页内二次跳转坏掉

## 根因
- 业务调用 redirectTo(`needToKnow?id=…`) 传相对路径，openPage 只补前导 '/' 得 /needToKnow，真实路径为 /pages_vote/elect/needToKnow
- uni.redirectTo 未传 fail 回调，失败被完全吞掉，表现为静默失败

## 解决方案
- resolveRelativePageUrl 负责把相对路径解析成当前分包下完整路径，业务代码优先写绝对完整路径
- openPage 统一补 fail 回调，失败时 console 打 [openPage] navigate fail 并 toast「页面跳转失败」
- 抽 handleParticipate 并按 partIn 状态守卫；底部按钮容器补 z-index 避免被遮挡假象

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 9677076a（2026-08-26，基线 b7bf813）utils/index.js 保留 resolveRelativePageUrl 并给 openPage 加 fail 回调，detail.vue 改绝对路径+partIn判断+z-index:10
- 涉及文件：src/utils/index.js、src/pages_vote/elect/detail.vue、src/pages_owner/elect/detail.vue、src/pages.json
- 所属项目：苏住房C；来源会话ID：9677076a-944b-42fd-9eba-67e8f0aa54d4；代码基线：b7bf813

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "openpage_silent_fail",
  "source_extraction_id": "b9a53a62e5144180a2e64278aff6fe0f",
  "version": 1,
  "memory_type": "entities"
}
-->