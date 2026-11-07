# 人工审核实名提交证件类型为空bug
提交人工审核实名时请求体为空导致后端报「证件类型不能为空」，根因是提交时读userStore被onShow清空。

## 现象
- 人工审核页提交 checkRepeatRealName 与 manualAuditRealName 请求体为空，后端返回 400 / code 1101「证件类型不能为空」。

## 根因
- 提交时才从 userStore 读取 idType、idNumber、username、nationality、oldIdNumber。
- 上传身份证照片返回小程序触发 App.onShow → getUserInfo 清空 store 临时身份数据。

## 修复方案
- 在 FormManual.vue 的 onLoad 做一次性快照存本地 verifyInfo（含上述字段）。
- 所有提交请求一律用 verifyInfo.*，不在提交时读 store。
- 加快照兜底校验：快照为空提示「证件信息缺失，请返回上一步重新填写」并阻断提交。
- 覆盖两条上游链路：非本地证件 FormNonLocal→humanReview()写store→FormManual；本地身份证 FormLocal→setTmpUserInfo()(idType='01')→FormManual?local=true。
- 凡「上一步写store、下一步跨小程序前后台后提交」表单均按 onLoad 快照+提交校验模式处理。

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 所属项目：苏住房C；代码基线：6599714；来源会话ID：fe7db194-e3eb-4ff2-81a5-4fc5d0da76f3。
- 涉及文件：zhi2-mobile-shimin/src/pages_my/verification/FormManual.vue、FormLocal.vue、FormNonLocal.vue、src/store/user.js。
- 验证：会话贴出 getRepeatByIdTypeAndIdNumber 返回 code 1101 完整请求，结论确认 onLoad 快照与兜底提示。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "manual_audit_realname_empty_bug",
  "source_extraction_id": "70fc14d1e2ea42d0bf2f14201419d722",
  "version": 1,
  "memory_type": "entities"
}
-->