# 苏州价格备案查询页按钮缺失修复
产品2.0 recordPriceMngSuzhou/index.vue 因 isApplyRoute 按菜单标题区分申请与查询，导致查询页隐藏按钮，已修复。

## 问题根因
- isApplyRoute 在 meta.title==='价格备案查询' 或 busCode==='jiagechaxun' 时返回 false
- 查询页不显示申请表模板下载、新增按钮

## 解决方案
- 显示条件改为 isRecordPriceMngSuzhou（routeKey==='recordpricemngsuzhou'），与参考项目「苏州市房地产监测」对齐
- 恢复顶部「业务状态」筛选项、行内「编辑」按钮（待提交时可用）
- 刷新查询页后应显示申请表模板下载、新增、删除三个按钮
- 若仍不显示需检查账号是否有 presale:recordPriceMng:add 权限

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：zhi2-web-admin/src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/index.vue、D:epository\苏州市房地产监测pps\chanpin\srciews\commercialHousingSales\priceFilingecordPriceMngSuzhou\index.vue
- 所属项目：产品2.0；来源会话：49b771f7-5363-446e-b96b-bb0ff3c61363；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "record_price_mng_buttons",
  "source_extraction_id": "82270027bd254d6e9e2b58eca3f38ac5",
  "version": 1,
  "memory_type": "entities"
}
-->