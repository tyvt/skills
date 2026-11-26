# 汛后检查整改复盘五项提交必填校验修复
禅道 7008 要求 zhi2-web-admin 管理端 PC 的汛后检查详情在提交时校验整改与复盘五项必填，H5 已修、本仓 PC 端补齐。

## 问题与需求
- 禅道 7008「汛后检查 PC 端整改与复盘五项提交必填校验」：H5 已完成，本仓管理端 PC 需补齐
- 五项必填文案：请输入整改措施、请选择整改期限、请选择整改状态、请输入整改责任人、请上传现场照片
- 整改期限文案是「请选择整改期限」而非「请输入整改期限」
- 校验函数 validatePostExtraForm 挂在 ZsSubmit 组件 beforeSubmit 钩子；提交按钮由 operation-btn-group 按 submit-states=['0','3'] 在查看态渲染，编辑态无提交按钮

## 实现与涉及文件
- 分支 develop/v2.6.2-suzhufang；本任务仅改 detail.vue 与 common-errors.md
- dist 产物 detail-_S6-Jkx1.js（mtime 16:33）含新函数与五项文案，无需重建部署
- 子模块提交 e7b9eb0（build 后 version.json.gitHash=e7b9eb046），父仓提交 0f429f4（仅 gitlink），两端远端 SHA 均核对一致
- 其他脏文件（ScreenHeader.vue、particles.js、KeyDataNav.vue、_review.json、env/.env）非本任务，未触碰未提交

## 验证与状态
- 实机：待提交记录 XHJC20261126000002 查看态五项为空，点提交弹「请输入整改措施」且 URL 停留表单页（阻断成功）；先填检查事项第16项「泵房、排涝机电设备受潮及运行工况」为「无」保存草稿使通用校验通过
- 编辑态五项红色星号已渲染，修正旧记录「红星未显示」（实为 dist stale 现象）
- 方法级：逐项文案精确匹配、填全后校验返回空（通过）；用户已确认验证通过
- 证据图：C:/Users/Administrator/AppData/Local/Temp/bug7008-postcheck-toast-20261126-1705.png、bug7008-edit-rectify-20261126-1707.png
- 首轮回写与清理已由该链 hop2 完成：禅道 comment 内嵌双图（fileID 24640/24641）、$TEMP/bug7008-* 清零，status=resolved/fixed；次轮「保存」校验修复见「禅道 Bug 7008」。

<!-- MEMORY_FIELDS
{
  "category": "苏住房前端技术修复",
  "name": "postcheck_required_validation",
  "source_extraction_id": "1c6b17c29fe049d3b85161cbcedce44b",
  "version": 2,
  "memory_type": "entities"
}
-->