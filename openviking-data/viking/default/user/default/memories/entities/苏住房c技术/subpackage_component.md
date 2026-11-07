# 微信小程序分包组件跨包引用限制
苏住房C小程序分包页面引用另一分包组件会构建失败，需抽到主包src/components/<业务域>/并改引用路径。

## 问题背景
- 编译/运行报Component is not found in path "pages_main/news/components/ListIndex" (using by "pages_my/onlineService/index")
- 根因是微信小程序不允许一个分包页面直接引用另一分包组件，componentPlaceholder仅异步补救治不了跨包路径非法
- 文章/政策列表组件被多包共用，遗漏则多处报错

## 解决方案
- 将组件下沉到主包公共目录src/components/<业务域>/（如article/ListIndex.vue、ListDetail.vue）
- 改掉所有消费方import路径，删除分包内原文件避免两份漂移
- 后续同类错误同样按移到主包src/components/处理，不给每个包各复制一份

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：会话903d152b用户贴报错，结论抽ListIndex/ListDetail到src/components/article/并更新6个引用文件；验证证据：src=苏住房C/057.md
- 涉及文件：src/components/article/ListIndex.vue、ListDetail.vue、pages_my/onlineService/index.vue、pages_main/news/index.vue等
- 所属项目：苏住房C；来源会话：903d152b-dae2-46f3-94af-775912aee86f；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "subpackage_component",
  "source_extraction_id": "6d2d014529be465fbbb01ab3f8d573a9",
  "version": 2,
  "memory_type": "entities"
}
-->