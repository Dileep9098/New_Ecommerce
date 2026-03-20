import React from 'react'

export default function GeneralInfo() {
    return (
        <>
            <section className="relative py-24 bg-gradient-to-b from-emerald-50 via-white to-yellow-50 overflow-hidden">
                {/* background decorations */}
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

                <div className="container mx-auto px-6 relative z-10">
                    {/* Heading */}
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
                            Making Your Daily Shopping <span className="text-emerald-600">Smarter</span>
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            From express deliveries to unbeatable offers — we bring convenience, speed, and quality right to your doorstep.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {[
                            {
                                icon: "clock.svg",
                                 title: "Fastest Grocery Delivery",
  desc: "Get your essentials delivered to your doorstep in the minimum possible time from nearby stores.",
  color: "from-green-400 to-emerald-600",
                            },
                            {
                                icon: "gift.svg",
                                title: "Best Prices & Offers",
                                desc: "Save big with daily deals, combos, and cashback offers you can’t resist.",
                                color: "from-yellow-400 to-orange-500",
                            },
                            {
                                icon: "package.svg",
                                title: "Wide Assortment",
                                desc: "Choose from 5000+ products — fresh, frozen, packed & everything in between.",
                                color: "from-blue-400 to-cyan-500",
                            },
                            {
                                icon: "refresh-cw.svg",
                                title: "Easy Returns",
                                desc: "Change your mind? Get quick doorstep returns & instant refunds.",
                                color: "from-pink-400 to-rose-500",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="group relative p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                            >
                                {/* floating gradient circle behind icon */}
                                <div
                                    className={`absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-r ${item.color} rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-all duration-500`}
                                ></div>

                                <div className="relative flex flex-col items-center text-center">
                                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-md mb-6`}>
                                        <img src={`assets/images/icons/${item.icon}`} alt={item.title} className="w-100 h-10 invert brightness-0" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>

                                {/* glow animation ring */}
                                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-emerald-300/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-500"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </>
    )
}
