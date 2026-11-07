# 添加房屋三条并行路径
惠山小程序「添加房屋」存在三条并行路径，当前主路径为灵犀/不动产授权第三方绑房。

## 路径状态
- 路径A 灵犀/不动产授权：主路径，`AddBtn`→`goAdd()`→第三方H5→回跳`authCode`→`selectMyHouseByLingXi`
- 路径B 手动下拉绑定：遗留/断链，`add.vue`存在但全库无`navigateTo`到该页
- 路径C 房屋核查申请：功能存在、入口断链，`application.vue`存在但无有效导航入口

## 核心文件
- `d:/repository/惠山小程序/src/pages_myhouse/myhouse/index.vue`：「我的房屋」列表页含添加按钮
- `d:/repository/惠山小程序/src/pages_myhouse/myhouse/components/AddBtn.vue`：添加房屋入口组件实际调用

## 验证与归属
- 验证证据：extracted source=cursor project=惠山小程序
- 涉及文件：`add.vue`、`application.vue`、`index.vue`、`AddBtn.vue`
- 来源会话：0537cd5d-ca90-4553-a701-605e48fd0be8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "惠山小程序技术模式",
  "name": "add_house_paths",
  "source_extraction_id": "7d5ef1522fbc472fbc5710e10832618d",
  "version": 1,
  "memory_type": "entities"
}
-->