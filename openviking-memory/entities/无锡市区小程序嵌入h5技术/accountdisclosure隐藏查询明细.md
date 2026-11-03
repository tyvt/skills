# accountDisclosure隐藏查询明细
接口 accountStatistics 新增 `accountDisclosure` 字段，值为字符串 "0" 时隐藏共有资金/公示页「查询明细」按钮。

## 字段规则
- `/v2.0/benefit/app/accountStatistics/{projectId}` 返回 `accountDisclosure`
- 值为字符串 "0" 不展示「查询明细」按钮；非 0 保持原逻辑

## 提交要求
- 改动需同步 `dev_wuxi-sfb` 与 `dev_shiqu` 分支
- 子模块提交后更新父仓指针并按规范打 tag（如 `202608131440` / `202608131440-sfb`）

## 验证与归属
- 验证证据：会话 73e008e0 用户提供接口字段说明与截图，结论完成双分支提交与 tag
- 涉及文件：src/pages_benefit/fundPublicity/index.vue、src/pages_benefit/sharedFunds/index.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：73e008e0-9dd9-46de-b9f7-c3c8d2356bbe；代码基线：86395e1

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "accountDisclosure隐藏查询明细",
  "source_extraction_id": "e1d333fda998440b965226a98fbc7d38",
  "version": 1,
  "memory_type": "entities"
}
-->