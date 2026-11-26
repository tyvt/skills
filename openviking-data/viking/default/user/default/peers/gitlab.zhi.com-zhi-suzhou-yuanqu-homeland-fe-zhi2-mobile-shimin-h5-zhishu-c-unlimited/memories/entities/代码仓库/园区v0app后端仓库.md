# 园区V0APP后端仓库
仓库路径 D:/repository/园区V0APP后端，包含新一网通办 app 的决策接口，位于 EstateManagement-App 模块。

## 位置与模块
- 仓库路径：D:/repository/园区V0APP后端。
- 新 app 决策接口在 EstateManagement-App 模块，Controller 为 SmCastVoteAppController.java，基址 /version/1/app。
- 选举接口在 SmElectionVoteController.java:40/:145；与前端 src/api/common.ts 一一对应，链路一致。

## 新 app 决策接口清单
- SmCastVoteAppController.java：:59 SmCastVoteListApp、:95 SmCastVoteListAppHistory、:130 SmCastVoteGoHandleApp、:165 SmCastVoteSubmitApp。
- 同文件：:200 SmUserFaceCheck、:236 SmUserVoteDetail、:282 getVoteAnalysis、:305 SmUserVoteDetailList、:338 getVoteAnalysisByWeb、:358 queryOwnerVoteOptionList。

## 检索注意事项
- 之前用 ops_grep 检索被 scan-budget 截断（scanComplete=false，1 万文件上限），漏掉整个 EstateManagement-App 模块，导致「新 app 接口不在本仓库」的错误结论。
- 改用 Bash grep -r（无 scan-budget 限制）才找到；在本仓库做全量代码检索时应优先用 Bash grep -r。


<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited",
  "category": "代码仓库",
  "name": "园区V0APP后端仓库",
  "source_extraction_id": "e04ce4f9eb12437aa62463d9d261b483",
  "version": 1,
  "memory_type": "entities"
}
-->