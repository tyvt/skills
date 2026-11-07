# 业主绑定房屋接口链路
无锡市区小程序嵌入H5中「业主绑定房屋」分门户灵犀绑房与H5内自助添加两条主链路，查询已绑定房屋为只读接口。

## 门户灵犀绑房链路
- 不动产授权在微信小程序 pages/face/bdc，选屋后回H5，URL带 authCode/authoCode
- usePortal → bootstrap() → runLingXiSelectMyHouse() 落库绑定
- 核心接口：POST /external/lingXi/selectMyHouse
- 请求体含 userId、phone、authCode、name、idNumber 等

## 涉及文件与归属
- 涉及文件：home.vue、utils/portal.js、src/api/portal.js
- 所属项目：无锡市区小程序嵌入H5；来源会话：2782b86f-c8ca-4f8c-8d4e-27ba92d8c485；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5


<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "owner_house_binding_api",
  "source_extraction_id": "d627421ec49c4bd58fa21558c5e6d07e",
  "version": 1,
  "memory_type": "entities"
}
-->
