# ZsEmpty 空状态图塌缩为0
苏住房C 小程序「我的合同」等页 ZsEmpty 空状态配图整块不显示，根因是 .empty-pic 用 fit-content 与内部 ZsImage 100% 形成循环依赖塌缩为 0×0。

## 问题现象
- 「我的合同」等页面用 ZsEmpty 做空状态，接口无数据时只显示「暂无数据」文字，配图整块不显示
- 图片文件本身未缺失，控制台无资源 404，仅剩文字

## 根因
- ZsEmpty 的 .empty-pic 包裹层写 width/height:fit-content（由子元素撑开）
- 内部 ZsImage 默认 width/height:100%（由父元素给出），小程序渲染下父子尺寸循环依赖，盒子塌缩 0×0
- 与图片地址拼错是两类问题，地址类排查在此对不上

## 解决方案
- 空状态包裹层给固定尺寸（本项目统一 320rpx×320rpx），不用 fit-content/min-content/auto 包百分比组件
- 同类排查顺序改为先看包裹层是否有确定尺寸，再怀疑图片路径
- ZsEmpty 位于主包 components 供各分包复用，须显式传 subpackage（如 subpackage="pages_main"）才能正确解析分包静态资源

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 269bb15a 用户反馈 pages_main/my/myContract 空数据图片不显示；修复 .empty-pic 改固定 320rpx×320rpx，myContract.vue 显式传 subpackage="pages_main"
- 涉及文件：src/components/ZsEmpty/ZsEmpty.vue、src/components/ZsImage/ZsImage.vue、src/pages_main/my/myContract.vue
- 所属项目：苏住房C；来源会话ID：269bb15a-f2a2-4040-ac11-d7ad84921432；代码基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "zsempty_pic_collapse",
  "source_extraction_id": "6effc7066ae1427b831acada34d3612d",
  "version": 1,
  "memory_type": "entities"
}
-->