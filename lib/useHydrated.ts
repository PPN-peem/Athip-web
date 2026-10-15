import { useSyncExternalStore } from 'react';

// true เฉพาะฝั่ง client หลัง hydrate : ใช้กับ store ที่อ่าน localStorage เพื่อไม่ให้ HTML ไม่ตรงกับ server
export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
