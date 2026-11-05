# 苏周到扫码弹窗宽度审查
苏周到扫码弹窗（SuzhouDaoQrLoginDialog）宽度调整审查结论为通过，登录轮询与关闭逻辑未改。

## 审查结论
- 去掉 `zs-size="mini"`（616px）改为 `width="320px"` 并配合 `::v-deep .el-dialog`，消除 240px 二维码两侧多余留白；登录轮询与关闭逻辑未改，未见功能性回归。
- 仅两处 320px 重复声明、窄屏提示多行换行等 MEDIUM 维护性提示，不阻塞合并。
- Lint：后台 `npm run lint` 以 exit 0 结束，但 ESLint 实际报约 3500 条问题（多为全仓 `semi`/`quotes` 风格项，脚本扫 `src/**/*` 而非单文件）；本次改动未单独做「仅该文件零报错」校验，建议合并前对该文件单独 `eslint src/views/login/SuzhouDaoQrLoginDialog.vue` 或按团队规范处理。

## 涉及文件
- `zhi2-web-admin/src/views/login/SuzhouDaoQrLoginDialog.vue`
- `zhi2-web-admin/src/views/home/publicPortal/mock/properties.js`

## 验证与归属
- 验证证据：cursor 提取
- 所属项目：门户
- 来源会话ID：2b16ec8a-8acf-4c77-a414-b61a81601259
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "suzhou_qr_dialog",
  "source_extraction_id": "04a383200b2048969f86cf9638b3ae40",
  "version": 1,
  "memory_type": "entities"
}
-->