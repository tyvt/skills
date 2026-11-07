# 输入框 append 区按钮点击无反应双层根因
产品2.0 详情页「付款单位」旁「手工输入」切换按钮点击无反应，需点其他输入框触发重渲染才生效，根因是状态未声明 + append 区 @focus 抢点击。

## 问题现象
- 详情页「付款单位」旁的「手工输入」切换按钮点击无反应
- 要点其他输入框触发重渲染后才生效，表现为「点了没反应/延迟生效」

## 根因
- 切换标志 showManualInput 只在方法里直接赋值、未在 data() 声明，Vue2 对未声明属性不做响应式代理，改了不触发视图更新
- 按钮放在 zs-input 的 append 区域，点击先触发输入框 @focus，@focus 里打开单位选择弹窗，把手工输入切换掩盖掉

## 解决方案
- 一切参与模板渲染的状态必须先在 data() 声明（Vue2 直接赋值不响应是此类高频根因）
- append 区按钮加 `@mousedown.prevent` 阻止默认聚焦行为，让输入框不抢焦点，点击立即执行切换逻辑
- mousedown.prevent 套路适用于所有「输入框 @focus 打开选择弹窗 + 旁边放可点元素」的组合

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证证据：会话 7e50b554，showManualInput 未在 data 声明导致不响应；append 区点击先触发 @focus 打开弹窗掩盖切换，加 @mousedown.prevent 后立即生效
- 涉及文件：zhi2-web-admin/src/views/benefit/pubRevenueContract/detail.vue
- 所属项目：产品2.0；来源会话ID：7e50b554-a8ad-43a6-b845-69894b24519f；代码基线：57109f9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "append_manual_input_focus",
  "source_extraction_id": "643fcefaa41f48a5a04312521a319012",
  "version": 1,
  "memory_type": "entities"
}
-->