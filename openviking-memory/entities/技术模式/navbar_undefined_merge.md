# 切换小区后导航栏显示 undefined
园区物管2.0 切换小区后导航栏项目名称显示字符串 "undefined"，根因是展开合并被详情接口 undefined 字段覆盖。

## 问题根因
- 选择弹窗用 `{ ...selectedProject, ...this.tempData }` 把列表行与小区详情合并，详情接口里 projectName 是 undefined（真实名称在 complexName），展开合并会用 undefined 覆盖列表行里正确的 projectName。
- 写入 Vuex / localStorage 时 undefined 被 JSON 序列化成字符串 "undefined"，之后读取永远显示 undefined。

## 解决方案
- 对象合并禁止盲目展开覆盖，业务关键字段写显式合并函数（mergeProjectWithComplex）：已有值优先、无值才取别名兜底（projectName → complexName）。
- 切换目标后重新请求新选中项的详情再合并，不能沿用旧项的 tempData。
- 写 localStorage 前对名称做规范化，读取侧（Navbar isLabel 等）对已存的 "undefined" 字符串做过滤兜底。

## 验证与归属
- 验证：Navbar 切小区会话最终结论三处修复——bProjectDialog 合并优先保留 projectName 回退 complexName 且先拉新小区详情；Navbar isLabel 加 complexName 兜底并过滤 localStorage 里的 "undefined"；layout 写入前规范化。
- 涉及文件：zhi2-web-admin/src/layout/components/Navbar.vue、zhi2-web-admin/src/views/home/bProjectDialog.vue、zhi2-web-admin/src/layout/index.vue；所属项目：园区物管2.0；来源会话：420324f6-d038-423b-8496-387e3126ed25；代码基线：7fe15a8cb。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "navbar_undefined_merge",
  "source_extraction_id": "5ed8cff3af8a4f5db9f4d3e49a2b2037",
  "version": 1,
  "memory_type": "entities"
}
-->