# 列表页空态判定挂success标志致接口异常时整页空白
苏住房C工作动态等列表页无数据时纯灰背景，既不渲染列表也不渲染空态，根因是空态标志仅在请求成功分支置位且用total===0判定不稳。

## 问题现象
- 工作动态列表页无数据时是纯灰背景，看不到列表也看不到空状态
- 用户要求加空数据默认图
- 页面「一片空白且无报错」

## 根因
- 页面用requested标志控制空态，该标志在请求成功分支才置true
- 接口失败或异常时requested永远false，列表分支与空态分支同时不成立
- 用total===0判定空态不稳，接口异常时total可能为undefined

## 解决方案
- 用try/finally保证请求结束无论成败都进空态判断，loaded类标志在finally置位
- 空态判定从total===0改为!list.length，list缺失也能落空态
- 空态统一用ZsEmpty组件指定默认图images/empty.png，无数据「暂无数据」、搜索无结果「未查询到相关数据」
- 空态区域水平居中、默认图约320rpx并垂直居中

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证：会话42343a4e用户诉求加空数据默认图；结论4点改动含try/finally与!list.length
- 涉及文件：src/pages/property/index.vue、src/pages_owner/company/service/index.vue
- 所属项目：苏住房C；来源会话ID：42343a4e-0f73-462e-bedb-6499ef092a49；代码基线：89637fb

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "empty_state_bug",
  "source_extraction_id": "0bc9c97c36d946eeb27dc957b0e08455",
  "version": 1,
  "memory_type": "entities"
}
-->