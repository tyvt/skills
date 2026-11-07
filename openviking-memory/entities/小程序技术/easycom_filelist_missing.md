# 分包迁移后easycom未命中FileList致附件静默不渲染
苏住房C双晒公示三类详情页因分包迁移后 FileList 组件未显式 import 且 easycom 扫不到，附件整块空白不报错。

## 问题现象
- 双晒公示下「物业服务计划/公共收益收支/维修资金使用」三个详情页附件全部不显示，main2.1 分支正常
- 物业服务合同页跳 contracts.vue 故正常；迁移后组件解析失败被静默跳过，不报错不 console

## 根因
- 分包迁移把 FileList 从主包 src/components/FileList/ 挪到 pages_main/components/FileList/
- main2.1 里仍主包，easycom 自动扫描命中；迁移后 easycom 扫不到，页面无显式 import 致标签解析失败

## 解决方案
- ListDetail.vue 与 files.vue 补显式 import FileList from 分包实际路径
- 组件跨包移动后凡靠 easycom 隐式使用的标签都要补 import(全局搜 `<ComponentName` 排除已 import 文件兜底)
- 附件拉取改用 watch(noticeId)，因 detail.vue 用 v-if="loading" 延迟挂载子组件使 onShow 错过生命周期
- 改完必须重新编译小程序(开发者工具点编译不生效)

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证会话 63bf69eb：定位 ListDetail.vue 用 <FileList> 未 import、easycom 找不到，改显式 import 并将 onShow 拉附件改 watch(noticeId)
- 涉及文件：src/pages/publicNotice/detail.vue、ListDetail.vue、files.vue、src/api/notice.js、src/pages.json
- 所属项目：苏住房C；来源会话ID：63bf69eb-375f-44da-bede-0924286c59be；代码基线：8fc3cc5

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "easycom_filelist_missing",
  "source_extraction_id": "c44346873fb44f028707ec585c087aa1",
  "version": 1,
  "memory_type": "entities"
}
-->