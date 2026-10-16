// ทุกครั้งที่เปลี่ยนหน้า เนื้อหาจะเลื่อนขึ้นพร้อม fade (เห็นผลเพราะ template สร้างใหม่ทุก route)
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="enter">{children}</div>;
}
