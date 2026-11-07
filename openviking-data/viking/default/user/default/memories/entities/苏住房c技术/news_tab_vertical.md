# 行业资讯页区域Tab竖排问题
苏住房C小程序行业资讯页的区域tab因flex子项被压缩且误留word-break导致中文逐字换行竖排。

## 现象与根因
- pages_main/news/index.vue 区域tab（市住建、张家港市、常熟市等）显示成每字一行竖排
- tab容器用display:flex，但li未加flex-shrink:0，tab数量多时每个li被压窄
- 配合word-break:keep-all，中文在窄列下逐字折行成竖排
- 纯CSS收缩叠加换行策略问题，非数据结构或组件问题

## 解决方案
- li加flex-shrink:0，保证标签保持内容宽度不被压缩
- 加white-space:nowrap保证文字横向一行
- 去掉多余的word-break:keep-all
- ul重置margin:0
- 保持容器可横向滑动（tab多时能左右滚）

## 判别口径
- 小程序「横向列表/标签变竖排」先看flex子项是否被压缩+是否误留word-break类属性
- 不要先怀疑字体或rpx换算

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 会话9bedfd55：用户报tabUI出问题并附竖排截图，定位修复
- 涉及文件：pages_main/news/index.vue、ListIndex.vue、tabBtn.vue
- 所属项目：苏住房C；来源会话ID：9bedfd55-6428-4419-b1a7-8396206c9412；代码基线：9832ba3

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "news_tab_vertical",
  "source_extraction_id": "0db4fd13cb304d78aa42f67a8963f614",
  "version": 1,
  "memory_type": "entities"
}
-->