# 子模块版本合并逐文件取舍流程
苏住房G的zhi2-web-admin子模块合并不同分支时，需逐文件保留双方语义而非整体ours/theirs，并分两步提交推送。

## 背景与动机
- develop/v2.6.1合并develop/v2.6.0出现8文件20处冲突，两侧各自演进功能，整块选一侧会静默丢功能
- 与「子模块指针冲突选较新SHA」不同，本条是子模块内部源码冲突逐文件取舍

## 解法要点
- resolveServerAssetUrl.js保留v2.6.1的origin实现，并入v2.6.0的resolvePublicAssetUrl两函数并存
- 详情/表单页统一采用v2.6.0页面结构与表单组件口径(zs-form、HeadTitle等)，避免新旧混用
- 功能角标与附件预览并存侧都保留；creditCard.vue采用v2.6.0的showCycle并删误合并detail方法
- 子模块先提交(1624646)，父仓再提交指针更新(123fae3)，推送先cd子模块git push再回父仓git push

## 验证与归属
- 涉及文件：utils/resolveServerAssetUrl.js、credit/companyEvaluation组件、evaluation多个组件等
- 所属项目：苏住房G；来源会话ID：fa76006a-862d-4f4b-9ae4-06673805a62a；代码基线：22baec7

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "submodule_merge",
  "source_extraction_id": "6e75b43cde7c4ebca6d3d7d4b85aa3cc",
  "version": 1,
  "memory_type": "entities"
}
-->