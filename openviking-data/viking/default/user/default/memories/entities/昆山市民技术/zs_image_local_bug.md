# Zs-image本地默认图误作服务端解析
昆山市民选举页因 zs-image 组件误将本地默认图当服务端解析导致图片丢失的 bug 根因与修复记录。

## 问题根因
- `election/index.vue` 用 `<zs-image :local="false">` 将本地默认图当服务端解析
- `election.js` 中 `headUrl` 被接口空值覆盖，兜底图路径不存在

## 修复方案
- `election/index.vue` 改为直接加载本地图 `images/svg/default.svg`
- `election.js` 删除无用 `headUrl` 字段

## 验证与归属
- 验证证据：extracted source=cursor project=昆山市民
- 来源会话：1ffc6a54-b6d6-4dcc-ba0b-74ef9650cccc
- 验证证据：src=cursor session=1ffc6a54-b6d6-4dcc-ba0b-74ef9650cccc
- 所属项目：昆山市民；代码基线：none
- 涉及文件：src/pages_election/election/index.vue、src/pages_election/election/listStyle.scss、src/pages_vote/vote/index.vue、src/components/zs-image/zs-image.vue、src/stores/election.js、src/utils/resolveAssetUrl.js、src/pages/common/components/ZsImage.vue

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "zs_image_local_bug",
  "source_extraction_id": "d2d502880c35424ea5806bfda71a4a91",
  "version": 1,
  "memory_type": "entities"
}
-->