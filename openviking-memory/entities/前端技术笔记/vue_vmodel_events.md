# Vue v-model 自动化填表需补发 input 事件
浏览器自动化中直接设置 input 的 DOM value 不会触发 Vue 的 v-model 更新，必须补发 input/change/blur 事件，表单数据才真正生效。

## 现象
- 登录 B端时三个 input 的 DOM value 已有值，但 v-model 未更新，点登录仍提示「请输入用户名」。
- 用 eval 在页面上下文补发 input 事件（含 change/blur）后 v-model 生效：验证码框被清空、不再提示「请输入用户名」，说明提交已发生。

## 做法
- 填完 input 后不要只赋值 .value，需 dispatchEvent 触发 input 事件（bubbles 为真），再点击提交按钮。
- 用输入框是否被清空、提示是否消失判断表单是否真正提交，而非仅看 DOM value。

## 验证与归属
- 发现于 2026-11-26，来源为禅道 2953 工作台新增入口及跳转 H5 任务的 B端登录验证跳次（hop6）。
- 补发事件后 v-model 生效但登录最终仍未跳转，验证码错误为嫌疑，根因待后续跳次继续排查。


<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "vue_vmodel_events",
  "source_extraction_id": "26a3b8b44a7f405cb6ac8678ff60c2da",
  "version": 1,
  "memory_type": "entities"
}
-->