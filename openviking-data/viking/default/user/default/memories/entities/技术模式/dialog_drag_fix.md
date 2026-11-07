# v-dialogDrag弹窗撑满修复
苏州市房地产监测V3 中 `v-dialogDrag` 指令导致弹窗被拉满全屏，已修复为居中且可选关闭拖拽。

## 根因
- `src/directives/dialog/drag.js` 挂载时给 `.el-dialog` 写 `position:absolute` 及 `inset:0`，弹窗撑满 wrapper（约1300×987）
- 与 `height:auto`、compact 类无关，是拖拽指令撑满盒子

## 修改
- 重写 `drag.js`：用 `top:15vh`+`left:50%`+`translateX(-50%)` 居中，拖拽用 `getBoundingClientRect` 计算
- `zs-select-dialog`/`zs-select-dialog-func` 增加 `:draggable="false"` 避免被指令改写尺寸

## 后续跟进（来源会话 bbc55614-1928-472e-9700-f59ccfc62415）
- 当前 select-dialog 已改为 flex 垂直居中，不再使用 `15vh`；原先「双重下移」问题主要落在仍带 `select-dialog` 且默认可拖拽的用法上。
- `zs-dialog.vue` 新增 `dialogDragEnabled`：select-dialog 时一律关闭 `v-dialogDrag`，避免与 `drag.js` 的 `absolute + top: 15vh` 和居中布局冲突（如 `RegulatoryAccountDialog` 等未写 `:draggable="false"` 的场景）。
- `select-dialog` 默认 `top: '0'`：未显式传 `top` 时写入 attrs，避免 Element 默认 `margin-top` 干扰居中。
- 新增 `--zs-dialog-select-wrapper-padding` 写在选择弹窗 wrapper / compact 上，统一上下留白与 `max-height` 计算。

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：drag.js、zs-select-dialog.vue、zs-select-dialog-func.vue、detail.vue 等
- 来源会话：003d6075-c1af-4232-b337-c044d45c5078

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_drag_fix",
  "source_extraction_id": "31186a8f7ee640d1ae7c16b5a1e5ae2a",
  "version": 2,
  "memory_type": "entities"
}
-->