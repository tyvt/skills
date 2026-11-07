# 表决页空optionGroupList致渲染崩溃
惠山小程序表决页因接口返回空数组时越界访问 optionGroupList 导致渲染崩溃，已加 `?? []` 兜底修复。

## 问题与修复
- 根因：src/pages_vote/vote/vote.vue 直接访问 optionGroupList?.[0]?.tMfOptionApplyList
- 根因：接口返回空数组时越界崩溃
- 修复：vote.vue 新增 optionApplyList computed 安全读取 `?? []`，模板 v-for 改用该变量
- 修复：onLoad 校验 OPTION 无选项时提示「暂无表决选项，请联系管理员」并返回上一页
- 修复：src/stores/vote.js 的 selectOption 对相关字段加 `?? []` 兜底

## 涉及文件（表决页）
- d:/repository/惠山小程序/src/pages_vote/vote/vote.vue
- d:/repository/惠山小程序/src/stores/vote.js
- d:/repository/惠山小程序/src/pages.json
- d:/repository/惠山小程序/src/pages_vote/vote/participate.vue
- d:/repository/惠山小程序/src/pages_vote/vote/index.vue

## 涉及文件（其他）
- d:/repository/惠山小程序/src/pages_vote/vote/votedetail.vue
- d:/repository/惠山小程序/src/api/modules/vote.js
- d:/repository/惠山小程序/src/utils/busCode.js

## 验证与归属
- 所属项目：惠山小程序
- 验证证据：extracted source=cursor project=惠山小程序
- 验证证据：src=惠山小程序/002.md
- 来源会话：afda119d-96d6-4114-922d-328d363e131d
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山小程序技术模式",
  "name": "vote_option_crash",
  "source_extraction_id": "591eeb9000e74a4fae1a3990c5386c2d",
  "version": 2,
  "memory_type": "entities"
}
-->