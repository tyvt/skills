# 禅道任务2388：专业化物业管理小区拆分住宅非住宅类
苏住房前端（zhi2-web-admin）禅道任务2388，关联需求故事1456，由 tiany 负责将专业化物业管理小区拆分为住宅与非住宅两类。

## 需求要点
- 首页关键数据导航：原「物业管理区域」拆分为「专业化物业管理住宅小区」「专业化物业管理非住宅」两部分，并分别做面积统计
- 住宅小区统计"已备案"：物业类型为"住宅、住宅/非住宅"两类，过滤"非物业服务小区"类6个菜单数据，统计包干制/酬金制/信托制合同收费方式各有几个
- 物业管理区域菜单：原"专业化物业管理小区"改名为"专业化物业管理区域"，下设住宅小区/非住宅两个菜单，审批流与导出功能同步变更

## 实现状态
- 实现提交 d68838e08「1456 【苏住房】专业化物业管理小区拆分住宅、非住宅类」已合入当前分支 develop/v2.6.2-suzhufang
- 涉及文件：home/index-v2.vue、KeyDataNav.vue、homeStatNav、keyDataMap、api/portal/home.js、complex list/detail、complexChange detail、complexManageType.js
- 前端代码已完成，依赖后端提供菜单11/12及对应统计接口

## 关联信息
- 关联需求故事：禅道 story 1456
- 相关工作树：bug5897（分支 develop/v2.6.2-suzhufang-li）有后续响应式提交 738a8fa42
- 任务状态为 wait；截至 2026-11-12 会话，前端实现已合入，用户仅要求需求分析与实现方案说明，未做额外代码改动

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-suzhufang-fe-zhi2-web-admin-h5-g-unlimited",
  "category": "禅道任务",
  "name": "task_2388_split",
  "source_extraction_id": "ef3752ac134544c5b7d8ce1da0dd3fbe",
  "version": 1,
  "memory_type": "entities"
}
-->