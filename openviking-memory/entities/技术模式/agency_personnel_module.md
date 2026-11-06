# 经纪机构管理人员模块代码结构
苏州市房地产监测V3 项目梳理了「经纪机构管理」模块下机构人员（`agencyPersonnel`）的列表与详情组件结构。

## 路由与菜单
- 模块：`经纪机构管理`（`/jjjg`）
- 菜单 `filePath`：`institution/agencyPersonnel/index`
- 配置位置：`zhi2-web-admin/e2e/fixtures/institution-menu-config.js`

## 核心组件
- `src/views/institution/agencyPersonnel/index.vue`：列表页入口，渲染 `AgencyPersonnelList`
- `src/views/institution/agencyPersonnel/components/AgencyPersonnelList.vue`：列表 + 筛选 + 分页 + 操作主文件
- `src/views/institution/agencyPersonnel/detail.vue`：详情页

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话ID：727ebb5f-f730-4f04-859a-246e4ec3b2a7；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_personnel_module",
  "source_extraction_id": "6ec2c7711610458380e02ce0e47fab1d",
  "version": 1,
  "memory_type": "entities"
}
-->