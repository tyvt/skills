# uni-forms 必填星号触发规则
uni-app 的 uni-forms-item 只有自身 required 属性才渲染红色 *，rules 里的 required 只驱动校验不显标记。

## 现象
- 人工添加房屋页 register.vue 一批业务必填项缺失红色 * 标识
- 图片上传区块（产证/合同/身份证明图片）无 uni-forms-item 可挂 required

## 根因
- uni-forms-item 的红色 * 由组件 required 属性控制，与 rules 的 required 分离
- 与 Web 端 Element 表单项习惯不同，易只配 rules 而漏 required
- 原「所属社区」name 写成 Name，与 rules、取值键不一致导致不参与校验

## 解决方案
- 给所属区域/街道/社区/小区/楼幢/室号补 required 属性
- 修正 name="Name" 为 name="community" 并补对应规则
- 图片上传区块标题加项目既有 required 样式类显示星号
- 单元、补充证件信息属非必填保持不标

## 验证与归属
- 验收：会话 63944abd 逐项对齐截图星号，确认带星号字段空值被拦截
- 涉及文件：zhi2-mobile-shimin/src/pages_owner/house/owner/register.vue、styles/form2.scss
- 所属项目：苏住房C；来源会话：63944abd-5398-403d-9293-6bf00fd0e33d；代码基线：b7bf813

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "uni_forms_required_mark",
  "source_extraction_id": "bfcdbef44d864551a289c9427a08b7e8",
  "version": 1,
  "memory_type": "entities"
}
-->