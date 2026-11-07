# 地图与文本框原生组件互相遮挡致输入失效
苏住房C业主端电梯加装页因 map 与 textarea 原生组件同屏遮挡且 uni-forms 纵向压扁，申请说明输入框点不到。

## 问题现象
- pages_owner_extra/elevator/addAlone.vue「申请说明」多行输入框既输不进字
- 改成上下排列(标签在上、输入框在下)后反而完全不能输入，用户两轮反馈「还是不能输入」

## 根因
- 微信小程序 map 和 textarea 都是原生组件，脱离 WebView 渲染层，同屏谁后创建谁盖住谁，地图层叠输入框上方吃掉点击
- 字段塞进 uni-forms-item 并改纵向 flex 后高度链未撑开，被压扁到触摸热区之外

## 解决方案
- 「申请说明」移出 uni-forms，单独用 description-section 区块承载(标签在上、输入框在下)
- 恢复 touchstart.capture 与 @click="hideMap"，点页面任意处即销毁地图原生层
- 地图默认不显示(showMap=false)，仅选中小区后才创建，避免常驻
- 任意滚动也隐藏地图防原生层残留；复现时可先点上方表单区让地图消失再点输入框判定遮挡

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证会话 be5add1d：用户两轮反馈从标签换行→上下不能输入→还是不能输入，定位原生遮挡+flex压扁，改独立区块+showMap默认false+touchstart.capture
- 涉及文件：src/pages_owner_extra/elevator/addAlone.vue、add.vue、src/styles/form2.scss、src/components/ZsTextarea/ZsTextarea.vue
- 所属项目：苏住房C；来源会话ID：be5add1d-7616-4020-9f82-4d25046636fb；代码基线：8fc3cc5

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "map_textarea_occlude",
  "source_extraction_id": "c44346873fb44f028707ec585c087aa1",
  "version": 1,
  "memory_type": "entities"
}
-->