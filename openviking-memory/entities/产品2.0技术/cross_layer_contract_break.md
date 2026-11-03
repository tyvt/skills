# 跨层传递业务标志/列注册契约断链静默失效
多个「按钮不显示/样式不对」类问题的根因都是跨 2 层以上传递的标志或注册契约断链，断链时全部静默退化且无报错。

## 典型断链场景
- 公共查询复杂详情页入口按钮用 v-if="!hasData" 控制，有数据反而消失；入口型按钮应常显，数据存在性只控空态文案
- 列表跳转路由 query 带 ifHistory=1（历史合同维护免审批），中间层详情页未透传给提交组件，子组件用默认 0 走错流程且无报错
- zs-table 的 flexColumnCount 弹性列机制漏调 registerFlexColumn，flexColumnCount 恒 0，fit 恒 false，列按极小 min-width 显示且与 fixed 列间大片空白

## 解决方案
- 入口按钮移除 v-if="!hasData"，空态文案单独处理
- getForm() 建立「路由参数 > 表单数据 > prop」取值优先级，确保编辑后二次提交不丢标志
- zs-table 列在 created 调 registerFlexColumn、beforeDestroy 注销，flexColumnCount 由 0 变非 0 触发 doLayout() 重算

## 共性教训
- 跨 2 层以上传递的标志/注册契约，断链时全部静默退化，排查沿「路由→页面→组件→提交报文/渲染计数」逐层核对值是否还活着

## 验证与归属
- 来源会话 35553223/d952db17/f54cd7c5：移除 v-if、补 ifHistory 透传、补 registerFlexColumn
- 涉及文件：publicQuery/complex/detail.vue、property/propertyContractTemporary/detail.vue、zs-table.vue、zs-table-column.vue
- 所属项目：产品2.0；代码基线：42b6033 等

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "cross_layer_contract_break",
  "source_extraction_id": "d6fff46e82c345f0a1fd71b1f6da4fd9",
  "version": 1,
  "memory_type": "entities"
}
-->