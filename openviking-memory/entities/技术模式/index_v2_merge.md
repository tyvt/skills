# 首页合并审查三缺陷
首页 index-v2.vue 分支合并后审查发现三类真实缺陷：方法漏写括号、统计周期双源、合并冲突丢布局。

## 问题背景
- 首页 index-v2.vue 做分支合并（79f0 四行布局含双晒/标准化评价 + 另一分支 CheckDataNav/loadCheckData/openRectification）
- 接线项齐全但查出三类问题

## 缺陷清单
- [HIGH] params.month = this.currentMonth 漏写调用括号，把 methods 函数引用当值传，接口收到的不是 'yyyy-MM'；函数引用是非空真值不报错也不走兜底
- [MEDIUM] 顶部 statPeriodText 按本地「本月1日～今天」算，而 CheckDataNav/openRectification 用接口 checkData.statStartTime/statEndTime，注释却写「与顶部统计周期同源」不符
- [LOW] 合并提交 a2479b828 解冲突时丢掉双晒/评价行，完整四行布局仅在工作区未提交文件，线上仍是残版

## 解决方案
- 赋值到请求参数凡引用 methods 必须显式 this.currentMonth()，合并后对 params 做「值类型断言」
- 统计周期只保留一个来源，并改正误导注释
- 合并提交 a2479b828 解冲突时丢掉的布局必须把文件提交后再推

## 验证与归属
- 验证证据：会话 2516a955 用户要求审查 index-v2.vue 合并结果，结论列出上述三类
- 涉及文件：zhi2-web-admin/src/views/home/index-v2.vue、home/v2/components/CheckDataNav.vue、home/v2/checkDataMap.js、evaluation/rectificationNotice/constants.js
- 所属项目：苏住房G；来源会话ID：2516a955-34bc-44d5-b0a9-366106d14e71；代码基线：1e5b44d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "index_v2_merge",
  "source_extraction_id": "32afe4ffa6a047739d10dfebe51c072a",
  "version": 1,
  "memory_type": "entities"
}
-->