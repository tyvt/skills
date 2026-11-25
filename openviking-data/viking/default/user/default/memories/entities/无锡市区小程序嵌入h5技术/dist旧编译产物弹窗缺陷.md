---
audit_status: invalid
last_checked: 2026-11-25T19:35:19+08:00
verdict_note: 记忆称已彻底删除 showOwnerDecisionConfirmModal 及文案并产出 usePortal.be15442a.js；实测 usePortal.js-134/350/385/437/501 仍调用/定义该函数，owner-decision-confirm-modal.vue-30 仍有「业主电子表决」文案，dist 仅有 usePortal.5732b10f.js，与现状矛盾。
---
# dist旧编译产物导致业主决策弹窗未消失
无锡市区小程序嵌入H5中，源码已改动但页面仍弹「业主电子表决」确认框，根因为加载了dist目录旧编译产物。

## 问题根因
- 实际运行的是dist目录里的旧编译产物，其中usePortal仍走登录校验→实名校验→uni.showModal二次确认
- 源码修改未重新构建并刷新dist资源，故页面行为未变

## 已处理
- 彻底删除showOwnerDecisionConfirmModal及相关文案（H5工程+小程序工程）
- 重新执行npm run build，更新dist/assets/usePortal.be15442a.js（新包已无「业主电子表决」弹窗文案）

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 需刷新/重新加载小程序或H5使用的dist资源（微信开发者工具重新编译、清缓存后预览）
- 涉及文件：dist/assets/usePortal.be15442a.js、src/pages.json、src/pages_owner/house/detail.vue等
- 所属项目：无锡市区小程序嵌入H5；来源会话：9b0c382d-6f57-4324-ab6b-ebafaf8e1362；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "dist旧编译产物弹窗缺陷",
  "source_extraction_id": "913058b2466f4d2ea7d6880e88c6a947",
  "version": 1,
  "memory_type": "entities"
}
-->