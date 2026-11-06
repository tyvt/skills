# 加梯申请页地图与输入框原生组件冲突修复
苏住房C小程序 `pages_owner_extra/elevator/addAlone.vue`（及 add.vue）修复地图原生组件与「申请说明」输入框互相遮挡导致无法输入的问题。

## 问题根因
- 微信小程序里 `map` 和 `textarea` 都是原生组件，层级最高，同页会互相遮挡，导致输入框点不到
- 「申请说明」放在 `uni-forms-item` 里并改纵向 flex 后，输入区域被压扁、触摸失效
- 之前仅加 `min-height` 样式未解决根因；原生组件层级最高，且 `v-show` 只隐藏视觉不销毁原生层，地图仍拦截下方点击

## 修复内容
- 将「申请说明」移出 `uni-forms`，单独用 `description-section` 区块，标签在上、输入框在下
- 恢复 `touchstart.capture` 和 `@click="hideMap"`，点击时销毁地图原生层
- 地图默认不显示（`showMap = false`），仅选中小区后显示，滚动或点表单任意处即隐藏
- 早期用 `v-if` 真正销毁原生 map（而非仅隐藏），触发时机：页面滚动超 120px、点击表单任意区域、触摸/聚焦申请说明输入框
- 提升输入区层级：`description` 区域增加 `z-index`
- 修正 `ZsTextarea`：`adjust-position="false"` → `:adjust-position="false"`（布尔绑定）
- 将地图移到表单上方（与 `add.vue` 一致），让 textarea 与 map 在页面上拉开距离，避免原生层遮挡
- 接入已有的 `inputHidden` 逻辑：textarea 聚焦时用 `v-show="!inputHidden"` 隐藏地图，输入时键盘不会被地图干扰
- 为字数统计 `.word-limit` 添加 `pointer-events: none`，避免绝对定位元素挡住输入区域

## 验证与归属
- 若仍不能输入，先点上方表单区域让地图消失，再点「申请说明」输入框；重新编译小程序后测试「申请说明」字段，应可正常点击并输入。
- 涉及文件：addAlone.vue、add.vue、ZsTextarea.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：be5add1d-7616-4020-9f82-4d25046636fb（基础）；12995d5b-1f0e-4084-87fa-bb16ee2b7b73（v-if方案）；e052a49f-6b89-46d9-8914-0630e3aa30fb（地图移上/inputHidden/word-limit）

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "elevator_map_fix",
  "source_extraction_id": "ded0ed38cdde4845819e8eaacaabeb1a",
  "version": 5,
  "memory_type": "entities"
}
-->