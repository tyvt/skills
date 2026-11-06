# 项目备案详情页宗地信息提取能力
苏州市房地产监测V3 中项目备案详情页「宗地信息」区块新增「提取」按钮，可从外部地块库拉取并写入宗地数据。

## 实现要点
- ParcelTable.vue 在「新增」与「删除」间增加「提取」按钮，草稿态（bizState=='0'）与新增同栏显示，权限同「新增」：building:relProjectParcel:add（变更场景 relProjectParcelChange:add）
- 新建 ParcelExtractDialog.vue，标题「选择地块编号」，关键字搜索字段 landSn（maxlength 256）
- 列表请求 POST /building/landPlot/pageLandPlotFromExternal，分页参数 current/size；表格列：勾选、序号、地块编号、地址、用途(purpose)、所属区域(regionName)
- 单选一行确认后 POST /building/landPlot/add，带入 externalId、landSn、address、singleUseArea、landTotalAmount、transferTime、registeredFlag:'1'

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：ParcelTable.vue、ParcelExtractDialog.vue
- 所属项目：苏州市房地产监测V3；来源会话：83974b85-1d76-494b-8d6a-2f709afa82c4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "parcel_extract",
  "source_extraction_id": "58c7810a01c34e9fa51dcebb81c6c582",
  "version": 1,
  "memory_type": "entities"
}
-->