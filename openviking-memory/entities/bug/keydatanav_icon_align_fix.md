# 关键数据导航图标放大与对齐修复（禅道6582）
苏住房前端 zhi2-web-admin 首页关键数据导航（KeyDataNav）图标过小及两侧子数据框不对齐问题的修复记录。

## 问题根因
- 原 `.kd__icon-wrap` 尺寸过小、`.kd__icon` 偏小，两侧子数据框高度不一致导致视觉不对齐

## 修复内容
- `.kd__icon-wrap` 改为 40×40px，`.kd__icon` 改为 24×24px
- `.kd__box` 高度统一为 40px，使两侧子数据框等高对齐
- 提交 `a6bc559fc`「style(home-v2): 关键数据导航图标放大并统一子数据框高度使两侧对齐 (zentao#6582)」，分支 `develop/v2.6.2-suzhufang`

## 验证与部署
- 本地 nginx 8101（D:/repository/苏住房G/dist）实测生效：图标放大、框等高对齐
- 用户实际查看远程测试环境 `unlimited.g.h5.admin.web.v2.suzhufang.shiqu.suzhou.test.zhi.com`（独立构建部署），需该环境自行构建分支才会更新
- 验证证据：2026-11-13 本会话本地 8101 截图实测数值

<!-- MEMORY_FIELDS
{
  "category": "bug",
  "name": "keydatanav_icon_align_fix",
  "source_extraction_id": "4cc016473c3b49b8b39c8551435501f1",
  "version": 1,
  "memory_type": "entities"
}
-->