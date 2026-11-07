# 我的预约页接入Mock数据
iHomePC 个人中心我的预约页在接口无数据或异常时填充 Mock 数据，保证小区/房型 tab 可切换。

## 模拟数据
- 小区（rentalHouseList）：2 条，字段含 `estateName`、`estateUrl`、`createTime`、`bizState`、`appointHouseId`。
- 房型（roomTypeList）：2 条，在小区基础上多 `productTypeId`、`productTypeName`、`productTypeUrl`；图片先用 picsum.photos 占位，后续可改默认图。

## 使用时机
- 接口返回 200 但 `rows` 为空：用 Mock 数据填充，小区、房型两个 tab 都有列表可点、可切换。
- 接口报错（进入 catch）：同样用 Mock 数据展示，避免白屏，tab 切换照常可用。
- 有真实数据时以接口返回为准，不会用 Mock 数据覆盖。

## 验证与归属
- 验证证据：extracted source=cursor project=iHomePC
- 来源会话：03547f0b-35e3-4acd-a109-0ebebe947cab
- 验证：来源 cursor 会话 03547f0b-35e3-4acd-a109-0ebebe947cab。
- 涉及文件：`src/views/personalCenter/myAppointment/index.vue`；所属项目：iHomePC；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "appointment_mock_data",
  "source_extraction_id": "12def0402d4647a38511dddb624f592c",
  "version": 1,
  "memory_type": "entities"
}
-->