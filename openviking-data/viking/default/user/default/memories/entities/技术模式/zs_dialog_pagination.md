# zs-select-dialog 自定义插槽分页脱离上下文
园区物管2.0 中 zs-select-dialog 在自定义插槽内放分页控件时，页码切换不生效、数据不更新。

## 问题根因
- zs-select-dialog 自带分页状态与请求回调，页面在自定义插槽另放分页控件时点击事件走插槽自己的 handler，没回到弹窗内部「改页码→重建查询参数→重新请求」链路
- 弹窗不会因插槽内页码变化自动重查；组件打开时把查询参数赋一次就不再更新，每次请求前必须重建 payload 否则上下文字段丢失

## 解决方案
- 优先不要自定义分页：把列表交给 zs-select-dialog 内置分页
- 配 no-auto-query / 自定义取数时，自己在 bus 上接管分页回调并显式调用重查，确保页码变化后有且仅有一次请求、每次请求前重建 { pageNum, pageSize, 筛选条件 }
- 修完覆盖验证：不选区域直接翻页、选区域后翻页、翻页后换筛选条件回到第 1 页
- 顺带：父仓库子模块指针冲突（本地 a091abbe8 含修复 vs 远程 352c29c9f 含登录页 LOGO 调整），解决选「同时包含两方改动」的较新子模块 SHA 再在父仓库合并提交

## 验证与归属
- 验证：会话 cc4bf104 用户报「选择物业管理区域弹窗切换分页不生效」，要求处理冲突并提交代码；父仓库子模块指针冲突选 a091abbe8 生成合并提交 c8638fa
- 涉及文件：zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue、src/api/finance/guarantee_building.js
- 所属项目：产品2.0；来源会话：cc4bf104-5c49-4450-aeac-1aef06f34c8d；代码基线：075e6e9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_dialog_pagination",
  "source_extraction_id": "c2ecfa6d477744da8f26c97212d72b7a",
  "version": 1,
  "memory_type": "entities"
}
-->