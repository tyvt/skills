# 禅道Bug 6309 踏勘表下载模板置灰
房产管理系统 zhi2-web-admin 中预售许可踏勘初审弹窗的「踏勘表」要件「下载模板」按钮置灰不可点击，根因为后端附件配置缺失模板文件，非前端代码缺陷。

## 现象与定位
- 截图对应「预售许可踏勘 → 初审踏勘审批」弹窗内「踏勘表」要件，其「下载模板」按钮置灰
- 按钮禁用条件：`:disabled="!templatePaths.length"`（AppendixRequirementCard.vue），templatePaths 来自附件配置 fileTemplate
- 查后端附件配置表 T_APPENDIX_CONFIG：busCode=ysxkcs（踏勘表，APPENDIX_CONFIG_ID=2098680540812066818）的 FILE_TEMPLATE 为 NULL
- 对照同逻辑下 busCode=ysxksq（预售许可申请表）等已配模板项可正常下载

## 根因
- 附件配置从未上传过模板文件，按钮按设计置灰
- 置灰行为源自提交 686b8dca5 fix(annex): 下载模板按钮改为始终可见，无模板时置灰并提示，属预期表现
- 前端映射逻辑（mapAppendixPackageToFileList / getAppendixFileTemplatePaths）正确保留 fileTemplate，非代码 bug

## 修复方案
- 需在【附件分类配置(tool/fjflpz)】中为 busCode=ysxkcs 的「踏勘表」上传官方模板文件
- 前端无需改动即可恢复下载功能
- 现售备案踏勘（xsbacs）同样 FILE_TEMPLATE=NULL，若需可一并配置

## 禅道回写与处理
- 用户要求将 bug 重新指派给测试人员李婵丹（lichandan，原报告人）并附原因备注
- DBX 事务已执行：assignedTo 由 tiany 改为 lichandan，状态保持 active
- 新增操作记录 id=88549（commented），写入完整根因、证据与处理建议
- 提交后复核一致，会话结束前已清理临时截图

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6309",
  "source_extraction_id": "890dc9b916ab4691b8c1ef0d1bc82297",
  "version": 1,
  "memory_type": "entities"
}
-->