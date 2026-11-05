
# 性别选择器误用data-list致个人信息不显
泰兴小程序 personal-info.vue 中性别选择器误用 :data-list 属性，项目其他 20+ 处 ZsPicker 均用 :dataList，导致小程序端性别字段显示空白。

## 问题根因
- personal-info.vue 性别选择器误用 :data-list 属性，小程序端可能无法映射到组件 dataList prop，选项列表为空；接口已返回性别值时组件认为「有值」但找不到对应文案，字段显示空白。
- ZsPicker 原用 v-if="modelValue" 判断是否有值，当值为数字 0（未知）时被当成空。
- ZsPicker 的 currentText 用严格相等 === 匹配，接口返回数字 1/2 时对不上字符串 '1'/'2'。

## 解决方案
- personal-info.vue：:data-list → :dataList。
- ZsPicker.vue：用 hasValue + displayText 统一处理 0、数字/字符串类型不一致等情况。

## 验证与归属
- 验证证据：extracted source=cursor project=泰兴小程序
- 涉及文件：src/staff/pages/profile/personal-info.vue、src/components/ZsPicker/ZsPicker.vue、src/staff/store/user.js
- 来源会话ID：f1d75e40-8380-4c8e-b5ee-a2b53b5dc865
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "gender_datalist_misuse",
  "source_extraction_id": "eca9392103974c479511f0942f341ea8",
  "version": 2,
  "memory_type": "entities"
}
-->