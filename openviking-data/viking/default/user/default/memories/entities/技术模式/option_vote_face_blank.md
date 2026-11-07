# 选项表决空数组致人脸页白屏
太仓一网通办H5 选项表决时 myOptionList 为空数组（truthy），跳转人脸时未读取 optionGroupList，回调 optionList 为空、提交失败卡白屏。

## 问题根因
- 选项存在 optionGroupList，但跳转逻辑用 myOptionList || optionGroupList[0].tMfOptionApplyList
- myOptionList 为 []，JS 中 truthy，永不走 optionGroupList
- 回调 URL 的 optionList 为空，人脸回来提交失败，页面卡在 FaceStep 白屏

## 修复方案
- 修正选项获取逻辑，选项表决正确读取 optionGroupList
- 新增 selectedOptionList 缓存，选择/签字时保存已选选项
- FaceStep 增加「正在跳转人脸识别…」提示和失败重试
- 检测 wx.miniProgram 是否可用，失败时给出明确提示

## 验证与归属
- 验证证据：extracted source=cursor project=太仓一网通办H5
- 涉及文件：src/views/owner-decision/ParticipateIn.vue、src/views/decision/ParticipateIn.vue、src/views/decision/components/FaceStep.vue、src/store/vote.js
- 所属项目：太仓一网通办H5；来源会话：450cf900-8bb2-4bf4-bf8c-b1ac346c87fb；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_vote_face_blank",
  "source_extraction_id": "7be04939e3014bdabe23804ada6a4c43",
  "version": 1,
  "memory_type": "entities"
}
-->