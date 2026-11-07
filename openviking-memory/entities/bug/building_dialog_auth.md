# 楼幢授权弹窗样式同步修复
产品2.0 的楼幢授权弹窗已从 develop/v2.6.1-yuanqu 分支同步样式，对应提交 cd9696539。
## 主要变更
- 布局改为左右表格+中间文字穿梭按钮，确定/取消移至弹窗底部
- 穿梭按钮改为“选中移入 >”、“< 选中移出”、“全部移入 >>”、“<< 全部移出”
- 已选列表支持前端分页；弹窗宽度由 99% 全屏改为 96vw 自适应
- 筛选条件仅保留地块名称（默认宗地来源）；表格固定 8 行，与 zs-select-dialog 一致
## 涉及文件与状态
- 修改文件：zhi2-web-admin/src/views/components/BuildingDialogAuth.vue、property/complexBuildingAuth/detail.vue
- 修改已应用到工作区，尚未提交
- 所属项目：产品2.0；来源会话：dc881812-1513-477b-8342-59b5f3fc62ac；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "building_dialog_auth",
  "source_extraction_id": "e626ff8127fa48a1baaecc584e194dd4",
  "version": 1,
  "memory_type": "entities"
}
-->
