# 一手房交易去申请按钮点击无响应
苏住房C小程序「我的-一手房交易」各区域「去申请」按钮因写在z-paging外部被遮挡导致无响应。

## 问题根因
- 一手房交易列表页newHouseCertification/index.vue顶部Banner和「去申请」按钮写在z-paging外面
- z-paging默认fixed:true全屏铺满盖住外部元素，点击被拦截，各区域均出现

## 修复方案
- 按z-paging官方建议，将顶部内容放进#top插槽，Banner和「去申请」在组件内部渲染
- 将Banner+「去申请」移入<template #top>
- 新增goApply()方法处理跳转
- 列表区域保留在默认插槽中

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 重新编译小程序后，进入「我的→一手房交易→选择区域」点击「去申请」应正常跳转
- 涉及文件：newHouseCertification/index.vue、detail.vue等
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：1cc8c845-4c5d-4565-a1fd-23d08d025e11；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "newhouse_apply_button_blocked",
  "source_extraction_id": "aded602703eb47bab03dc2c6bb2b83c5",
  "version": 1,
  "memory_type": "entities"
}
-->