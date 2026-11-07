# z-paging 弹窗内 fixed 定位导致按钮重叠
苏住房C 市民端弹窗内使用 z-paging 默认 fixed:true 会按全屏固定定位渲染，盖住底部操作按钮。

## 现象与根因
- 求购「附近小区」弹窗列表区域小且难滑，直接压在底部「取消」「保存」按钮上，视觉重叠点不到。
- 根因一：z-paging 默认 fixed:true 全屏固定，无视弹窗容器。
- 根因二：原实现把标题+列表+按钮全塞进同一 overflow-y:auto 容器，列表高度被按钮挤掉。

## 解决方案
- 弹窗内容改 flex 纵向三段：标题区 → 可滚动列表区 → 固定底部按钮区，兄弟节点分离。
- z-paging 传 :fixed="false" + :use-page-scroll="false"，按父容器高度渲染。
- 列表区给 min-height:500rpx 保底，弹窗整体 max-height:75vh 限高。
- 底部按钮区 flex-shrink:0 并补安全区适配。
- 排查提示：弹窗内列表位置乱飞/挡按钮，先查分页组件是否 fixed 全屏模式。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话 451f9781（基线 d43894b）「我的求购」附近小区弹窗重叠；修复为 flex 三段 + :fixed="false" + :use-page-scroll="false" + min-height:500rpx + max-height:75vh + 底部 flex-shrink:0。
- 涉及文件：src/pages_transaction/intention/popup.vue、src/pages_transaction/intention/add.vue
- 所属项目：苏住房C；来源会话ID：451f9781-7f9a-465f-90a9-7f258714b1cc；代码基线：d43894b。


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "zpaging_fixed_popup_overlap",
  "source_extraction_id": "c0fd305100de4799a4169c34e9bea617",
  "version": 1,
  "memory_type": "entities"
}
-->