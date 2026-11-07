# 筛选参数 bizState 多值逗号串排查
苏住房G 筛选参数 bizState 出现多值逗号串而页面单选，根因为 zs-search-form 对 bizState 全局 multiple 改写历史翻转。
## 问题根因
- 控制 multiple 的不是页面，而是 zs-search-form 对所有 model==='bizState' 搜索项全局改写，历史翻转三次：2026-03-19 无条件多选→2026-05-06 可开关→2026-05-08 默认单选。
- 2026-07-27 部分页面 queryParams 显式声明 bizState 为 undefined 默认 '2'。
- 当前代码不可能产出 "1,2"，疑似旧构建或手工改包。
## 排查口径
- 凡「筛选参数形态和当前页面代码对不上」，用 git log -S 'multiple' src/components/zs-search-form 查全局默认值翻转历史。
- 核对测试环境 dist/version.json（构建时间/分支），仓库仅前端，后端取值另查。
## 验证与归属
- 验证证据：会话 04c6f559 用户贴截图问 bizState:"1,2" 是否刚加；逐提交溯源 a9d72747e→c2ab33f8b→28de6944e→f7e52836e→6dbd17337→9b6b99aeb，结论当前代码不产多值。
- 涉及文件：companyManagement/components/index.vue、change/index.vue、utils/companyListQuery.js
- 所属项目：苏住房G；来源会话ID：04c6f559-f726-4199-99cd-5e92be1922e5；代码基线：db4f82c

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "bizstate_search_bug",
  "source_extraction_id": "9af2f036baf34743bd6ba71eed958267",
  "version": 1,
  "memory_type": "entities"
}
-->