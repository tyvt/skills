# 楼盘表查询菜单不重复挂接
同一能力不挂两条菜单：列表页新增菜单，详情页复用已有菜单，菜单 component 必须指向 views 下真实页面入口。

## 背景与问题
- 禅道任务 #2129 要求新增「项目楼盘表查询」列表页，同时改造楼盘表详情页接入 7 个 lpb* 接口
- 列表页是全新菜单，但详情页早已有「楼盘表应用」菜单，若再新加菜单会出现同一页面两个入口
- 两个入口导致改菜单名/图标/权限要改两处，而列表页无菜单则完全进不去

## 解决方案
- 列表页「项目楼盘表查询」新增菜单 MENU_ID=2114991472432386051，已绑定 fangdichan
- 详情页不新增菜单，复用已有「楼盘表应用」菜单 MENU_ID=2096854897904476161，component=projectManagement/buildingTable/index
- 菜单 component 必须指向 views 下真实页面入口文件，按 filePath 反查路由才能命中，否则报「未找到菜单路由」
- 接口调用走公共封装（this.$post 等），删除单独建的 lpb.js api 文件
- 列表区划筛选改区县下拉并传区划编码（非名称），行政区划列回显名称；后端 ProjectLpbQuery.java + ProjectServiceImpl.java 支持 region、projectCode 过滤

## 验证与归属
- 会话 session-8d441c21-2bbf-4a16-8871-ebb87e3b9476（基线 a86bf95）用户诉求 1/3，最终结论写明详情页复用已有菜单、仅列表页新增菜单
- 涉及文件：zhi2-web-admin/src/views/projectManagement/buildingTableQuery/index.vue、buildingTable/index.vue、customerProject/detail.vue
- 7 个接口：lpbPage、lpbProjectDetail、listBuildingByProjectId、selectBuildHouse、lpbStatistics、lpbHousePage、house.detail

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "buildingtable_menu_reuse",
  "source_extraction_id": "03080adbda084b2aac671362ab310a10",
  "version": 1,
  "memory_type": "entities"
}
-->