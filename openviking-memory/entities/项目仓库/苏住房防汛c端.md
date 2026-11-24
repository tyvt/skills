# 苏住房防汛C端
苏住房防汛C端是一个位于本机的前端项目仓库，使用 dev 分支开发并推送到 origin/dev。

## 用途
- 面向苏州住房防汛业务的 C 端前端项目。
- 求援工单相关页面为 src/pages/rescue-workorder/index.vue 与 detail.vue。

## 关键事实
- 仓库路径：D:\repository\苏住房防汛C端。
- 2026-11-24 推送提交 c3e071a7c53c3b39c997dedec204fd6d4a381148，仅包含求援工单 index.vue 与 detail.vue 两个文件。
- 详情页由 index.vue 传入 rescueId 进行加载。

## 接口约定
- request 使用 raw:true 时返回完整信封 {code,msg,data}，detail.vue 不能直接 mapRow，需判断 code===200 且 data 为对象后再映射，否则显示空态。
- 日志字段为 operator/operateTime/content，街道与社区字段回退 subdistrictName/communityName。


<!-- MEMORY_FIELDS
{
  "category": "项目仓库",
  "name": "苏住房防汛C端",
  "source_extraction_id": "834e1e9afacf49f2973f0870909d5fe8",
  "version": 1,
  "memory_type": "entities"
}
-->