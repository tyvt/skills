# 苏住房防汛C端物业管理区域下拉搜索
苏住房防汛C端移动查询H5三个页面的「物业管理区域」输入框已改为下拉选择：聚焦展示前10条、输入防抖过滤、带下拉箭头。

## 当前实现（2026-11-11，未提交）
- 统一三页：`src/pages/project-check/start/index.vue`（发起检查）、`src/pages/inspection/index.vue`（检查填报）、`src/pages/rescue/index.vue`（险情上报）。
- 聚焦且关键词为空先查一次并只取前10条；输入关键词250ms防抖查询；清空关键词回退前10条；右侧加 `›` 下拉箭头。
- 占位改「请选择物业管理区域」；加载中「加载中…」；无数据按有无关键词显示「无匹配区域 / 暂无可选区域」。
- `src/stores/evaluation.ts` 的 `finishedComplexPage` 增加 pageSize 参数；`src/stores/flood.ts` 的 `searchComplex` 去掉「空关键词直接返回空」拦截以允许无关键词拉默认候选；`src/styles/theme.css` 新增下拉箭头样式。

## 验证与风险
- `npm run build` 编译通过（改动前后均跑基线）；未做真机/浏览器交互点击验证，dist 已生成；本次改动尚未提交。
- `searchComplex` 空关键词也会请求 `complex/options`（不带参数）；若后端要求 `complexName` 必传，进入页面可能拿不到默认10条，需确认后端支持无参返回默认列表或改分页接口取前10。
- 发起检查页走 `finishedComplexPage`（本身支持无参分页），无此风险。

## 背景与历史
- 后端 `FloodCommonController.complexOptions` 的 `complexName` 参数必传，空值返回空列表（上述风险来源）。
- 测试库无「星耀商务中心」（仅「星耀之光大厦」「星耀君庭」），搜不到属数据不存在非bug。
- 后端仅搜已备案（biz_state=2）且有住宅（purpose=1）的小区，按 complex_name/record_name/promotion_name/legal_name 四个名字模糊匹配。
- 此前已提交并推送 `15156c3`（fix(inspection): 物业管理区域空关键词不再请求后端，提示输入小区名称搜索，1文件+4/-4）；该「提示输入」方案已被本次下拉方案取代。
- `npx vitest run` 曾因预存环境问题（ERR_PACKAGE_PATH_NOT_EXPORTED）失败，非改动引起；所属项目：苏住房防汛C端移动查询H5。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "inspection_area_fix",
  "source_extraction_id": "80285f0bd5e743caa850f89fd14b9386",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-mobile-query-h5-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->