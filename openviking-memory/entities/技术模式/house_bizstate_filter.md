# 父子两级数据弹窗过滤层级
苏住房G项目中，benefit/housePart 新增资产部位时，「选择资产」弹窗带出未备案主单数据，需显式传主单维度过滤参数。
## 问题现象
- 经营用房主单仍「审核中（未备案）」的房源在弹窗中可选
- 弹窗默认 bizState:2 只作用在房屋明细层，拦不住主单未备案但明细正常的数据
## 根因
- 接口只传 forPart:'1' 做形态区分，未对主单备案态过滤；父单状态须用独立参数 houseBizState
## 解决方案
- 请求显式补主单维度 houseBizState:'2'（B端附 projectId）
- 列表侧未备案行置不可选，确定时二次拦截防脏数据/旧缓存
- 前端已传参仍返回未备案则转后端（forPart 查询未支持该过滤）
## 验证与归属
- 验证证据：会话 ae403e03 用户反馈弹窗带出未备案经营用房，结论补 houseBizState 及二次拦截
- 涉及文件：benefit/housePart/index.vue、detail.vue、pubHouse/index.vue、assetLeaseApply/components/houseTable.vue
- 所属项目：苏住房G；来源会话：ae403e03-b7dd-4d19-be74-3b70c0306a26；代码基线：9acfb2a

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "house_bizstate_filter",
  "source_extraction_id": "85080ea7fd7b49f2a6f0d4ca4a7361e9",
  "version": 1,
  "memory_type": "entities"
}
-->