# zhi2-mobile-shimin-h5-c-unlimited
无锡市民/苏服办 C 端父仓库，包含 zhi2-mobile-admin-h5-c-unlimited 子模块，当前工作分支 main-sfb。

## 打 Tag 约定
- 父仓与子模块使用同名的附注标签（annotated tag）
- 标签名采用 `YYYYMMDDHHmm` 格式时间戳
- 注释用中文，并注明子模块的短哈希
- 前一 tag `202611041456` 同为附注 tag、父仓+子模块同名成对推送，形态一致

## 仓库结构
- 父仓库分支 main-sfb，gitlink 提交 a672d2e（已推送，2026-11-13）
- 子模块 zhi2-mobile-admin-h5-c-unlimited，分支 dev_wuxi-sfb，提交 9f04cb5（已推送，2026-11-13）
- 两端远程 tag 均已推送，`git ls-remote` 复核 `^{commit}` 指向确认一致

## 近期 Tag
- tag `202611131548`（2026-11-13）：父仓提交 a672d2e（远程 05842ff），子模块提交 9f04cb5（远程 30887b1）
- 父仓 tag 注释：「苏服办跳转增加链路日志（密文脱敏）+ 缺失手机号提示改为绑定指引（子模块 9f04cb5）」

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_mobile_shimin",
  "source_extraction_id": "5db6478697d3414f94ebbea622994d60",
  "version": 1,
  "memory_type": "entities"
}
-->