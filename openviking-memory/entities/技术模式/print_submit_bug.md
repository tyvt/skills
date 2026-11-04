# 打印补交明细后无法提交业务
园区V0 中将「导出 Excel」替换为「打印补交明细」后，漏设提交标志位导致二次提交被拦截的缺陷。

## 业务流程
- 点击提交触发 submitTigComplete()，后端检测到账户余额不足首期 30% 时弹窗提示
- 点确定调用 submitTigComfim() 仅设 isShowTig=true，显示「提示函」「打印补交明细」按钮
- 用户需先打印补交明细成功并设置 submitConTig=true，再次提交 submitForm() 才走正式提交

## 缺陷原因
- 原 exportExcel() 成功时设 submitConTig=true（mfap_MfapFinalSharePublicDetail.js 1224:1226）
- 替换的 shareDetailPrint()（打印补交明细）成功时未设置 submitConTig=true，致 submitForm() 判断不通过

## 涉及文件
- EstateManagement-Park/src/main/webapp/mfap/js/mfap_MfapFinalSharePublicDetail.js（1224:1226）
- EstateManagement-Park/src/main/webapp/mtpl/js/mtpl_MtplMoneySharePubDetail.js（1181）
- 所属项目：园区V0；来源会话 ID：553dcf6a-8386-4166-a8c5-2cbd36497fe6

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "print_submit_bug",
  "source_extraction_id": "055d67c4bfe04f0dad94d4fd3021f03e",
  "version": 1,
  "memory_type": "entities"
}
-->