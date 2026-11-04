# uni-app 日历吸顶双类同改
业主端 H5 报事报修列表日期筛选面板吸顶后残留灰边，需同时修改定位与外观两处 uni-ui 类。
## 现象
- 日历面板吸顶/贴顶后顶部仍残留灰色圆角与阴影灰边，看似未吸住。
- 只改定位处 wrapper 贴顶但内容盒自带圆角+投影仍在，视觉多一道灰边。
## 根因
- uni-ui 日历入场样式分两处：`.uni-calendar--fixed` 负责定位（position/transform）。
- `.uni-calendar__content-mobile` 负责外观（`border-top-radius:10px` + `box-shadow:0 0 5px 3px rgba(0,0,0,.1)`）。
- 这些是 uni-ui 库内置类，业务 CSS 变量改不到，只改一处不解决。
## 解决方案
- 业务侧用 `:deep()` 同时覆盖两处：`:deep(.uni-calendar--fixed){...}` 处理定位，`:deep(.uni-calendar__content-mobile){ border-top-radius:0; box-shadow:none; }` 处理外观。
- 改完必须在 H5 上肉眼复验（微信/支付宝 web-view CSS 表现与浏览器不同）。
- 验收标准写清「贴顶无灰边」，不要只报「已吸顶」。
## 验证与归属
- 验证证据：会话 104c83d6（基线 69cd251，禅道 bug 5916 入口）与会话 182a8cfd（基线 9e0fdde，修复提交 e92564c1）。
- 涉及文件：zhi2-mobile-shimin/src/components/ZsDatePicker/ZsDatePicker.vue、pages_owner/repair/index.vue、pages/components/FilterPopup.vue、node_modules/@dcloudio/uni-ui/lib/uni-datetime-picker/uni-datetime-picker.vue。
- 长期记忆库 popup-layer--mp-2.md 条目标题「x5916 · 日期面板吸顶后仍残留灰色圆角/留白：uni-calendar__content-mobile 的顶部圆角与投影」。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "uni_calendar_sticky",
  "source_extraction_id": "ca1c03debbd649dab1b71cd5d75db317",
  "version": 1,
  "memory_type": "entities"
}
-->