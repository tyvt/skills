
# 存量房网签合同查询空结果区域缺失修复
苏住房C小程序（zhi2-mobile-shimin）中stockHouseContract.vue因缺少错误处理导致接口报错时无查询结果区域，已参照houseNewContract.vue修复。

## 问题根因
- 图1（商品房）查询后显示「查询结果」区域，无数据时展示空状态提示
- 图2（存量房）输入查询后下方完全无「查询结果」区域
- 原因是存量房页面缺少与商品房相同的错误处理——接口报错时`searchFlag`未置为`true`，结果区域不会渲染

## 修复内容
- 在stockHouseContract.vue中参考houseNewContract.vue处理逻辑
- 增加`.catch()`处理：接口失败时也设置`searchFlag = true`，并清空列表，显示空状态提示
- 兼容多种返回格式：支持`res.data`为对象、数组或空值的情况

## 涉及文件
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_transaction/service/stockHouseContract.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/pages_transaction/service/houseNewContract.vue
- d:/repository/苏住房C/zhi2-mobile-shimin/src/api/transaction.js

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：e5a11fd1-77fb-4778-8bf6-a4cb438ff07d
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "stock_house_contract_search_flag_fix",
  "source_extraction_id": "e4499bd152024ddfb3f1405d312e4576",
  "version": 1,
  "memory_type": "entities"
}
-->