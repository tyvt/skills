# 门户首页二级页骨架屏实现
门户首页所有二级页接入统一骨架屏组件，直接刷新二级页不再显示首页骨架屏。

## 组件构成
- PortalSkeleton.vue：按二级页真实版式输出占位结构，共 15 种版式（楼盘/房屋/许可/公告/机构/人员/租赁列表、公告正文、可售房源与即时成交汇总、合同与租赁合同查询、楼幢列表、楼盘表 54 格销控网格、经纪机构/经纪人/分支机构列表、机构/经纪人/分支机构三类基本信息）
- PortalDialogHost.vue：二级页切换时展示骨架屏，最短展示 600ms（复用 @/utils/loading.js），用 token 丢弃被后一次切换覆盖的等待；叠加详情弹窗不触发骨架屏
- portalRoutes.js：新增的二级页路由配置文件

## 验证与归属
- 验证证据：extracted source=zcode project=门户
- 涉及文件：PortalSkeleton.vue、PortalDialogHost.vue、@/utils/loading.js、portalRoutes.js（均在 zhi2-web-admin/src/views/home/publicPortal 下）
- 所属项目：门户；来源会话ID：session_8fedec701ebfbbfa2d3c0a93a4c98a27；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "skeleton_screen",
  "source_extraction_id": "38c4fed0fdf5450498d3c66aeea4789a",
  "version": 1,
  "memory_type": "entities"
}
-->