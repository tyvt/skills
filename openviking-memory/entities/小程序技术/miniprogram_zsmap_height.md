# ZsMap 标签样式不生效致地图高度塌陷
苏住房C 新房详情页「项目周边」地图不显示，根因是 mergeVirtualHostAttributes:false 让标签 height 不透传，且隐藏态初始化，地图区域塌缩成 0 高。

## 问题现象
- 新房详情页「项目周边」地图不显示，控制台无报错，页面无任何地图区域
- 整页用 v-show="showPage" 控制，地图在隐藏态初始化也容易不渲染

## 根因
- manifest.json 中 mergeVirtualHostAttributes:false，写在自定义组件标签的 `<ZsMap style="height:200px">` 不透传到内部真实 `<map>` 节点
- ZsMap 内部只有 height:100%，父级无确定高度，地图区域塌缩成 0 高
- 与泰兴端 virtualHost 关闭表现同源

## 解决方案
- ZsMap 新增 height prop，组件内 inheritAttrs:false 并把高度直接绑到内部 `<map>`
- 页面用 map-container 固定 200px 高度，在「有经纬度且页面已显示」后 v-if 挂载
- markers 赋值前把经纬度统一 Number 转换，脏字符串会让标记静默丢失
- 通用结论：包装原生能力（map/canvas/video）的自定义组件，尺寸与属性都要用 prop + inheritAttrs:false 显式落到原生节点

## 验证与归属
- 验证：会话 f0892537（基线 4630e8e）「地图没显示」，改 height prop + inheritAttrs:false + v-if 挂载 + 经纬度转 Number 修复
- 涉及文件：src/components/ZsMap/ZsMap.vue、pages_transaction/newHouse/detail.vue、pages_main/houseMap/houseMap.vue
- 所属项目：苏住房C；来源会话ID：f0892537-a924-473d-9d3b-16bf6d6ea239；代码基线：4630e8e

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "miniprogram_zsmap_height",
  "source_extraction_id": "5b23890cee2f479791fcd3096d3399ab",
  "version": 1,
  "memory_type": "entities"
}
-->