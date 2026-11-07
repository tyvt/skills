# z-paging默认fixed铺满遮挡外部按钮
苏住房C（uni-app小程序zhi2-mobile-shimin）「我的-一手房交易」列表页顶部Banner与「去申请」按钮写在z-paging标签外导致点击无反应。

## 问题现象
- 各区域「去申请」按钮均无反应、不报错，因共用同一页面结构故每个区域都点不动

## 根因
- z-paging默认fixed:true，以fixed方式铺满全屏并压在外部兄弟元素之上，点击事件被其容器吃掉

## 解决方案
- 按官方约定把顶部内容放进#top插槽（<template #top>Banner+按钮</template>），列表保留默认插槽，goApply()逻辑照旧
- 顶部内容在组件内部渲染，层级与滚动由z-paging管理，不再被遮挡
- 验证：会话1cc8c845（基线77666f8）「我的-一手房交易各区域点去申请无反应」，修复为移入#top并新增goApply()；涉及文件pages_transaction/newHouseCertification/index.vue、detail.vue、choose.vue；所属项目苏住房C；来源会话ID 1cc8c845-4c5d-4565-a1fd-23d08d025e11；代码基线77666f8

## 排查口径
- 小程序「同一页面所有按钮都点不动/只有列表区能滚动」优先怀疑z-paging、scroll-view等自带fixed或全屏容器的包裹问题，而非事件绑定或权限
- 改完必须重新编译小程序再验证

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "zpaging_block_click",
  "source_extraction_id": "0e31f6bb15d24732a33d1e0cad0d9ed7",
  "version": 1,
  "memory_type": "entities"
}
-->
