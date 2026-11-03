# 苏住房GB端管理员与从业人员分层
在苏住房G项目(zhi2-web-admin)中，B端(terminalType==='B')在terminalType之上按isCompanyAdmin再分企业管理员与从业人员两层，区域弹窗仅属从业人员。
## 分层规则
- isBTerminalPractitioner = terminalType==='B' && !isCompanyAdmin，仅此层需选区域、三资模块按区域隔离、右上角显示切换区域
- isGTerminalLike = terminalType!=='B' || isCompanyAdmin，企业管理员与G端同菜单流程，不弹窗、右上角不显区域名
- 区域弹窗显示规则：0区域不弹、1区域静默选中不弹、多个才弹
## 排查与修复
- 遇「B端不该弹却弹」先打印terminalType/isCompanyAdmin/isBTerminalPractitioner三值，多数因后端getInfo未回isCompanyAdmin:true致降级从业人员
- isCompanyAdmin缺失必须当非管理员处理，否则造成相反越权展示
- 历史7-13用ENABLE_B_TERMINAL_PROJECT_DIALOG_ON_LOGIN=false临时全关，7-15按区域数量恢复
## 验证与归属
- 验证：会话cbfb89e8，用户确认B端企业管理员不应显区域；代码在utils/terminalUser.js的isBTerminalPractitioner/isGTerminalLike，弹窗BProjectDialog仅对从业人员渲染
- 提交：bf2512af8(7-13全关)→b9412a507(7-15恢复)
- 涉及文件：src/utils/terminalUser.js、src/layout/index.vue、src/views/home/bProjectDialog.vue；所属项目：苏住房G；来源会话：cbfb89e8-705e-429a-96b7-fa329df51e3e；代码基线：ac184e6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhufang_b_layer",
  "source_extraction_id": "6826e403948f4fa8a548e51c974c8ca3",
  "version": 1,
  "memory_type": "entities"
}
-->