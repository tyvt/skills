# 多套同类规则共用列表组件时按钮文案须从枚举派生
苏住房G项目中业主自治-规约管理下管理规约/议事规则/工作规则三套规则共用同一列表组件，按钮中文名写死导致串味，须从类型枚举派生。

## 问题背景
- 管理规约/议事规则/工作规则三套规则共用 src/views/autonomy/regulation/components/index.vue，靠路由传入 regulationType 区分
- 列表顶部「已备案XX」按钮写死成「已备案管理规约」，导致议事规则/工作规则页也显示「已备案管理规约」
- 项目中文名已集中放 enums.js（VERSION_TYPE/REGULATION_TYPE/REGULATION_NAME），组件另写字面量必然漂移

## 解决方案
- 从 enums.js 引 REGULATION_TYPE、REGULATION_NAME，用 getKeyByValue(REGULATION_TYPE, this.regulationType) 取枚举 key，再查 REGULATION_NAME 得中文名，兜底返回「规约」
- 包成 computed（regulationName），按钮用模板字符串 label:`已备案${this.regulationName}`
- 只改文案，权限标识与跳转逻辑一律不动（备案详情/变更页本就按 regulationType 动态生成）

## 与已知差异及验证
- 区别于已知 #856/#734（只讲列表页标题从路由 meta.title 读取），此处标题在业务枚举里，需 getKeyByValue+名称枚举查表
- 排查指引：遇「A 菜单名出现在 B 菜单」先确认是否共用组件，再 grep 组件中文字面量
- 验证：会话 ba726002 用户反馈按钮名错误；修复落唯一硬编码处，node --check 通过；三套规则分别显示已备案管理规约/议事规则/工作规则
- 验证证据：src=苏住房G/061.md
- 涉及文件：views/autonomy/regulation/components/index.vue、enums.js、discuss/final/index.vue、work/final/index.vue、regulation/final/index.vue、src/mixins/listMixins.js、views/autonomy/regulation/record/index.vue
- 所属项目：苏住房G；来源会话：ba726002-0b18-413d-9066-a944320c62c9；代码基线：9e5c499

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "shared_list_btn_text",
  "source_extraction_id": "fcb70580f7074a5e8c518d8c5fbf82b4",
  "version": 2,
  "memory_type": "entities"
}
-->