# 物业B端首页未区分终端类型误渲新版
惠山二期G zhi2-web-admin 首页包装组件未区分 terminalType 致物业B端误入新版首页的缺陷与修复。

## 问题根因
- zhi2-web-admin/src/views/home/index-wrapper.vue 的 useBakComponent 原仅依据 localStorage.cwzxt 决定新版 index-v2
- 未区分 terminalType，致物业B端账号误入新版

## 修复方案
- 增加 terminalType === 'B' 判断强制渲染旧版 index-bak
- terminalType 在守卫 GetInfo 写入 store 时序无碍

## 验证与归属
- 验证证据：src=惠山二期G/013.md
- 涉及文件：zhi2-web-admin/src/views/home/index-wrapper.vue
- 所属项目：惠山二期G；来源会话：cc2fdb8f-a6a1-46f0-b90b-f048bcbf9bd2；代码基线：none
- 建议验证：物业账号(B端)登录应见旧版首页；G端账号登录仍为新版首页

<!-- MEMORY_FIELDS
{
  "category": "惠山二期G技术",
  "name": "home_terminal_bug",
  "source_extraction_id": "ae053fea123242788f33036f4ed333c3",
  "version": 2,
  "memory_type": "entities"
}
-->