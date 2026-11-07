- Lingxi `requestCode` is a one-time login credential; when carried in URL, must reissue a new token instead of reusing the old one
- After `userStore.clear()` in `onLaunch`, do not restore the same `requestCode` old token from localStorage and skip `lingXiLogin`; this caused `bindHouseByLingXi` to send an invalid token and receive 401
- When `requestCode` exists, clear old token cache and re-login

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "lingxi_login_token",
  "source_extraction_id": "51c475875d87459b8f21f008402d2f1a",
  "version": 1,
  "memory_type": "preferences"
}
-->