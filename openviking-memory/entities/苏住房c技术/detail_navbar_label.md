# 多入口共用详情页导航栏标题透传
多个列表入口共用同一详情页时，导航栏标题必须由列表将 label 透传至详情页，不能依赖页面硬编码默认值。

## 问题现象
- pages_main/publicNotice/detail 被物业服务计划/公共收益/维修资金/双晒内容等多个入口共用
- 从「物业服务计划」进入时导航栏仍显示默认「双晒内容」，用户要求按入口命名

## 根因
- 列表页 publicNotice.vue 已将 title 作为 noticeLabel 传给子组件 ListIndex
- ListIndex 在 router/uni 跳转详情时未继续携带 label，参数断在中间层，详情页回退默认标题

## 解决方案
- ListIndex 显式接收 noticeLabel 并作为 label 参数拼进详情跳转，保证参数链贯通
- detail.vue 导航标题改为有 label 即用原文，不再拼「内容」后缀，无 label 才回退默认
- 每新增共用详情页入口，核对 入口页→中间列表组件→详情页 query→uni.setNavigationBarTitle 链路

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 会话 3fa76366（基线 8fc3cc5）：用户要求从物业服务计划进入详情页就叫物业服务计划
- 涉及文件：src/pages_main/publicNotice/detail.vue、components/ListIndex.vue、publicNotice.vue
- 所属项目：苏住房C；来源会话ID：3fa76366-cf4a-4cdf-87de-dd2b1e81d2e9

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "detail_navbar_label",
  "source_extraction_id": "c383dd4637e24cfe83f7be5dd47bdfb2",
  "version": 1,
  "memory_type": "entities"
}
-->