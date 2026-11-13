- 当 pytest 采集器因插件或版本不兼容崩溃时，首选修好采集器——锁插件/pytest 版本（如 pytest>=8,<9），让全量 pytest 回归能跑，成本最低且顺手还债；修好后方案第6节改写「已修复 + 全量 pytest 回归」
- 短期修不了时允许「模块直接运行」作临时验证手段，但方案须写清覆盖范围、标注盲区、加「实际执行用例数」自检、记录改动前基线，并留「pytest 修复后补跑全量」收尾项
- 禁止让「模块直接运行」悄悄变成长期默认验证方式——那会把一个环境缺陷固化成流程债

<!-- MEMORY_FIELDS
{
  "peer_id": "github.com-tyvt-skills",
  "user": "github.com-tyvt-skills",
  "topic": "pytest采集器缺陷处理策略",
  "source_extraction_id": "c389a0fa386a43f0b8517315442aad33",
  "version": 1,
  "memory_type": "preferences"
}
-->