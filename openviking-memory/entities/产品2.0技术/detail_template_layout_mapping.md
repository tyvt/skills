# DetailTemplate查看态layout归一化映射
产品2.0 的 DetailTemplate 查看态 layout 值会做归一化映射（16→整行24、8→半宽12），与编辑态 el-col 原生 span 语义不同。

## 问题现象
- 查看态用 DetailTemplate 想让「发布范围」和「查阅人次」并排一行，配 layout 16+8 却各占一行/错行
- 与「DetailTemplate column prop 无效、只能逐项配 layout」是互补的更深一层问题

## 根因分析
- DetailTemplate 的 layout 不是原样透传的栅格 span：查看态把 16 映射为整行 24、8 映射为 12
- 编辑态的 el-col 是原生 span 直接生效（16+8 本身正确），两套语义不一致导致按编辑态直觉配查看态必错行

## 解决方案
- 查看态配置 layout 必须按「映射后的值合计 24」推算：两个半宽字段各配 12（或按映射规则换算），而非照抄编辑态 16+8
- 改这类布局前先确认当前是编辑态 el-col 链路还是查看态 layout 映射链路，两态分别核算

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 会话 49aa0c4f 结论：查看模式 layout 中 16 映射为整行 24，将发布范围 layout 从 16 改 12、与查阅人次 8（映射12）合计 24 后并排
- 涉及文件：src/views/property/dailyService/detail.vue、src/components/DetailTemplate；所属项目：产品2.0；来源会话：49aa0c4f-506a-4246-af2e-a77dde771e08；代码基线：bc9b2a3

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "detail_template_layout_mapping",
  "source_extraction_id": "bc5533b031084dca9b5380a9980fa8ec",
  "version": 1,
  "memory_type": "entities"
}
-->