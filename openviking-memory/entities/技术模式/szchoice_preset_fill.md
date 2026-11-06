# SzChoice 预设单选联动输入框
苏州市房地产监测V3 的 2016 合同中，`SzChoice` 组件已实现「预设单选 + 后方输入框」自动填充交互。

## 组件改动
- `SzChoice` 增加 `fill-from-option` 与 `:fill.sync`：选中预设时自动填充后方空白框；取消选中则清空；从选项文案 `【30】`、`【2%】` 等解析填入值

## 合同章节接入
- 第七章（车位费）：`outdoorParkingFee` → `outdoorParkingOther`，`ownedParkingFee` → `ownedParkingOther`（选 30/40/50/60 写入「元/个·月」后的框）
- 公共能耗选 300/500 会填金额；选「非住宅」不自动填，需手填
- 第 4/5/6/8/10/12 章也已接上同模式，避免只勾选不填数

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话：1b692861-9b2d-49d0-ad02-c19267d2f0ef
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "szchoice_preset_fill",
  "source_extraction_id": "7503ced734cb48b59a6ed3ddd3ef916d",
  "version": 1,
  "memory_type": "entities"
}
-->