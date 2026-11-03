# V3拦截器把编辑POST补成/add导致打到新增接口
流程配置弹窗点编辑保存时，Network 出现 POST /flowable/flowConfig/add 而非更新接口，表现为「编辑当成新增」。

## 问题现象
- 源码写 $put('/flowable/flowConfig')，发出去却是 POST /flowable/flowConfig/add
- 新增与编辑命中同一地址，后端按新增处理，编辑数据被当新增

## 根因
- V3 的 $post 补丁与 normalizeV3ApiUrl 是链式改写
- 第一段把非安全白名单的 $put 一律降级成 POST
- 第二段对「两段路径 + POST」统一补 /add 动作后缀

## 解决方案
- 不要用 $put 表达更新；新增留 $post('/flowable/flowConfig') 靠规范化补成 /add
- 编辑必须显式写全动作 $post('/flowable/flowConfig/update')，末段已是动作则不再被补
- 改完用 normalizeV3ApiUrl 跑一遍确认最终 URL 后才交付

## 排查与归属
- 同类「编辑打了 add」先看目标路径是否两段：两段 + POST 必然被补 /add，改成三段或直接写全动作
- 验证：$post('/flowable/flowConfig') → /add；$post('/flowable/flowConfig/update') → /update
- 涉及文件：ConfigDialog.vue、table.js、utils(normalizeV3ApiUrl)
- 所属项目：产品2.0；来源会话：db0afc1e-0b50-40e1-afa6-15d8133f8ee0；基线：62d5fb9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "v3_normalize_add",
  "source_extraction_id": "6285554fd6dd46f69040df906ff0d5fd",
  "version": 1,
  "memory_type": "entities"
}
-->