# Java Long ID 前端精度丢失
后端 Java Long 类型 ID 经 JSON 返回为 JS number 超过 2^53 会精度丢失，前端应声明为字符串。

## 问题背景
- 后端 Java Long 字段（如 companyRegisterId）经 JSON 返回为 JS number，大整数精度丢失。
- 接口返回正确，但前端若用 number 接收会出错。

## 解决方案
- 前端相关模型/表单字段应声明为字符串类型。
- 或后端用 String 序列化该 ID 避免精度问题。

## 验证与归属
- 验证：companyRegisterId 精度丢失，应该用字符串类型，接口返回是对的。
- 涉及文件：src/views/register/companyRegister.vue。
- 来源会话：003-long；代码基线：none。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "java_long_id_string",
  "source_extraction_id": "ec03f1a8ff9a4f548b9232380e7504fa",
  "version": 1,
  "memory_type": "entities"
}
-->