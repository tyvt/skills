# 组织工作人员详情「当前状态」字典误用修复
园区公共收益项目组织工作人员详情「当前状态」误用 `job_status` 字典导致 `"0"` 原样显示数字，改为 `sys_normal_disable` 与用户管理一致。

## 问题根因
- 用户管理 `status` 绑定 `sys_normal_disable`（`"0"` → 正常）
- 组织工作人员详情「当前状态」误用 `job_status`，`"0"` 无法匹配只能原样显示数字

## 解决方案
- `detail.vue`：「当前状态」字典改为 `sys_normal_disable`
- 编辑态改为 `el-radio-group` 单选（与用户管理一致）
- 默认值设为 `status: '0'`
- 撤销之前多余的 `String()` / `jobStatus` 转换逻辑
- `index.vue`：列表「当前状态」列字典同步改为 `sys_normal_disable`
- 刷新后「当前状态」应显示「正常」，与下方「状态」字段一致

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 涉及文件：detail.vue、index.vue、workerDeptTable.vue
- 所属项目：园区公共收益；来源会话：1e42f919-9755-4602-9b5f-c64546ba5da0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zhi2_orgworker_statusdict",
  "source_extraction_id": "93a5e0f6073340f5b3a64c98e6f38a8e",
  "version": 1,
  "memory_type": "entities"
}
-->