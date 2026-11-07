# 选举页参与选举跳转失败修复
苏住房C小程序分包改造后，选举详情页点击「参与选举」跳转须知页失败，已通过路径解析与失败回调修复。

## 问题根因
- 分包改造后 elect/detail.vue 调用 redirectTo 使用相对路径 needToKnow?...
- openPage 原先只补前导 /，最终为 /needToKnow?...，非小程序有效路径（应为 /pages_vote/elect/needToKnow?...）
- uni.redirectTo 失败时无 fail 回调，表现为按钮可点、无报错、页面不跳转

## 修复内容
- utils/index.js 保留 resolveRelativePageUrl 解析相对路径为当前分包完整路径，openPage 增加 fail 回调失败时 toast 提示
- pages_vote/elect/detail.vue 抽取 handleParticipate 使用绝对路径 /pages_vote/elect/needToKnow?...，参与选举增加 !partIn 判断

## 涉及文件与归属
- 涉及文件：utils/index.js、pages_vote/elect/detail.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：9677076a-944b-42fd-9eba-67e8f0aa54d4；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "elect_redirect_fix",
  "source_extraction_id": "1bc3f2f67eab4e51a467d63662cd46c9",
  "version": 1,
  "memory_type": "entities"
}
-->
