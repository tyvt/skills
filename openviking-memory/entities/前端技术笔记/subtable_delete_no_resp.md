# 子表删除按钮无反应修复模式
房屋查封(housingCloSeq)编辑态子表删除按钮因未定义变量引用与静默异常导致点击无反应的修复模式。

## 问题根因
- 删除方法 `deleteBatch` 引用从未定义的变量 `theClourse`，执行到该行抛错中断，点击处理无 try/catch 导致 UI 无反馈
- 方法内携带后端不存在字段 `disDeleteList` 及其映射，产生脏数据残留
- 「查封中不可删除」校验走静默抛异常路径，把正常业务校验变成无反馈失败

## 解决方案
- 排查顺序：先查点击绑定/权限位 → 逐行查未定义变量(ESLint no-undef 可兜) → 再看业务校验提前 return
- 业务校验改为面向用户明确提示，判定依据用本次要删除行的 `seizeStatus`(值为1表示已查封)，非全局/首行状态
- 清理后端不存在字段 `disDeleteList` 及映射；批量删除成功后清空 `idArr` 避免连续删除复用旧 id
- 请求契约保持 `POST ZS_Sale/houseclosure/linkHouseClosureDelete {idArr}`；按钮不显示属 `optBtns` 缺 `buscode="100203"` 权限位，与删除方法分开排查

## 验证与归属
- 验证：会话 session-8f7c60b2-a14a-435f-8ed3-f7cef70a2d17 基线 e4255068 提交说明 fix 移除 theClourse 裸引用、删 disDeleteList、校验改明确提示、成功后清 idArr
- 涉及文件：src/views/mortgageSys/sequLim/housingCloSeq/housingCloSeqInfo/housingCloSeqInfo.js、.vue；src/components/optBtns/optBtns.vue(本次未改)
- 来源会话ID：session-8f7c60b2-a14a-435f-8ed3-f7cef70a2d17；代码基线：e4255068

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "subtable_delete_no_resp",
  "source_extraction_id": "9e62d011f42c4ed5ab0129bb7110234d",
  "version": 1,
  "memory_type": "entities"
}
-->