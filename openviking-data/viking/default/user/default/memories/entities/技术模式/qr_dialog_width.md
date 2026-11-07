# 苏周到扫码弹窗二维码宽度适配
苏周到扫码登录弹窗内约240px宽二维码原套用zs-size="mini"(616px)导致两侧留白过大，需改显式像素宽贴合内容。

## Description
- 现象：SuzhouDaoQrLoginDialog 内二维码约240px宽，却套了 zs-size="mini"（约616px），两侧留白过大。
- 根因：全站约定 zs-dialog 用 zs-size 选档（mini≈616px）适用于表单/详情类；内容宽度远小于 mini 档时档位仍按固定像素撑开，不随二维码收缩。
- 所属项目：门户；涉及文件：zhi2-web-admin/src/views/login/SuzhouDaoQrLoginDialog.vue

## Solution
- 去掉 zs-size="mini"，根节点设 width="320px"。
- 必要时配合 ::v-deep .el-dialog { width: 320px } 压过 Element 默认宽。
- 登录轮询、关闭逻辑不动；改完目视确认240px码区左右对称。
- 窄展示型弹窗（扫码、纯图）可显式像素宽，表单类仍走档位或 form-layout。

## Verification
- 验证：会话 2b16ec8a 审查结论通过——去掉 mini(616px) 改320px + ::v-deep .el-dialog 可消除留白，轮询与关闭未改。
- 验证证据：src=门户/029.md；全仓 npm run lint 退出码0但掩盖单文件 ESLint 风格报错，合并前需对 src/views/login/SuzhouDaoQrLoginDialog.vue 单独校验。
- 来源会话ID：2b16ec8a-8acf-4c77-a414-b61a81601259；代码基线：dfee5a6

## 验证与归属
- 验证证据：extracted source=cursor project=门户


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "qr_dialog_width",
  "source_extraction_id": "eeb4eae15e2a49d9927fbe95734fea10",
  "version": 2,
  "memory_type": "entities"
}
-->
