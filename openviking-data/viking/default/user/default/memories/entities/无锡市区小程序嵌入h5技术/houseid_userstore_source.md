# 嵌入H5业务houseId以userStore为唯一来源
小程序web-view嵌入H5时子页须以App.vue解析的userStore.houseId为唯一房屋上下文来源，禁混用本地store或路由参数。

## 问题现象
- H5被小程序web-view打开，入口URL带houseId及token，但子页（如维修资金）仍从useHouseStore.currentHouse、onLoad options.houseId取参
- 导致接口houseId为空或与小程序传入不一致，产生隐蔽联调问题

## 根因
- 嵌入场景房屋上下文在App.vue的initH5Context中从query写入userStore（如applyHouseSelection同步projectName）
- 子页再读本地选房store或路由参数会与入口URL脱节；payment等页已统一走userStore时其它页混用会出问题

## 修复方案
- 嵌入H5子页查询类接口统一使用userStore.houseId / userStore.projectName
- 移除对useHouseStore及仅用于兜底的options.houseId依赖
- 数据流约定：URL ?houseId=xxx → App.vue initH5Context → userStore → 各业务页；小程序侧需保证web-view入口URL带上houseId与token

## 验证与归属
- 来源会话：55e004d6-eb3e-4e5c-90c3-0c52cf8d6b5c
- 代码基线：fb55fa9
- 涉及文件：App.vue、pages_owner/maintain/index.vue、store/user.js
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "houseid_userstore_source",
  "source_extraction_id": "99c310e4881245c0b2a8af204733867b",
  "version": 1,
  "memory_type": "entities"
}
-->