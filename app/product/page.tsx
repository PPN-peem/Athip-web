const products = [
	{ name: "Everyday Ceramic Mug", category: "Home & Living", price: "$24", color: "#d9c8b4", icon: "☕", tag: "Bestseller" },
	{ name: "Weekend Canvas Tote", category: "Accessories", price: "$32", color: "#c9d2c1", icon: "👜", tag: "" },
	{ name: "Soft Knit Throw", category: "Home & Living", price: "$68", color: "#e8d8c8", icon: "🧶", tag: "New" },
	{ name: "Little Garden Candle", category: "Wellness", price: "$28", color: "#d8d7c6", icon: "🕯️", tag: "" },
	{ name: "Sunday Market Vase", category: "Home & Living", price: "$46", color: "#dfc7bf", icon: "🏺", tag: "" },
	{ name: "Daily Ritual Journal", category: "Stationery", price: "$18", color: "#cbd4da", icon: "📔", tag: "" },
	{ name: "Coastal Hand Soap", category: "Wellness", price: "$16", color: "#d6e0d9", icon: "🧼", tag: "" },
	{ name: "A Little Bit of Sunshine", category: "Just because", price: "$22", color: "#ead9a9", icon: "🌼", tag: "Staff pick" },
];

const categories = ["All things", "Home & Living", "Accessories", "Wellness", "Stationery"];

export default function ProductPage() {
	return (
		<main className="min-h-screen bg-[#faf9f6] text-[#26332b]">
			<header className="border-b border-[#e9e7df]">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
					<a href="/" className="text-xl font-semibold tracking-[0.12em]">little things<span className="text-[#87977f]">.</span></a>
					<nav className="hidden items-center gap-9 text-sm text-[#667168] md:flex" aria-label="Main navigation">
						<a className="hover:text-[#26332b]" href="/">Home</a>
						<a className="font-medium text-[#26332b]" href="/product">Shop</a>
						<a className="hover:text-[#26332b]" href="#about">Our story</a>
					</nav>
					<a href="#products" className="rounded-full border border-[#d9ded5] px-4 py-2 text-sm font-medium hover:bg-white">Bag <span className="ml-1 text-[#7f8d78]">(0)</span></a>
				</div>
			</header>

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

				<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
					{products.map((product) => (
						<article key={product.name} className="group">
							<div className="relative flex aspect-[4/4.5] items-center justify-center overflow-hidden rounded-sm" style={{ backgroundColor: product.color }}>
								{product.tag && <span className="absolute left-4 top-4 rounded-full bg-[#faf9f6]/90 px-3 py-1 text-[11px] font-medium tracking-wide text-[#566255]">{product.tag}</span>}
								<span className="select-none text-7xl transition duration-300 group-hover:scale-110" role="img" aria-label={product.name}>{product.icon}</span>
								<button type="button" aria-label={`Add ${product.name} to bag`} className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#faf9f6] text-xl shadow-sm transition hover:bg-[#344238] hover:text-white">+</button>
							</div>
							<div className="flex items-start justify-between gap-3 pt-4">
								<div>
									<p className="text-[11px] uppercase tracking-[0.13em] text-[#92988f]">{product.category}</p>
									<h2 className="mt-1.5 font-medium">{product.name}</h2>
								</div>
								<p className="pt-4 text-sm">{product.price}</p>
							</div>
						</article>
					))}
				</div>
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
