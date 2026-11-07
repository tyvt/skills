# 公告列表映射丢字段致getDictLabel占位
NoticeList等子组件用getDictLabel展示类型标签时因父页map漏传msgType而始终显示占位符`-`。

## 问题现象
- NoticeList用getDictLabel(dict, item.msgType)展示类型标签，界面始终为`-`
- 同业务另一页用`...el`展开保留字段则正常，属映射层丢字段而非字典未加载

## 根因
- 父页把接口rows转列表项时手写对象字面量漏传msgType
- getDictLabel在val为空时返回''，模板`|| '-'`一直落占位

## 修复方案
- 列表映射显式带上字典展示依赖的原始码值字段（如msgType: el.msgType）
- 或统一用展开保留未知字段再覆盖展示用别名
- 改完刷新列表验证标签文案与配色；若仍裁切再查固定宽度样式（如72rpx）

## 验证与归属
- 验证证据：extracted source=cursor project=无锡市区小程序嵌入H5
- 来源会话：636ac7f6-e11f-4469-91e7-916792d8743b
- 代码基线：3c384c1
- 涉及文件：pages/announcement/index.vue、pages/announcement/components/NoticeList.vue
- 所属项目：无锡市区小程序嵌入H5

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "notice_list_msgtype_drop",
  "source_extraction_id": "99c310e4881245c0b2a8af204733867b",
  "version": 1,
  "memory_type": "entities"
}
-->