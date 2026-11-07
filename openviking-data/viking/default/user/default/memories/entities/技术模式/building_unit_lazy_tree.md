# BuildingUnitLazyTree 公共组件
苏州市房地产监测V3 新增「楼幢 + 单元」左树公共组件 `views/components/BuildingUnitLazyTree.vue`。

## 背景
- 原仓库无单独「楼幢+单元」左树组件，仅有 `SelectRoomDialog`、`OneTreeDialog`（一级树）及只选楼幢的 `views/components/BuildingDialog.vue`；合同退款、缴款等场景各自重复写 `el-tree` + `loadNode`

## 组件能力
- 左侧 `dialog-left` 布局与标题
- 懒加载：项目楼幢（`listFy` / `listNofenye`，`bizState: '2'`）→ 单元（`listUnitinfo`）
- 可配置：`buildingLabelKey`（`policeNo` / `buildingNo`）、`loadRootNodes`（自定义根节点）、`unitQuery`
- 事件：`node-click`、`no-units`（楼幢下无单元时由父级拉右侧列表）

## 已接入
- `ContractDialog.vue`：合同退款选合同
- `BuildingDialog.vue`（deposit）：定金缴款选房屋

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：85cb61cc-a222-4e94-9f77-255ce248f02c
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_unit_lazy_tree",
  "source_extraction_id": "7503ced734cb48b59a6ed3ddd3ef916d",
  "version": 1,
  "memory_type": "entities"
}
-->