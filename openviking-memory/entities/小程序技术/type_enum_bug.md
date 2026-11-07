# 页面URL的type误当接口枚举致列表空数据
苏住房C移动端「最新楼盘」页把路由type直接当halfYearAgo枚举传参，实际按「在售」查询返回空列表。

## 问题现象
- 「苏找房→新房→最新楼盘」打开无数据，同功能APP端有数据
- 后端不报错、前端不报错，只表现为空列表，易误判成「没数据」或权限问题

## 根因
- listRecommendProject按halfYearAgo枚举过滤（1=在售，2=最新），indexMore.vue把URL页面type直接赋给halfYearAgo
- 在售type=0需1、最新type=1需2，2025-05调整时页面layer与接口layer语义未对齐，参数类型合法故不报错

## 解决方案
- 页面建映射表HALF_YEAR_AGO_MAP={0:1,1:2}，用if(MAP[pageType]!=null)t.halfYearAgo=MAP[pageType]避免0被falsy吞掉
- 对照原生端真实请求体对表；开发者工具Network确认请求体halfYearAgo是否为期望枚举值
- index.vue与indexMore.vue双入口一并核对

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话86696cb3用户报最新楼盘无数据，agent对比确认type=1被当halfYearAgo=1，在indexMore.vue:65-91加映射修复
- 涉及文件：src/pages_transaction/newHouse/indexMore.vue、index.vue、src/api/transaction.js、src/hooks/usePaging.js
- 所属项目：苏住房C；来源会话ID：86696cb3-e77a-4306-8d93-2aa391d79f46；代码基线：5f0f4dc

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "type_enum_bug",
  "source_extraction_id": "1783407079064bbfa35c5b8e02609550",
  "version": 1,
  "memory_type": "entities"
}
-->