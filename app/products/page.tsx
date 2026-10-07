const categories = ["All things", "Home & Living", "Accessories", "Wellness", "Stationery"];

// นำข้อมูลจำลองออก และทำอาร์เรย์ให้ว่างเปล่าเพื่อรอรับข้อมูลจาก Database หรือ API
const products: any[] = []; 

export default function ProductPage() {
    return (
        <main className="min-h-screen bg-[#faf9f6] text-[#26332b]">
            <section className="mx-auto max-w-7xl px-6 pb-12 pt-14 lg:px-10 lg:pb-16 lg:pt-20">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#87977f]">Thoughtful things, made to last</p>
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <h1 className="max-w-2xl text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">Good things for<br className="hidden sm:block" /> everyday living.</h1>
                        <p className="mt-5 max-w-lg leading-7 text-[#737b73]">A considered collection of useful, lovely objects for your home and the people in it.</p>
                    </div>
                    <p className="text-sm text-[#737b73]">A few favorites, picked just for you <span aria-hidden="true">✳</span></p>
                </div>
            </section>

            <section id="products" className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
                <div className="mb-8 flex flex-col justify-between gap-5 border-b border-[#e9e7df] pb-5 sm:flex-row sm:items-center">
                    <div className="flex flex-wrap gap-2" aria-label="Product categories">
                        {categories.map((category, index) => (
                            <button key={category} type="button" className={`rounded-full px-4 py-2 text-sm transition ${index === 0 ? "bg-[#344238] text-white" : "border border-[#e4e5dd] text-[#687169] hover:bg-white"}`}>
                                {category}
                            </button>
                        ))}
                    </div>
                    <p className="text-sm text-[#858b83]">Showing {products.length} lovely finds</p>
                </div>

                {/* ส่วนแสดง Product ที่ถูกเว้นว่างไว้ */}
                {products.length === 0 ? (
                    <div className="flex min-h-75 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#e9e7df] bg-[#faf9f6]/50">
                        <p className="text-[#858b83]">ไม่มีรายการสินค้าในขณะนี้ (รอการเชื่อมต่อข้อมูล)</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                        {/* โครงสร้าง grid เตรียมพร้อมสำหรับรับข้อมูล .map() ในอนาคต */}
                    </div>
                )}
            </section>

            <footer id="about" className="border-t border-[#e9e7df] bg-[#f3f2ed]">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-[#737b73] sm:flex-row sm:items-center sm:justify-between lg:px-10">
                    <p className="font-medium text-[#344238]">Little things, thoughtfully found.</p>
                    <p>Free shipping on orders over $75 · Made for everyday</p>
                </div>
            </footer>
        </main>
    );
}