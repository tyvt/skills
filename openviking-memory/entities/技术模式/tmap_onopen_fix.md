# ZsTencentMap组件onOpen未等待地图加载修复
产品2.0中ZsTencentMap组件因onOpen未等待loadMap完成导致TMap未定义报错，已通过Promise复用修复。

## 问题原因
- ZsTencentMap在created()调用loadMap()加载腾讯地图SDK但未等待完成
- 弹窗打开时onOpen()在$nextTick直接执行init()，此时TMap尚未就绪，报ReferenceError: TMap is not defined

## 修复内容
- onOpen()中先等待loadMap()完成再初始化地图，使用loadMap().then(() => this.$nextTick(() => this.init()))
- created()中loadMap()保留用于提前预加载脚本
- onOpen复用同一个Promise，不会重复加载

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 验证：刷新页面后在企业注册Step1再次打开地图弹窗；若失败检查系统配置中腾讯地图Key（qq.map.key）
- 涉及文件：src/components/ZsTencentMap/index.vue、mapLoader.js、views/register/components/Step1CompanyInfo.vue
- 所属项目：产品2.0；来源会话：c02c94c0-4ea3-4558-a2c3-49dd740548de；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tmap_onopen_fix",
  "source_extraction_id": "3b7c32de1f0b440c8ceb0198c73dafbb",
  "version": 1,
  "memory_type": "entities"
}
-->