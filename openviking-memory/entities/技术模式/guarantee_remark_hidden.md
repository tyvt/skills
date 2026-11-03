# 房屋质量保证金详情备注查看态整行不显示
房屋质量保证金管理详情页维护备注保存后，查看态整行不显示，由 contentInfo 的 visible 短路与 detailCallback 只取 summary 两处根因叠加导致。

## 问题现象
- 维护备注并保存后，查看态看不到备注，且无任何报错
- 只修 visible 或只修 detailCallback 任一处都不生效

## 根因
- contentInfo 该字段配了 visible: !!this.form.remark，备注为空时整行不渲染，回填未拿到 remark 则整行消失
- detailCallback 只解构 response.data.summary 赋给 form，而接口把 remark 放在 data 根节点，导致 remark 被丢掉

## 解决方案
- 查看态不用 visible 做「有值才显示」，改为始终渲染，空值交给 DetailTemplate 显示（与结算账户等模块一致）
- detailCallback 合并 summary 与根级字段再赋给 form，不要只取一层子对象
- 若保存侧漏字段，补显式 getForm() 把该字段写进提交体

## 排查与归属
- 同类「查看态某字段没了」固定按三层顺序查：visible 条件 → detailCallback 取值层级 → getForm 字段白名单
- 已知 #919 讲 contentInfo 的 add() 过滤空值、#941 讲取了没写回 form，均未覆盖本条两个具体根因
- 涉及文件：guaranteeDepositAccount/detail.vue、detailMixins.js、detail-template.vue
- 所属项目：产品2.0；来源会话：3faac03b-5c75-454c-a0d1-79ae56a3ac95；基线：a5e7e78

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "guarantee_remark_hidden",
  "source_extraction_id": "6285554fd6dd46f69040df906ff0d5fd",
  "version": 1,
  "memory_type": "entities"
}
-->