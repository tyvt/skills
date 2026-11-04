# 接口data字段原样透传不重命名
惠山小程序约定接口 data 经展开后原样透传使用，不做字段重命名。

## 规则说明
- 小程序不做字段重命名，接口 `data` 经 `...res.data` 展开后原样透传使用
- 后端返回字段名即前端读取字段名，前后端字段名保持一致

## 选举字段语义
- `mixOptionNum`：最多可选数量（如「20选9」里的9），用于业委会全局上限、选项表决最大项数
- `minOptionNum`：最少可选数量，用于普通选项表决
- `optionNum`：含义因场景不同，业委会里常被当作候选总数或分组可选数
- `totalOptionNum`：分组内候选/选项总数（「20选9」里的20），用于分组展示
- 业委会选举核心接口：`POST /estate/AppDecision/getDecisionDetail`，前端调用 `decisionDetailByIDNumber` → `election`

## 涉及文件（选举相关）
- d:/repository/惠山小程序/src/pages_election/election/Participate.vue
- d:/repository/惠山小程序/src/stores/election.js
- d:/repository/惠山小程序/src/pages_election/election/components/CandidateCard.vue
- d:/repository/惠山小程序/src/pages_election/election/confirmElection.vue
- d:/repository/惠山小程序/src/pages_election/election/optionLimit.js
- d:/repository/惠山小程序/src/api/modules/election.js

## 涉及文件（其他页面）
- d:/repository/惠山小程序/src/pages_election/election/index.vue
- d:/repository/惠山小程序/src/pages_election/election/options.vue
- d:/repository/惠山小程序/src/pages_vote/vote/step1.vue

## 验证与归属
- 验证证据：src=惠山小程序/001.md
- 来源会话：e1838796-0994-4a01-8bd8-d86d41d01e81
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山小程序技术模式",
  "name": "data_field_passthrough",
  "source_extraction_id": "7d5ef1522fbc472fbc5710e10832618d",
  "version": 2,
  "memory_type": "entities"
}
-->