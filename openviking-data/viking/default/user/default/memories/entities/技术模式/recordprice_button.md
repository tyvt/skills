# 申请查询页按钮显隐按 routeKey 判定
产品2.0 的 recordPriceMngSuzhou 页面因按菜单标题文字分流导致查询页缺失按钮，需对齐参考仓库按路由 key 判定。

## 问题根因
- 产品2.0 用 isApplyRoute 按 meta.title === '价格备案查询' / busCode==='jiagechaxun' 区分申请页与查询页
- 查询页因此隐藏了「申请表模板下载」「新增」「编辑」按钮
- 按菜单标题文字判定脆弱且与参考项目（苏州市房地产监测）实现不一致

## 解决方案
- 页面身份/按钮显隐判定对照参考仓库实际实现（按路由 key 判定），不用按菜单标题字符串分流
- 参考项目判定为 routeKey === 'recordpricemngsuzhou'，申请和查询页都显示按钮
- 恢复按钮时同步恢复被隐藏的「业务状态」筛选项和行内「编辑」（待提交态可用）
- 提醒用户核对账号是否有对应权限码（如 presale:recordPriceMng:add）而非继续怀疑代码

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- isApplyRoute 在 meta.title==='价格备案查询' 时返回 false 隐藏按钮；改为 isRecordPriceMngSuzhou 判定并恢复筛选与编辑按钮
- 涉及文件：zhi2-web-admin/src/views/commercialHousingSales/priceFiling/recordPriceMngSuzhou/index.vue
- 所属项目：产品2.0；代码基线：62d5fb9；来源会话：49b771f7-5363-446e-b96b-bb0ff3c61363

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "recordprice_button",
  "source_extraction_id": "339530474fdc41989e139e610acb727b",
  "version": 1,
  "memory_type": "entities"
}
-->