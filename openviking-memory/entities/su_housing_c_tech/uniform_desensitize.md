# 苏住房C 统一脱敏规则
苏住房C 已统一全项目脱敏规则，并在用户 Store 中以 getter 实时计算脱敏值，避免旧缓存导致规则不生效。

## 脱敏规则（src/utils/formatter.js）
- 中文姓名：保留第 1 位，其余用 *（如 朱楠 → 朱*，李小明 → 李**）
- 手机号：保留第 1 位和最后 2 位（如 18360916552 → 1********52）
- 身份证号：保留前 2 位和后 2 位（如 320105199001011234 → 32**************34）
- 新增 blurIdNumber 函数用于身份证脱敏

## 用户 Store 改造（src/store/user.js）
- secureUsername、securePhone、secureIdNumber 改为 getter，根据原始数据实时计算脱敏值
- 避免旧缓存导致脱敏规则不生效

## 使用范围
- 加装电梯模块 addAlone.vue、add.vue、input.vue 已使用 userStore.secureUsername 和 userStore.securePhone
- committee/application/index.vue 也适用统一规则

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 来源会话ID：2f8d30cf-a249-4fbe-8c17-0429bc7bc7e6
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "uniform_desensitize",
  "source_extraction_id": "e97a61b113eb4bd1b76ab8df3477a9d8",
  "version": 1,
  "memory_type": "entities"
}
-->