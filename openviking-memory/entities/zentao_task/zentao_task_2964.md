# 禅道任务 2964
禅道任务 2964 要求把门户首页横幅两行文字替换为附件中的两张图片切图，并保持相对位置。

## 需求与范围
- 原始目标（逐字）：`禅道第二张图片是改首页的文字，替换为上面附件里面2张图，注意相对位置`。
- 验收口径：首页「平台统一入口」横幅两行文字替换为两张切图，上排左对齐、下排向右缩进；第一张操作引导图明确不在范围内。
- 完成标准：验证截图发到聊天并获用户确认后，再提交推送代码、回写禅道 2964 截图并清理过程产物。

## 已完成工作
- hop1 已完成且本会话未重跑：查单、定位代码、保存两张切图、改模板/数据/CSS、grep 零残留、构建通过（BUILD_EXIT=0）。
- 前端验证使用门户本地端口 8090：8091 被旧 `sites-enabled/门户H5.conf` 占用并指向 `D:/repository/门户H5/dist`，而非 `D:/repository/门户/dist`；部署面板映射 portal/dev=8091 到正确 dist。
- 两张 PNG 均返回 HTTP 200，渲染尺寸为上排 285x28、下排 324x26；横幅与预期图 24658 一致，上排「商品房、存量房交易管理」左对齐、下排「面积管理 经纪机构行业监管」右缩进。
- 桌面截图：`C:/Users/Administrator/AppData/Local/Temp/zentao-2964/banner-desktop-20261126-183055.png`；移动截图：`C:/Users/Administrator/AppData/Local/Temp/zentao-2964/banner-mobile-20261126-183119.png`。

## 约束与阻碍
- 502 API 错误弹窗一度遮住横幅，已关闭；横幅图片位于内层滚动容器 y≈1159/1192，已滚动到可见区域。
- 移动 390px 视口出现全站横向溢出，属于本改动前既有问题。
- 两次 `ask_user_question` 确认均中断（相隔约 29 分钟，随后约 3.5 小时），用户始终未确认；因此未执行提交、推送和禅道回写。
- 系统 AGENTS.md P0（2026-11-23）覆盖交接文档 maxHops=10：终止只取决于第 4 节是否清空，排程提示不得设置 maxHops。

## 交接与剩余工作
- 代码尚未提交：`UnifiedLogin.vue` 已修改且两张 PNG 未跟踪；本会话未改代码，所以未重跑构建。
- hop2 交接文档 `D:/plan/门户/HANDOFF-CHAIN-禅道2964首页横幅两行文字替换-hop2-20261126-223358.md`；下一会话 `session-853f2289-dbfd-48a2-b828-37012acb8d3b` 排程 22:34:37。
- 剩余：一次性确认；确认后提交推送子模块及父仓 gitlink，带图回写禅道 2964，并清理过程产物。


<!-- MEMORY_FIELDS
{
  "category": "zentao_task",
  "name": "zentao_task_2964",
  "source_extraction_id": "fb43e506565843fa8078c9b835a2fafa",
  "version": 1,
  "memory_type": "entities"
}
-->