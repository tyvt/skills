# 业委会选举列表默认图不显示修复
昆山市民小程序「已完成」业委会选举列表因本地默认图被当服务端图片解析且兜底图缺失，导致默认图不显示，已修复。

## 问题根因
- 选举列表用 `<zs-image :src="item.headUrl" :local="false" />` 把本地默认图当服务端图片解析。
- Store 里 `headUrl` 写在 `...item` 前面，接口返回空 `headUrl` 覆盖默认值。
- 加载失败兜底图 `images/szf/default.png` 在项目不存在。

## 解决方案
- `election/index.vue` 改为 `<zs-image class="pic" src="images/svg/default.svg" />` 直接加载本地默认图。
- `election.js` 删除无用的 `headUrl` 字段。

## 验证与归属
- 涉及文件：d:/repository/昆山市民/src/pages_election/election/index.vue、src/pages_election/election/election.js、src/pages_election/election/listStyle.scss、src/pages_vote/vote/index.vue、src/components/zs-image/zs-image.vue、src/stores/election.js
- 来源会话ID：1ffc6a54-b6d6-4dcc-ba0b-74ef9650cccc
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "election_default_bug",
  "source_extraction_id": "c3b6be7beffe427a8a4251db85b7ca61",
  "version": 1,
  "memory_type": "entities"
}
-->