# 禅道缺陷 6891：经纪机构从业人员变更详情 UI 不一致
区县账号查看从业人员变更详情时字段明显偏少、人员角色显示原始码值 professional，与机构账号查看的申请详情不一致。

## 基本信息
- 链接 http://zentao-biz.zhi.com/index.php?m=bug&f=view&bugID=6891 ；类型 codeerror，状态 active，指派 tiany，报告人 zhunan，无备注、无 zt_action 评论。
- 两张附件截图已下载至 D:\禅道附件\bug\6891\：24003 为机构账号（1103经济）「从业人员备案申请」，24004 为区县账号（测试吴中区）「从业人员变更」审核中详情。

## 现象与前端根因
- 截图1 字段完整：从业编号、出生日期、政治面貌、人员类型、资格证书、从业年限、所属机构、照片、要件上传齐备，人员角色显示中文「经纪服务人员」，对应 institution/agencyPersonnel → AgencyPersonnelDetail.vue + agencyPersonnelBasicInfoFields.js。
- 截图2 仅 9 项（姓名/性别/联系电话/证件类型/证件号码/人员角色/职务/学历/备注），人员角色为原始码 professional，要件上传显示「暂无附件」，字段与顺序匹配 company/staffManagement/components/detail.vue 的 contentInfo。
- 根因：同一 busCode jgcyrybg 在 todoRouteRegistry.js:141 指向通用 company/staffManagement/personnelChange/detail，而 companyChangeManage/index.vue:90 指向 institution/agencyPersonnel/detail，两处路由不一致造成同一人两条详情页 UI 不同。

## 任务进展与结论
- 2026-11-24 用户确认范围为定位+修复+禅道回写，用 9002 环境复现，目标为两页面主字段保持一致并保留变更增量逻辑；已在 9002 用区县账号「测试吴中区」登录成功，但该变更记录不在待办列表中，未能实机复现；客测环境地址不在本地 env 配置里。
- 前端修复代码（hop2）已在，但因详情接口取不到数据、页面渲染不出字段（0 字段），按交接规则不做空回写禅道、不改非根因前端。
- hop10 定论：详情 400 不是前端根因，也不是 NPE，而是后端权限拦截与详情接口路径问题（见后端缺陷卡 personnel_change_detail_400）。
- 链 chain-20261124-zentao6891-personnel-change-ui 在 hop=10 达到硬交接终止条件，未排下一跳；hop1 会话未改动代码、无后台任务遗留，hop1 交接文档 HANDOFF-CHAIN-zentao6891-personnel-change-ui-hop1-20261124-0917.md（第 4 节列 6 项未完成，schedule-a0de7f21-4e63-44c4-96f4-5f69db77286a 于 2026-11-24 09:20:02 Asia/Shanghai 触发），hop5 交接文档 HANDOFF-CHAIN-zentao6891-personnel-change-ui-hop5-20261124-1222.md（hop 5→6、maxHops 10，schedule-e4b1257f-4a6b-44ea-8921-25a04d0af84d 于 12:22:36 触发）。
- hop10 收尾：停诊断服务 PID 1904，清空 %TEMP%\zt6891*、build6891.state.json/.log，DBX 临时连接已关，无后台任务；java 14460/5544/20540 非本链服务未动。

## 待定项
- 若仍需前端验证门：需后端先开通 `company:personnelRecordChange:query` 权限并确认详情接口正确路径（/detail 还是 /{id}），或提供可用的区县账号凭据——属后端/环境范畴，非前端任务可解。
- 诊断 worktree D:\repository\estate-manage-v3 未删（破坏性操作，链路已终止，留待人工确认）。


<!-- MEMORY_FIELDS
{
  "category": "缺陷任务",
  "name": "zentao_bug_6891",
  "source_extraction_id": "43a46a9073294e41950e959acb582816",
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "version": 3,
  "memory_type": "entities"
}
-->