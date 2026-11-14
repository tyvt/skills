# zhi2-web-admin
房地产综合服务平台门户；父主仓库 `苏州市房地产监测V3`（`D:\repository\苏州市房地产监测V3\`）的 git 子模块，路径 `D:\repository\门户\zhi2-web-admin`。

## 仓库与流程
- 提交顺序固定：先推子模块，再提交父仓 gitlink 并推送；子模块构建 `version.json` 须回退保干净。
- 错误台账 `docs/frontend/common-errors.md`：2026-11-09 加 E-046、2026-11-13 加 E-052；只改 worktree 副本，禁改主仓库。
- 2026-11-09 父仓 gitlink `77a7e6dee` 与 HEAD 一致；主仓未跟踪产物与被改 `env/.env` 保持不动。
- suzhufang-li 分支 checkout 于 `bug5897` worktree（主检出 detached HEAD），提交后同步主检出并刷父仓 gitlink（2026-11-10）。
- 子模块目录空或 `.git` 缺失可 `git submodule update` 恢复（2026-11-09）；`.git` 指针含中文路径误报 "modified content"，实为正确 UTF-8。
- 2026-11-14 核对基线：父仓保留 3 项原有改动，子模块干净；候选 worktree 基线构建通过，产物标记 `b48629cd4`。

## 提交与改动
- 2026-11-13 删三个注册页附件区重复 uploadTip：子模块 `26282982b` 推 develop/v3.0.0，父仓 gitlink `26ae481b`（新增 E-052）。
- 关键数据导航底部撑满 `50d3a8961`（`style(home-v2): 关键数据导航内容纵向撑满卡片底部`），仅改 KeyDataNav.vue、SectionCard.vue，lint 通过已推分支。
- `src/views/benefit/pubAllotNotice/detail.vue` 既有改动未暂存未提交，有意保留。

## 顶部导航（任务 2468）
- 共享 Navbar 需按账号菜单权限平铺、溢出用左右箭头滑动；现实现把超出项收进「更多功能」，参考 V3 全量菜单、两端箭头、溢出检测与横向滚动（2026-11-14 分析，未改码）。
- 2026-11-14 部署还原度差，要求同视口 E2E 截图比对 V3，图标、尺寸、间距、颜色与滚动交互 100% 对齐；动手前先确认仓库/worktree 状态与既有 E2E 预检配置。
- `http://localhost:8101` 已响应但停在登录页，无法截图测导航；改用现有 E2E 的 mock 登录与菜单路由在同一部署入口验证 Navbar，对照 V3 缺纵向图标、活动项边框/滑块与背景图层。

## 已知代码问题
- companyRecord.js 缺 `LEASE_CHANGE_FLOW_BUS_CODE` 导出，致 `AgencyBasicInfoDetail.vue` 编译中断；提交 0049c14e3 定为 `'zljgbgxq'`（租赁机构），待补导出（2026-11-11）。
- `utils/request.js:215` 的 `returnRawResponse` 支持透传原始响应。

## 缺陷索引
- develop/v2.6.2-suzhufang 已合入 bug6369、bug6540、bug6568、bug6577、bug6576、bug5819、bug6582，根因/提交/禅道状态见同名卡片。
- develop/v3.0.0 已修复 bug6563（经纪机构基本信息变更表单补机构类型字段），见 `bug6563` 卡片。
- bug6559：惠山 `6fc3bb94d`、苏住房 `4a32dc38f` 均仅改 detail.vue（pubAllotNotice 漏 noticeAmount、金额无兜底），禅道 resolved/fixed（zt_action 92984），目视验证未完成，后端 Dameng 表缺合同列待补，详见 zentao_bug_6559。

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_web_admin",
  "source_extraction_id": "ea0e3e2f2fff4c87b27201f4797f7c93",
  "version": 34,
  "memory_type": "entities"
}
-->