# 楼幢弹窗分页参数缺陷
靖江物管物业区域拆分合并的「选择楼幢」弹窗因分页参数位置错误导致始终返回第一页数据。

## 问题描述
- 影响模块：物业区域拆分合并的「选择楼幢」弹窗（OpeningBuildingDialog）
- 接口：/estate/proyprojectRange/listExceptMerge
- 现象：弹窗始终返回第一页数据，翻页与关键字搜索失效

## 根因
- 前端将 pageNum/pageSize 放在 URL 查询参数，后端仅从 JSON 请求体读取分页参数
- 禅道备注中 guoqiang 的说明与截图确认此差异

## 修复方案
- OpeningBuildingDialog.vue 调用时把 pageNum、pageSize、keyWord 放入请求体，查询串仅保留 keyWord
- splitMerge.js 接口处补注释说明分页参数必须放在 body
- 提交 d00ea98d8，已推送 origin/main；分支 feature/bug-6045-listexceptmerge-paging

## 验证与归属
- npm run build 通过；本地 nginx 站点 http://127.0.0.1:8104 验证产物请求体含分页参数
- 禅道 Bug 6045 回写：status=resolved, resolvedBy=tiany, resolvedDate=2026-11-04 09:05:08, resolvedBuild=trunk, 指派回 zhoudongdong
- 所属项目：靖江物管；来源会话：2026-11-04 对话

<!-- MEMORY_FIELDS
{
  "category": "技术缺陷",
  "name": "listexceptmerge_paging",
  "source_extraction_id": "9fe4483044264d90897525230bb62701",
  "version": 1,
  "memory_type": "entities"
}
-->