# Summary
2026-11-26 排查确认：在 iOS 原生仓库使用 `SmCastVote*`、`SmUserVote*`、`SmElection*`、`SmSubmitElection`、`queryOwnerVoteOptionList`、`getVoteAnalysis`、`/version/1/app`、`MtplOwnerVote`、`version/1` 搜索均为 0 命中；`.html/.js/.htm` 内嵌资源仅 4 个无关文件。结论是 iOS 决策功能由 WebView 加载远程 H5，原生仓库没有决策接口调用链路，H5 代码不在该仓库内。
# 2026-11-26 (Thursday) ChatLog:
**user [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: 用对应的接口在iOS仓库也查不到？
...
**assistant [peer=gitlab.zhi.com-zhi-suzhou-yuanqu-homeland-fe-zhi2-mobile-shimin-h5-zhishu-c-unlimited]**: 确认了：**用接口名在 iOS 仓库也完全查不到。**

## 搜索结果

| 搜索词 | 范围 | 结果 |
|---|---|---|
| `SmCastVote*`、`SmUserVote*`、`SmElection*`、`SmSubmitElection`、`queryOwnerVoteOptionList`、`getVoteAnalysis` | iOS 全仓（排除 Pods，所有文件类型） | **0 命中** |
| `/version/1/app`（接口路径前缀） | 同上 | **0 命中** |
| `MtplOwnerVote`（响应字段名） | 同上 | **0 命中** |
| `version/1` | 同上 | **0 命中** |
| 内嵌 H5 资源 | `.html/.js/.htm` | 仅 4 个无关文件（图片放大、协议、隐私），**无决策相关** |

## 结论

iOS 仓库里既没有这些接口名的调用代码，也没有内嵌这些接口的 H5 文件。结合上一轮发现（`业主决策` 只是 `menu.json` 里的菜单码 `3_0_0`，无原生页面实现），可以确定：

**iOS app 的决策功能是纯 WebView 加载远程 H5，H5 代码不在 iOS 仓库里**，所以无论用中文业务词还是用确切接口名，在这个仓库都搜不到任何决策接口调用链路。

要核对「接口调用链路是否一致」，需要拿到 iOS 实际加载的那个 H5 地址（菜单码 `3_0_0` 对应的线上 URL）对应的前端仓库，而不是 `家园区appios` 这个原生壳工程。

<!-- MEMORY_FIELDS
{
  "event_name": "iOS仓库决策接口无命中确认",
  "goal": "确认接口搜索结果",
  "summary": "2026-11-26 排查确认：在 iOS 原生仓库使用 `SmCastVote*`、`SmUserVote*`、`SmElection*`、`SmSubmitElection`、`queryOwnerVoteOptionList`、`getVoteAnalysis`、`/version/1/app`、`MtplOwnerVote`、`version/1` 搜索均为 0 命中；`.html/.js/.htm` 内嵌资源仅 4 个无关文件。结论是 iOS 决策功能由 WebView 加载远程 H5，原生仓库没有决策接口调用链路，H5 代码不在该仓库内。",
  "ranges": "0,5-8",
  "source_extraction_id": "8168d7ff505447da99b24e9ec96124d5",
  "version": 1,
  "memory_type": "events"
}
-->