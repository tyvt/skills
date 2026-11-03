# Windows python3 abre loja
No Windows, os stubs python.exe/python3.exe em WindowsApps redirecionam chamadas de python3 para a Microsoft Store.
## Problema
- Stubs em WindowsApps causam redirecionamento para loja ao invocar python3.
- Ambiente: Windows com Python em C:\Program Files\Python310.
## Solução
- Remover stub e criar hard link de C:\Program Files\Python310\python3.exe para python.exe.
- Configurar ~/.bashrc e python.defaultInterpreterPath no Cursor para contornar.
## Verificação
- Fonte: 苏州市房地产监测V3-leftover/005.md; sessão 7907a58f-b73f-49f7-ad3d-d1a5d8cfa3eb.
- Arquivos: zhi2-web-admin/.vscode/settings.json; Cursor User settings.json.

<!-- MEMORY_FIELDS
{
  "category": "Padrão técnico",
  "name": "windows_python3_store_alias",
  "source_extraction_id": "96963c4591f34599a58a91018404b608",
  "version": 1,
  "memory_type": "entities"
}
-->