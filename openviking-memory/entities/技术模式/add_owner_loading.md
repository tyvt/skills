# 添加业主接口加loading防重复提交
i淮安H5 在确认添加业主调用 addOwnerDirectly 时增加全屏 loading 遮罩与提交锁。

## 改动点
- uni.showLoading 增加 mask: true 全屏遮罩，拦截触摸，与 ViewOptionsList.vue 用法一致
- submitting 状态：请求前设 true，finally 恢复 false，避免重复发起
- 按钮 :disabled="submitting" 提交中禁用「确认添加」防连点
- 方法开头 if (this.submitting) return 多一层防护
- 仅当已选房屋且 currentSelect.houseId 存在时请求 addOwnerDirectly；无 houseId 只 navigateTo 不调接口

## 验证与归属
- 验证证据：extracted source=cursor project=i淮安H5
- 涉及文件：src/pages_owner/house/automaticAdd.vue、src/pages_owner/repair/submit.vue、src/components/ZsButton/ZsButton.vue、ViewOptionsList.vue
- 所属项目：i淮安H5；来源会话：0827ee09-4d39-4174-b6b1-6333e223e06e；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "add_owner_loading",
  "source_extraction_id": "39b0dbebf07c42e1b9eae62b778a900a",
  "version": 1,
  "memory_type": "entities"
}
-->