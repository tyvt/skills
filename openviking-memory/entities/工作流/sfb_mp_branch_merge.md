# 苏住房C 分支合并模型
苏服办(sfb/main-v2.1) 与微信小程序(mp) 是同一子模块两条并行分支，互合需排除网关文档保留 mp 结构再编译验证。

## 适用场景
- 苏住房C 仓（superproject + 子模块 zhi2-mobile-shimin）同时维护苏服办端与微信小程序端
- 需把 main-v2.1 修复合到小程序分支，或小程序样式改动回合 main-v2.1

## 为什么不能直接整分支合并
- 两分支差异不止业务代码：sfb 带网关逻辑、doc/docx 附件、不同环境 proxy
- mp 分支有自己目录（pages_main/pages_tab）与 @/ 别名、人脸核验等专属页面
- 直接 merge 产生上百冲突（实测 118 个）并带入不该进小程序的网关内容

## 做法
- 先合子模块：git merge 目标分支，按保留 mp 目录结构/@/别名/专属文件逐文件解冲突
- 再合主仓库：只更新子模块指针，排除苏服办文档，保留通用文档
- 环境配置保留小程序自己测试环境 proxy，不被对方覆盖
- 合并后立刻 npm run build:mp-weixin 编译验证，只接受 warning 不接受 error
- 反向回合同样走子模块提交推送合并再父仓库提交指针推送合并，完成后切回 dev-sfb

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 72fc5cce 解决 118 冲突，子模块 a4811aa0/fa6929e2、主仓库 af36c7c，排除 doc/docx，build 成功；会话 2a28d769 展示双推送完整流程
- 涉及文件：pages.json、.env.development、package.json、.gitmodules
- 所属项目：苏住房C；来源会话：72fc5cce-130f-44b1-bd46-0257f06c74e4, 2a28d769-4a41-4a8a-a03f-b7cdd347e192；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "工作流",
  "name": "sfb_mp_branch_merge",
  "source_extraction_id": "bfcdbef44d864551a289c9427a08b7e8",
  "version": 1,
  "memory_type": "entities"
}
-->