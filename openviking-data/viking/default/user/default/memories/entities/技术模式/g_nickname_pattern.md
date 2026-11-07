# G 端账号顶栏/首页/水印统一展示「姓名（部门）」
terminalType 为 G 且具备 deptName 时昵称统一展示「姓名（部门）」，集中到 store getters displayNickName 避免各页手写拼接。

## 问题背景
- G 端需展示用户姓名（部门），其余端别仍只显示姓名
- 顶栏、首页、HelloCard、水印多处需要相同拼接逻辑，易写出不一致实现
- deptName 来自 getInfo 登录写入 store，无需额外请求

## 解决方案
- store getters 增加 displayNickName 集中判定：terminalType === 'G' 且有 deptName 时返回 `${nickName}（${deptName}）`
- Navbar（桌面/移动菜单）、home/index、HelloCard、AppMain 水印共用该 getter
- 其余端别仍只显示姓名，不拼接部门

## 验证与归属
- 验证：用户需求 G 端展示用户姓名（部门）；实现 getters.js displayNickName 并改 Navbar、HelloCard、home/index、AppMain 水印
- 涉及文件：zhi2-web-admin/src/store/getters.js、layout/components/Navbar.vue、views/home/index.vue、views/home/components/HelloCard.vue、layout/components/AppMain.vue
- 所属项目：园区公共收益；来源会话：d2aa8b01-1642-4b49-aad0-12d6c2d5a94e；代码基线：f783ca2

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "g_nickname_pattern",
  "source_extraction_id": "54194ab371814c2fb7ecde84d359cc63",
  "version": 1,
  "memory_type": "entities"
}
-->