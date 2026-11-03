# 业主表决/业委会选举列表勿在 onUnload 多级 navigateBack
昆山市民业主决策相关列表页曾在 onUnload 主动多次 navigateBack，导致返回时一次退出多页，应移除该逻辑。

## 问题背景
- `pages_vote/vote/index.vue`、`pages_election/election/index.vue` 曾在 `onUnload` 里主动多次 `navigateBack`。
- 从业主决策返回会一次退出多页，破坏导航预期。

## 解决方案
- 移除 onUnload 中的多级 navigateBack 逻辑，依赖系统导航栏默认单级返回。

## 验证与归属
- 验证：会话 3731b85d 用户要求改为通用返回，两处列表页一并处理；验证证据：src=昆山市民/006.md
- 涉及文件：src/utils/wxLogin.js、src/pages_vote/vote/index.vue、src/pages_election/election/index.vue、src/pages_vote/vote/votedetail.vue、src/pages_vote/vote/affirm.vue、src/pages_vote/vote/participate.vue、src/pages_vote/vote/faceSuccess.vue、src/pages/common/components/ZsNav.vue。
- 所属项目：昆山市民；代码基线：38d1482；来源会话ID：3731b85d-c4b8-48f3-b25e-7cf1583be2da。

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "vote_onunload_pattern",
  "source_extraction_id": "caaa6f50daa5490bae09d3487c3ef499",
  "version": 2,
  "memory_type": "entities"
}
-->