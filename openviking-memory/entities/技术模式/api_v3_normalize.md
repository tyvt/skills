# apiV3Normalize 接口拦截转换
`产品2.0` 项目通过 `src/utils/apiV3Normalize.js` 拦截器将 V2 风格接口自动转换为 V3 规范。

## 转换规则
- `GET /module/resource/{id}` → `POST /module/resource/detail` + body
- `DELETE /module/resource/{id}` → `POST /module/resource/delete` + `[id]`
- `GET /module/resource/action/{id}` → `POST /module/resource/action` + body（如 `roleId`）
- `PUT /module/resource` → `POST /module/resource/update`
- `POST /module/resource`（新建）→ `POST /module/resource/add`

## 主键推断
- `menu`→`menuId`，`dept`→`deptIdNum`，`dictType`→`dictId`，`dictData`→`dictCode` 等

## 归属与文件
- 未改动的手写调用也会被拦截器兜底；白名单可跳过转换
- 涉及文件：`src/utils/apiV3Normalize.js`、`request.js`、`menu/index.vue`、`role/detail.vue`
- 所属项目：产品2.0；来源会话：88e83347-13dd-462f-a082-5dceb7d8e40e；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "api_v3_normalize",
  "source_extraction_id": "5d6b812cd45d4d66a1c26b64dc3a53e5",
  "version": 1,
  "memory_type": "entities"
}
-->
