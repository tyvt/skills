# zs-select-dialog 默认强制 bizState 与回填机制
注册类免过滤接口必须显式 :noBizState="true"，且弹窗必须绑 @setData 回填。

## 问题背景
- 注册表单选择总公司用 zs-select-dialog，曾因打开弹窗点击写在 isFormDisabled 三元里调用不存在方法 gotoCompanyDetail 报错打不开，且输入框 pointer-events:none 吞点击。
- 勾选后点「确定」无反应，因确定按钮只 $emit('setData')，宿主不监听就无回填。
- 组件默认给列表请求带 bizState:2 过滤，注册场景 listNoScopeWithCode 不需要该条件，会被错误过滤成空列表。

## 解决方案
- 打开弹窗收敛成独立 openCompanySelect() 方法，触发区加 cursor:pointer 并去掉 pointer-events:none。
- 弹窗必须绑 @setData 回填、关闭用 :noBizState="true" 剔除默认 bizState 条件。
- 排查顺序：「确定没反应」先查漏绑 @setData；「有数据但查不到目标」先查默认 bizState:2 是否适配。

## 验证与归属
- 验证：accountInfo.vue 增加 @setData="setCompany" 与 :noBizState="true" 后确定回填与列表均正常。
- 涉及文件：zhi2-web-admin/src/views/register/components/accountInfo.vue、zhi2-web-admin/src/components/zs-select-dialog/zs-select-dialog.vue。
- 所属项目：产品2.0；来源会话：3580de6d-3e0c-4db5-820d-6cf7683879f4；代码基线：b78461b。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zs_select_dialog",
  "source_extraction_id": "8ee6202f370b45028bf84c31e7c8eccb",
  "version": 1,
  "memory_type": "entities"
}
-->