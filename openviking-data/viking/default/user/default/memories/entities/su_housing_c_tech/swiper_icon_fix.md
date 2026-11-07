# swiperComponent.vue 图标未定义修复
苏住房C 小程序 swiperComponent.vue 在微信小程序运行时报 playIcon/closeIcon 未在组件实例上定义。

## 问题根因
- swiperComponent.vue 使用 Options API，模板只能访问 data/computed/methods 等挂在组件实例上的属性
- playIcon 和 closeIcon 在 script 顶层用 resolveStaticUrl 定义但未挂到组件实例，模板 :src="playIcon" 报错

## 修复方式
- 将 playIcon、closeIcon 常量放入 data() 返回值，使模板可正常访问

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/components/commonNew/swiperComponent.vue
- 来源会话ID：eb88fc33-134b-41f2-b2d5-78dd948cbb83

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "swiper_icon_fix",
  "source_extraction_id": "fc4dc38dfc23468783e1317ace9d6fe2",
  "version": 1,
  "memory_type": "entities"
}
-->