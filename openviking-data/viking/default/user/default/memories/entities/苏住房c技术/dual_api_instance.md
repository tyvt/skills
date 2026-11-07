# 双API实例架构与接口清单产出
zhi2-mobile-shimin同时对接苏找房旧系统(V1)与新版服务(V2)，两套接口走不同代理不同axios实例，整理接口清单须按导出实例归类。

## 实例划分
- src/api/index.js对应V2，H5代理到VITE_APP_API_PROXY，路径前缀/api，共282个接口
- src/api/v1Instance.js对应V1，代理到VITE_APP_API_PROXY_V1，前缀/szf，共57个接口
- 看路径前缀看不出归属，必须看api方法从哪个实例导出

## 接口清单产出方式
- 按模块文件(property.js/common.js/article.js/transaction.js/security.js/file.js)逐个确认import来源是api还是apiV1再归类
- 动态参数${id}统一替换成{id}占位；第三方外部接口(腾讯地图等)不计入

## 业务分布
- V1集中二手房交易、收藏/足迹、房源核验、网签合同、文章(/v2.0/article/*)、短信验证码、文件上传等苏找房旧系统能力
- 新增功能优先走V2；改接口前先确认所属实例，否则路径对但代理错表现为404或打错服务

## 验证与归属
- 会话164e3d8a：用户要求整理接口按V1/V2区分生成markdown，产出API接口地址.md：V2 282个、V1 57个并说明V1覆盖业务
- 涉及文件：index.js、v1Instance.js、property.js、common.js、article.js、transaction.js、security.js、file.js、API接口地址.md；所属项目苏住房C；代码基线83c4136

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "dual_api_instance",
  "source_extraction_id": "cd066349e13749679f633dd45256c607",
  "version": 1,
  "memory_type": "entities"
}
-->