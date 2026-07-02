export default function HeroBanner() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left side - Deep Teal Box */}
        <div className="bg-[#1A4454] border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-black uppercase leading-tight text-white">
              THE GOAT MID-YEAR DROP
            </h2>
            <p className="text-2xl font-black text-[#00FF87]">ALL FOR ₹0.</p>
            
            <div className="inline-block bg-[#00FF87] border-3 border-black px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span className="font-black text-[#1A4454] uppercase text-sm">
                100% PLACEBO DISCOUNT AUTO-APPLIED
              </span>
            </div>

            <button className="block mt-6 px-6 py-3 bg-[#00FF87] border-3 border-black font-black uppercase text-[#1A4454] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Shop Now
            </button>
          </div>
        </div>

        {/* Right side - Luxury Items Stack */}
        <div className="space-y-4">
          <div className="bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-black flex items-center justify-center">
              <span className="text-4xl">📱</span>
            </div>
            <p className="mt-4 font-black text-[#1A4454]">iPhone 16 Pro Max</p>
            <p className="text-sm font-semibold text-gray-600">Luxury Tech</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="aspect-square bg-gradient-to-br from-yellow-200 to-yellow-300 border-2 border-black flex items-center justify-center">
                <span className="text-3xl">⌚</span>
              </div>
              <p className="mt-2 font-bold text-[#1A4454] text-sm">Rolex</p>
            </div>

            <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="aspect-square bg-gradient-to-br from-red-200 to-red-300 border-2 border-black flex items-center justify-center">
                <span className="text-3xl">👟</span>
              </div>
              <p className="mt-2 font-bold text-[#1A4454] text-sm">Jordan 1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
