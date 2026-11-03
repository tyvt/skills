# 同模块两份同名api文件致接口路径分叉
苏州V3价格备案详情页楼幢Tab打开不发请求且报undefined.length渲染错误，根因为同名api文件多副本仅改一份。

## 问题根因
- src/api下同一业务存在两份同名封装recordPriceHouse.js（api/pricehouse/与api/presale/）
- 组件批量迁移后引用一份，路径规范改造只改另一份，导致实际调用不存在旧路径
- 接口404后被拦截，getList返回undefined，模板访问xxx.length炸成渲染错误

## 解决方案
- 改分页接口路径前先grep同名api文件名，确认全局唯一或一模块多副本，所有副本一起改或删未使用那份
- 子表getList写成response.rows||[]、response.total||0，让接口异常退化成空表而非渲染崩溃
- 排查顺序固定：先看Network是否发请求且URL是否一致（路径分叉伪装成没调接口），再疑zs-tabs懒加载，最后看组件逻辑

## 验证与归属
- 验证证据：会话08444023用户诉求楼幢接口未调/presale/priceBuilding/list，贴BuildingsTable render异常，要求改回/page并加rows||[]兜底
- 涉及文件：zhi2-web-admin/src/api/pricehouse/recordPriceHouse.js、zhi2-web-admin/src/api/presale/recordPriceHouse.js、recordPriceMngSuzhou/detail.vue及BuildingsTable/PriceTable/RecordTable组件
- 所属项目：产品2.0；来源会话：08444023-c60e-41b0-9e6e-c49324a5d33b；代码基线：62d5fb9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dup_api_file_path",
  "source_extraction_id": "fb402dbbd77a4c29a09d2ea0a800eb3b",
  "version": 1,
  "memory_type": "entities"
}
-->