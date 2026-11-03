# 分包页面图标背景图不显示bug
云守护首页梯形背景图与上传「+」号在分包页空白，根因为ZsImage未补subpackage属性致静态资源404。

## 问题根因
- 小程序分包内图片必须让ZsImage知道所在分包，否则按主包路径拼URL直接404，读屏为空白或纯色。
- 分包内新引用svg需复制到该分包自身static目录，不能引用主包或别的分包文件。

## 解决方案
- 给ZsImage补subpackage="pages_guard"之类分包名，并固定高度避免无内在高度塌成0。
- 分包内svg复制到pages_guard/static/svg/。
- 头像改读userStore.avatar并配加载失败回退。
- 伪元素画图标父元素用inline-flex+align-items/justify-content居中，避免真机偏位。
- ZsImage内部节点尺寸受组件样式控制，外层改宽高需写到深度选择器:deep里。

## 验证与归属
- 验证：会话5d912c3c【掌服务-小区管理-云守护】UI调整，结论第3、4条补充分包路径与复制svg修复。
- 涉及文件：zhi2-mobile-shimin/src/pages_guard/index/index.vue、guardApply/components/step1.vue、components/ZsImage/ZsImage.vue。
- 所属项目：苏住房C；代码基线：8fc3cc5；来源会话ID：5d912c3c-3130-4cf8-9e0a-0d48f904b5f4。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "subpackage_zsimage_bug",
  "source_extraction_id": "2a3c186a43ce41b1b1060f5995a31a14",
  "version": 1,
  "memory_type": "entities"
}
-->