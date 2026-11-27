---
audit_status: valid
last_checked: 2026-11-28T02:45:53+08:00
verdict_note: D-/DBX 实存；dbxenc1 存储机制技术记忆，无明文口令泄露，与现状无矛盾。
---
# DBX local secret store (dbxenc1)
DBX desktop database client keeps connection passwords in an app-encrypted local store and only uses them internally, so its query tools never reveal them.

## Storage layout
- DBX is installed at D:\DBX and ships as a single bundled ~90 MB binary.
- Connection store is the SQLite file dbx.db, with `connections` and `connection_secrets` tables; secret values carry the `dbxenc1.` prefix.
- Envelope shape `dbxenc1.<iv:12 bytes>.<ciphertext+tag>` matches an AEAD cipher; the binary uses Rust `ring` (AES-256-GCM / ChaCha20-Poly1305).
- App strings reference secret store id `com.dbx.app.secret-store.v1` and a `local-data-encryption-key`.

## Key handling
- The 32-byte data key sits in Windows Credential Manager as `local-data-encryption-key.com.dbx.app.secret-store.v1`, protected by DPAPI.
- Decryption attempts on 2026-11-24 with that key (direct GCM, HKDF variants, AAD variants, stream modes) all failed; the exact derivation/AAD remains unknown.
- The duplicate-connection tool copies full settings including credentials but does not return plaintext.

## Practical implications
- `dbx_execute_query` with `connection_name` can still query through the stored credentials, so DB work does not require the plaintext password.
- On 2026-11-24 both known candidates (SYSDBA on the Suzhou dev host and on the alternate 苏住房 dev host 172.9.1.1) were rejected by 达梦 with 用户名或密码错误 (errorCode -2501) until the user supplied the correct password.
- Recovering the password from the encrypted store is not worth further budget; ask the user instead.

<!-- MEMORY_FIELDS
{
  "category": "tech_pattern",
  "name": "dbxenc1_secret_store",
  "source_extraction_id": "11a9ac8607854987a4541fd8aef492b9",
  "version": 1,
  "memory_type": "entities"
}
-->