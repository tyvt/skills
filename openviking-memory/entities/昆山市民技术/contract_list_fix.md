# 物业合同列表页加载修复
昆山市民小程序「物业合同」列表页（pages_contract/list）进入不自动加载数据的问题修复记录。

## 问题根因
- 原 useLoadMore 进入页面不立即请求第一页，需滑到底部才加载
- list.vue 加载中先闪「暂无数据」再出数据

## 修复方案
- useLoadMore：进入页面立即请求第一页，不再等滑动到底部
- list.vue：加载中显示「加载中...」，避免先闪「暂无数据」
- 重新编译后进「物业合同」页数据自动加载，不用滑动

## 验证与归属
- 涉及文件：src/pages_contract/list.vue、src/hooks/useLoadMore.js、src/api/modules/contract.js、src/pages_home/home.vue、src/pages_benefit/benefit/index.vue
- 所属项目：昆山市民；来源会话ID：36463f59-a953-4d01-8c85-f8ed807c8d73；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "contract_list_fix",
  "source_extraction_id": "f93ad767e88948b5b1deeea32b5a0798",
  "version": 1,
  "memory_type": "entities"
}
-->