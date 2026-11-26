# 园区V0APP后端
园区V0APP后端是老 H5（园区表决H5）的后端，提供 /h5decision/* 决策接口；排查确认这里没有新 app 的 SmCastVote* 接口或打开详情写状态逻辑。

## 服务范围
- 本地路径 D:\repository\园区V0APP后端；实际服务老 H5，而非新一网通办 app 的决策服务。
- 全仓（所有文件类型）搜 SmCastVote* / SmUserVote* / SmElection* / queryOwnerVoteOptionList 为 0 命中。
- /version/1/app 前缀 Controller 只有 7 个（反馈、房产、车位、门禁、参数等），无决策相关；ShiroConfig.java:202-205 白名单也只有反馈/参数，没有 vote 接口。
- 门户后端、太仓物管后端、苏住房后端等兄弟仓库同样查不到 SmCastVoteListApp/SmUserVoteDetail。

## 老 H5 决策接口
- MtplOwnerVoteObligeeListH5Controller.java:28 映射 /h5decision，包含 /decisionRecord 与 /ownerDecisionRecord（:34/:53）。
- MtplOwnerVoteObligeeDetailH5Controller.java:45 提供 /h5decision/ownerDecision。
- MtplOwnerVoteObligeeDetailH5ServiceImpl.java:79-106 的 ownerDecision() 仅执行 selectById / selectList，未发现 update/insert。
- 类级 @Transactional 存在，但详情路径没有写库操作。

## 状态结论
- 老 app（iOS→老H5→V0后端）没有“点详情后参与变修改”；老 H5 用未参与、已参与、已完成 Tab 分流，详情接口只读不改状态。
- 新一网通办的点详情回来变修改由前端 onShow 重载与 voteState 驱动（components/index.vue:51-53,195）。
- 产生 voteState 的后端接口不在本地这几个仓库里，无法从现有代码定位根因；需确认新 app 实际后端仓库或取得 SmUserVoteDetail / SmCastVoteGoHandleApp 服务代码。

<!-- MEMORY_FIELDS
{
  "category": "后端服务",
  "name": "园区V0APP后端",
  "source_extraction_id": "3186d99790224a229c5c465d6196f830",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited",
  "version": 2,
  "memory_type": "entities"
}
-->