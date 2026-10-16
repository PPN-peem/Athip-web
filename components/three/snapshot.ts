// สะพานให้ปุ่ม Share / Add to cart ขอภาพ snapshot จาก canvas 3D โดยไม่ต้องผูก component เข้าด้วยกัน
type Fn = () => string | null;
let fn: Fn | null = null;
export const registerSnapshot = (f: Fn | null) => {
  fn = f;
};
export const takeSnapshot = (): string | null => (fn ? fn() : null);
