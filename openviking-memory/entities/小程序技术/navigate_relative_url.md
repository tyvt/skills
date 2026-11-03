# 小程序navigateTo相对路径跳转失败修复
苏住房C小程序通过openPage统一解析相对路径为绝对路径，解决navigateTo找不到页面的问题。
## 问题场景
- 投票表决「参与决策」、业委会选举「参与选举」点击报navigateTo:fail page "detail?id=..." is not found，按钮点不动
- 页面直接写goto(`detail?id=${data.id}`)相对路径，微信小程序navigateTo只认/开头完整路由
- H5端对相对路径有容忍度，问题仅在小程序真机/开发者工具暴露
## 解决方案
- 在utils/index.js的openPage增加resolveRelativePageUrl：跳转前按当前页面路由把相对路径拼成绝对路径
- 多级相对如common/DecisionResult?id=...同样拼接；已是/pages_...或http://等协议开头原样返回
- 一处收口覆盖全项目goto/redirectTo调用，不必逐页改pages_vote下倡议/投票/维修资金等模块
## 验证与归属
- 验证：会话010bdda8报错navigateTo:fail page，源码两处goto相对路径；结论在openPage内新增解析覆盖多模块
- 涉及文件：src/utils/index.js、src/pages_vote/decision/index.vue、src/pages.json
- 所属项目：苏住房C；来源会话ID：010bdda8-aa5a-4e50-bc2e-6187b98c3ce5；代码基线：b7bf813

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "navigate_relative_url",
  "source_extraction_id": "3abfd634e56b408b8fe5fc6111feb013",
  "version": 1,
  "memory_type": "entities"
}
-->