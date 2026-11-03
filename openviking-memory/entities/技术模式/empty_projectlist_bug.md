# 未授权区域登录后项目选择弹窗无法关闭
layout/index.vue 在登录后依据 operableProjectList / bProjectData 自动弹出物业管理区域选择框，列表为空时仍置 projectDialogVisible=true 导致整站卡死。

## 问题根因
- 登录后 layout 根据 operableProjectList / bProjectData 自动弹出物管区域选择弹窗
- projectList 为空时仍强制 projectDialogVisible=true，弹窗无有效选项且可能无法关闭，整站被卡住
- 手动「切换项目」openProjectDialog 在 bProjectData 为空时未做防护直接打开弹窗

## 解决方案
- syncProjectDialogVisibility 中 projectList 为空则强制 projectDialogVisible=false 并 return
- openProjectDialog 在 bProjectData 为空时走 $message.warning 提示授权问题且不打开弹窗
- 修复仅改动 layout/index.vue

## 验证与归属
- 验证：用户反馈未关联区域登录弹框关不了；修复仅改 layout/index
- 涉及文件：zhi2-web-admin/src/layout/index.vue
- 所属项目：园区公共收益；来源会话：7c3abcbc-5c9f-492d-b81b-9b709f37b81c；代码基线：0abcb96

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "empty_projectlist_bug",
  "source_extraction_id": "54194ab371814c2fb7ecde84d359cc63",
  "version": 1,
  "memory_type": "entities"
}
-->