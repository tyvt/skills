# 加梯申请页地图与输入框原生组件冲突修复
苏住房C小程序 `pages_owner_extra/elevator/addAlone.vue`（及 add.vue）修复地图原生组件与「申请说明」输入框互相遮挡导致无法输入的问题。

## 问题根因
- 微信小程序里 `map` 和 `textarea` 都是原生组件，层级最高，同页会互相遮挡，导致输入框点不到
- 「申请说明」放在 `uni-forms-item` 里并改纵向 flex 后，输入区域被压扁、触摸失效
- 之前仅加 `min-height` 样式未解决根因；原生组件层级最高，且 `v-show` 只隐藏视觉不销毁原生层，地图仍拦截下方点击
- 上次只加了 `min-height` 仍不够，说明样式隔离下原生层遮挡需结构性规避

## 修复内容（多次迭代）
- 将「申请说明」移出 `uni-forms`，单独用 `description-section` 区块，标签在上、输入框在下
- 恢复 `touchstart.capture` 和 `@click="hideMap"`，点击时销毁地图原生层
- 地图默认不显示（`showMap = false`），仅选中小区后显示，滚动或点表单任意处即隐藏
- 早期用 `v-if` 真正销毁原生 map（而非仅隐藏），触发时机：页面滚动超 120px、点击表单任意区域、触摸/聚焦申请说明输入框
- 提升输入区层级：`description` 区域增加 `z-index`
- 修正 `ZsTextarea`：`adjust-position="false"` → `:adjust-position="false"`（布尔绑定）
- 将地图移到表单上方（与 `add.vue` 一致），让 textarea 与 map 在页面上拉开距离，避免原生层遮挡
- 接入已有的 `inputHidden` 逻辑：textarea 聚焦时用 `v-show="!inputHidden"` 隐藏地图，输入时键盘不会被地图干扰
- 为字数统计 `.word-limit` 添加 `pointer-events: none`，避免绝对定位元素挡住输入区域

## 补充修复（会话85a3ba6b）
- 地图 marker 图片 location-red.png 路径错误：代码用 `@/static/icon/location-red.png` 引用，实际文件在 `pages_main/static/icon/` 下，微信解析为 `/static/icon/location-red.png` 导致 500；修复：改用 `resolveStaticUrl('icon/location-red.png', 'pages_main')`（与 houseMap.vue 同方式）
- 「申请说明」输入框高度塌陷另一原因：`form2.scss` 表单项默认横向 `flex` 布局，区域缺少高度；修复：在 `addAlone.vue` 显式引入 `ZsTextarea`，参考 `signInfo.vue` 调整 `.description` 样式（固定高度、`flex-direction: column`）。另在会话 d8d3c33d-5a07-488c-9663-dd7409ec4528 中补充：全局 `.uni-forms-item` 使用 `align-items: center`，多行输入区域约 200rpx 但容器未撑开，导致「地理位置」标题叠在输入框上拦截点击；修复为 `:deep(.description) { min-height: 300rpx !important; height: auto !important; align-items: flex-start !important; padding-bottom: 24rpx; }` 并为标签增加 `margin-bottom`。
- 补充涉及文件：houseMap.vue、signInfo.vue；来源会话ID：85a3ba6b-0da3-48e5-b7f4-7ebc9f354ad6

## 验证与归属
- 若仍不能输入，先点上方表单区域让地图消失，再点「申请说明」输入框；重新编译小程序后测试「申请说明」字段，应可正常点击并输入。若仍有问题，请告知是在微信开发者工具还是真机上测试。
- 涉及文件：addAlone.vue、add.vue、form2.scss、houseMap.vue、signInfo.vue、ZsTextarea.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：be5add1d-7616-4020-9f82-4d25046636fb（基础）；12995d5b-1f0e-4084-87fa-bb16ee2b7b73（v-if方案）；85a3ba6b-0da3-48e5-b7f4-7ebc9f354ad6（补充）；e052a49f-6b89-46d9-8914-0630e3aa30fb（地图移上/inputHidden/word-limit）；d8d3c33d-5a07-488c-9663-dd7409ec4528（description样式补充）

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "elevator_map_fix",
  "source_extraction_id": "68876c8622ce424a85240de90cbdd4c6",
  "version": 4,
  "memory_type": "entities"
}
-->