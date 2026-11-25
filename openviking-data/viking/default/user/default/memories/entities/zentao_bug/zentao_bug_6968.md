# ZenTao Bug 6968 求援工单详情页操作按钮缺失
禅道缺陷 6968：求援工单详情页缺少主管部门操作按钮（立即受理/上报/进度反馈/完结）；根因为分页拆分回归，2026-11-25 已完成修复、构建、实机验证、禅道带图回写（resolved/fixed）与产物清零，链路终止。

## 基本信息与根因
- 禅道链接 http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6968；缺陷为详情页底部操作按钮缺失，影响主管部门用户；项目为查询 H5（C 端 H5），测试环境 localhost:8162。
- 浏览器复现走不通：页面跳转登录、无法完成鉴权（记为复现退出条件，以报告人截图为证据）。
- commit `ecb15c7` 的单页实现含操作按钮；commit `3516f59` 拆成 3 页时在 `detail.vue` 丢失操作栏，属回归；参照 G 端核对操作按钮、API、后端端点、状态常量与详情响应结构。

## 评审与实现
- 计划首审被 P0 驳回（验证需登录/测试数据且无存储凭据）；复审 PASS（84/100），门控要求先确认实施、提交/推送/回写延至验证后，用户已确认。
- 验证路径：`?token=` URL 注入或 demo 模式；验证码端点 `/v2.0/code`，默认识别失效改用 magpie-vision；后续完成 agent-browser 4 按钮验证与截图并经用户确认 `...-before.png`。
- `detail.vue`：补 import 与角色/状态逻辑，`callPhone` 后、`onLoad` 前加角色检测与写操作，`</scroll-view>` 后加操作栏与 sheet，样式置于 `</style>` 前；`hint` 改可选。
- 基线构建 exit 0；typecheck 仅既有文件报错，本文件 hint 一处已修；最终构建 exit 0、22s，detail.vue 无报错。
- 首轮 P0 交接已写文档排下一跳；因网络超时与成本上限又触发第二次 P0 硬交接（hop2）。

## 禅道回写与收尾（hop2，2026-11-25）
- 修复提交 `43f282f08a88`（`43f282f`）由并发会话推送；本地 `origin/dev` ref == HEAD（left-right 0/0），但 `ls-remote`/`push` 因网络/credential-manager 受限卡住无法直连复核，按「禁止重复提交/反复裸 fetch」停止重试。
- 上传验证截图得 fileID `24342`（png）；bug 元数据 product=79、project=141、execution=142、openedBy=lichandan（回写前 status=active）。
- 用新禅道连接 `4027e274…`（未碰老禅道）执行 8 步 DBX 事务：UPDATE zt_bug（status=resolved、resolution=fixed、resolvedBy=tiany、assignedTo=lichandan）、INSERT zt_action（files=24342、extra=fixed、comment 含根因/修复/验证与 `<img>` 附图）、附件挂 bug；事务内复核后 COMMIT 落库。
- 复用既有构建基线日志（exit 0、22s、DONE），未重跑、未改项目源码；`$TEMP\zentao-6968\` 整目录、`.task-state/build-*`、工作区根 3 个 0 字节垃圾文件全部删除并复核，detail.vue 仍 clean。
- 第 4 节三项待办实质闭环，链路终止不排 hop3；推送直连验证因环境网络不可达为唯一未闭环验证点。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6968",
  "source_extraction_id": "2edd2902505f41669e05edf4b80a0f02",
  "version": 2,
  "memory_type": "entities"
}
-->