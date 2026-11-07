# 苏住房G选择小区弹窗显示外区县数据
在苏住房G项目(zhi2-web-admin)物业侧业务页，SelectDialog选择小区时误显示非当前区县数据，因复用pageNoScope接口而非带权限的page接口。
## 根因
- /property/complex有pageNoScope和page两条并列接口，pageNoScope不做区县数据权限过滤
- 页面早期随手复用pageNoScope，将外区县数据捞出
- 该问题不报错、不返回400，仅数据多出来，靠肉眼发现
## 解决方案
- 当前业务上下文选小区/项目一律用带数据权限的/property/complex/page
- 仅明确跨区县全量场景(如后台管理查询)才用pageNoScope
- 改完须拉跨区县有数据的账号验证，不能只跑同区县用例
- v2.6.1全量合v2.6.2冲突多，改为cherry-pick单条修复提交
## 验证与归属
- 验证证据：extracted source=cursor project=苏住房G
- 验证：会话5380defe，已增梯维护新增选择小区显示外区县，定位detail.vue的handleOpenProjectDialog中url改为/page后恢复
- 提交：18986faec(v2.6.1)→cherry-pick 3ae901631(v2.6.2)→d8d0090b2(v2.6.2-suzhufang)
- 涉及文件：src/views/property/census/detail.vue；所属项目：苏住房G；来源会话：5380defe-19ed-4a64-b4c5-f45d134d8f43；代码基线：d109b83

<!-- MEMORY_FIELDS
{
  "category": "代码缺陷",
  "name": "suzhufang_pagenoscope",
  "source_extraction_id": "6826e403948f4fa8a548e51c974c8ca3",
  "version": 1,
  "memory_type": "entities"
}
-->