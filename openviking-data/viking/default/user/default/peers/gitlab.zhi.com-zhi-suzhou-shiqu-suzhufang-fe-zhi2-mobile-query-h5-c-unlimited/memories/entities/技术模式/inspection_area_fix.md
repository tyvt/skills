# 苏住房防汛C端物业管理区域搜索修复
苏住房防汛C端移动查询H5的inspection页面「物业管理区域」搜索框空关键词查不到区域，已修复为提示输入小区名称。

## 问题根因
- 前端聚焦时调用 `loadComplexOptions('')` 期望默认展示前10条，但后端 `FloodCommonController.complexOptions` 的 `complexName` 参数必传，空值直接返回空列表。
- 测试库无「星耀商务中心」小区（仅「星耀之光大厦」「星耀君庭」），搜不到属数据不存在非bug。
- 后端仅搜已备案（biz_state=2）且有住宅（purpose=1）房屋的小区，按complex_name/record_name/promotion_name/legal_name四个名字模糊匹配。

## 修复内容
- `src/pages/inspection/index.vue`：聚焦空关键词不再请求后端，直接置空选项列表。
- 空状态文案改为「请输入小区名称搜索」（原「暂无可选区域」），有关键词无结果显「无匹配区域，请换关键词」。
- placeholder 改为「请输入小区名称搜索」。

## 验证与归属
- 提交 `15156c3` `fix(inspection): 物业管理区域空关键词不再请求后端，提示输入小区名称搜索`，1文件+4/-4，已推送 origin/dev。
- `npm run build` 通过；`npx vitest run` 因预存在环境依赖问题（ERR_PACKAGE_PATH_NOT_EXPORTED）未通过，非本次改动引起。
- 所属项目：苏住房防汛C端移动查询H5。

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "category": "技术模式",
  "name": "inspection_area_fix",
  "source_extraction_id": "d18a525ff5c44e1893c5585070f9b34e",
  "version": 1,
  "memory_type": "entities"
}
-->