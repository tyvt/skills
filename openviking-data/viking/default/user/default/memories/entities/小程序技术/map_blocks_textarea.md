# 小程序原生map组件遮挡textarea导致无法输入
微信小程序原生 map 组件层级最高，紧贴 textarea 时会吞掉点击/聚焦事件导致无法输入，需移开地图或聚焦时隐藏。

## 问题现象
- pages_owner_extra/elevator/addAlone.vue 的「申请说明」textarea 点不进、无法输入
- 仅给 textarea 加 min-height 完全没用

## 根因
- 微信小程序原生 map 组件层级高于所有 WebView 节点，地图紧贴 textarea 下方，点击/聚焦事件被地图层拦截
- 属原生层遮挡而非样式尺寸问题（加高、调 padding 修不掉）

## 解决方案
- 把地图移到表单上方，与 add.vue 既有实现对齐，让 textarea 与地图拉开距离
- 复用项目已有 inputHidden 状态，textarea 聚焦时 v-show="!inputHidden" 把地图整块隐藏
- 给绝对定位字数统计 .word-limit 加 pointer-events:none，防其盖住输入区
- 小程序里输入/点击「点了没反应」而样式正常，先看附近有无 map/video/canvas 原生组件，再考虑层级隐藏，勿反复调尺寸

## 验证与归属
- 验证会话 e052a49f（基线 8fc3cc5）：移地图到表单上方 + inputHidden 隐藏 + word-limit pointer-events:none 后修复
- 涉及文件：pages_owner_extra/elevator/addAlone.vue、add.vue、components/ZsMap/ZsMap.vue、components/ZsTextarea/ZsTextarea.vue、styles/form2.scss
- 所属项目：苏住房C；代码基线：8fc3cc5

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "map_blocks_textarea",
  "source_extraction_id": "ceeab5991c4441bf91972f5b0aa75c6e",
  "version": 1,
  "memory_type": "entities"
}
-->