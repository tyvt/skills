# 加梯申请页地图遮挡textarea无法输入
苏住房C市民端加梯申请页因原生map层级最高且v-show不销毁原生层，底部textarea点不进字。

## 问题现象
- pages_owner_extra/elevator/addAlone顶部map、底部「申请说明」textarea，输入框点不进、打不出字
- 仅加min-height无效，需区分「完全点不进」与「能聚焦但打不出字」(后者多因ZsPicker弹层遮挡)

## 根因
- 微信小程序map与聚焦态textarea均为原生组件，层级最高浮在WebView之上
- v-show隐藏地图只隐藏视觉不销毁原生层，地图仍拦截下方点击致textarea无焦点
- ZsTextarea中`adjust-position="false"`字符串恒真，须`:adjust-position="false"`

## 解决方案
- 地图改v-if真正销毁原生map，不再v-show
- 多时机主动销毁：页面滚动超120px、点击表单任意区域、触摸或聚焦申请说明输入框
- 给description区域补z-index兜底；修正adjust-position布尔绑定
- 验收：滚到申请说明点击弹键盘，字数统计随输入更新(如5/120)

## 验证与归属
- 会话12995d5b用户二次反馈「addAlone申请说明还是无法输入」，改v-if销毁+多时机+修正绑定后恢复
- 涉及文件：src/pages_owner_extra/elevator/addAlone.vue、src/components/ZsTextarea/ZsTextarea.vue
- 所属项目：苏住房C；来源会话ID：12995d5b-1f0e-4084-87fa-bb16ee2b7b73；代码基线：8fc3cc5

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "native_map_textarea_bug",
  "source_extraction_id": "c7b854de2e864b02b107787c6c9eb2e8",
  "version": 1,
  "memory_type": "entities"
}
-->