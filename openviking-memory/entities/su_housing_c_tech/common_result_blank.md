# 决策结果页（common）空白修复
苏住房C小程序修复 common/DecisionResult.vue「最近一次决策」下方空白过大问题。

## 问题根因
- 「签字」「最后一次决策时间」用 CardCell 始终渲染，无数据时仍占一行高度
- ZsImage 的 height: 100% 在 CardCell 内可能被撑高，产生大块空白

## 修复内容
- 签字、时间改为 v-if 条件渲染，无数据时不占位
- 参考 DecisionRecord，改用紧凑的 cell-item 布局
- 签字图用固定尺寸容器 sign-picture-wrap（153×68px），避免图片撑高
- 决策结果文字下边距从 16px 减到 8px

## 补充说明与归属
- 若仍有空白，多半是接口返回了 sign 或 lastDate，此时会正常显示对应行
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/pages_vote/decision/common/DecisionResult.vue、src/pages_vote/decision/styles/page.scss
- 来源会话ID：3769efc4-10f9-4155-b4dd-4bcdbacd77a7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "common_result_blank",
  "source_extraction_id": "16730c0f2c094b93a4bc0dbabc7ca178",
  "version": 1,
  "memory_type": "entities"
}
-->