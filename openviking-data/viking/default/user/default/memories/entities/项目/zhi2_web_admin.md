# zhi2-web-admin
房地产综合服务平台门户；`门户` 主仓库 git 子模块，路径 `D:\repository\门户\zhi2-web-admin`；父主仓库 `苏州市房地产监测V3`（`D:\repository\苏州市房地产监测V3\`），gitlink SHA `77a7e6dee` 与 HEAD 一致（2026-11-09）。

## 仓库与流程
- 父仓库错误台账 `docs/frontend/common-errors.md`：2026-11-09 新增 E-046，2026-11-13 新增 E-052
- 文档修改须在 worktree 副本，禁改主仓库；子模块构建 `version.json` 须回退保干净
- suzhufang-li 分支 checkout 于 `bug5897` worktree（主检出 detached HEAD），提交后同步主检出并刷父仓 gitlink（2026-11-10）
- 2026-11-13 删三注册页重复 uploadTip，子模块提交 `26282982b` 推 develop/v3.0.0，父仓 gitlink `26ae481b`
- 主仓库预存未跟踪产物及被改 `env/.env` 非 agent 须保持不动；主仓内子模块目录空且 `.git` 链接缺失（可 `git submodule update` 恢复）（2026-11-09）
- 子模块 `.git` 指针含中文路径致 git 误报 "modified content"；`.git` 文件实为正确 UTF-8

## 已知代码问题
- companyRecord.js 缺失 `LEASE_CHANGE_FLOW_BUS_CODE` 导出致 `AgencyBasicInfoDetail.vue` 编译中断；应由提交 0049c14e3 定为 `'zljgbgxq'`（租赁机构）待补导出（2026-11-11）
- `utils/request.js:215` 的 `returnRawResponse` 本支持透传原始响应

## 苏住房分支合入记录（develop/v2.6.2-suzhufang）
- 2026-11-12 bug6369 下载修复：根因 `src/api/index.js#saveBlobToFile` 未传 type 且 `DetailTemplate.downloadAttachmentFile` 未解析 `Content-Disposition`；子模块台账 `docs/flood/common-errors.md` 含 E22–E26（E26 本次），子模块提交 `54829a6bb` 父仓 `87a67f2`（外链Token登录修复同日合入）
- 2026-11-12 禅道Bug6540 破图修复（登录成功改 `window.location.replace('/')`、401 改 `'/#/login'`），子模块提交 `23baaa9` 父仓 `21a50ad`
- 2026-11-13 禅道Bug6568 双晒公示进度修复（openSunshineRegion 增 publishState='1'），子模块提交 `7f4869b71` 父仓 `32f345d6`
- 2026-11-13 禅道Bug6577 备案名/法定名耦合修复（detail.vue 三处 + bProjectDialog.vue 共 5 处，删 isLegalNameEdited 4 处引用），子模块提交 `4c61c633b`（rebase 4 上游提交），禅道6577 resolved/fixed/resolvedBy=tiany/退回lichandan
- 2026-11-13 采样300条小区数据，202条 recordName 与 legalName 均空（旧数据）；法定名必填致编辑被拦截，修复前后未恶化，刷数建议另开任务
- 2026-11-13 关键数据导航底部撑满样式：提交 `50d3a8961` `style(home-v2): 关键数据导航内容纵向撑满卡片底部`，仅改 KeyDataNav.vue 与 SectionCard.vue，lint 通过，已推分支
- 2026-11-13 禅道Bug6576 修复（首页企业总数卡误带 isLocalOrganization:'1' 致数量不符）：homeStatNav.js 去参并加 clearLocalOrgParam、index-v2.vue 支持删参防残留；子模块提交 `274e3272e` 推 develop/v2.6.2-suzhufang，ESLint 通过，构建 stall 未跑，E2E 用例写好未执行；禅道 resolved/fixed/resolvedBy=tiany/退回 zhunan action 92983
- 2026-11-13 首页企业总数卡跳转带 parentDeptId 区域过滤修复（bug#5819 同源）：company 总数项加 excludeRegionParam:true，跳转不带 parentDeptId，仅带 bizState:'2'（已备案）且无 isLocalOrganization；本地/非本地子项保持 isLocalOrganization:'1'/'0' 原样；子模块提交 `bef0c34eb`、父仓 gitlink `fbf3e12`（gitlink 冲突已解，远程 66e1ed397 为本地提交祖先）；测试服务器 unlimited.g.h5.admin.web.v2.suzhufang.shiqu.suzhou.test.zhi.com 需重建生效
- 2026-11-13 禅道Bug6582 关键数据导航样式修复（图标放大+两侧子数据行对齐）：KeyDataNav.vue 纯 scoped CSS（.kd__icon-wrap 32→40px、.kd__icon 18→24px、.kd__box min-height 30→40px）；子模块提交 `a6bc559fc` 推 develop/v2.6.2-suzhufang；eslint 通过、build exit 0、本地 nginx 8101 截图验证；禅道 resolved/fixed/resolvedBy=tiany/退回 zhunan
- 2026-11-13 本轮外 `src/views/benefit/pubAllotNotice/detail.vue` 既有改动未暂存未提交，有意保留

## Bug6559（详见 zentao_bug_6559）
- 2026-11-13 定位 detail.vue(pubAllotNotice) 前端缺陷：漏 noticeAmount + 金额无兜底；苏住房同名文件同缺失（task 2393 来源）；惠山门户 Dameng 表缺合同字段，后端或未完成 task 2393
- 本地 8119 端口 nginx 提供构建（commit `b7b998803`，分支正确），Playwright 驱动真实登录页验证；计划 `.plan/bug6559.md` 过审（PASS 72分）；2026-11-13 代码已修复并提交：惠山 `6fc3bb94d`（develop/v2.6.2-huishan）、苏住房 `4a32dc38f`（develop/v2.6.2-suzhufang），均仅改 detail.vue；禅道 6559 置 resolved/fixed（zt_action 92984），页面目视验证未完成，后端 Dameng 表缺合同列待补

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "zhi2_web_admin",
  "source_extraction_id": "3513dc29b8694910b7ed3c91b1e312ce",
  "version": 24,
  "memory_type": "entities"
}
-->