'use client'

export default function Marquee() {
  return (
    <div className="w-full bg-[#00FF87] border-y-4 border-black overflow-hidden shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex animate-marquee whitespace-nowrap">
        <div className="text-2xl font-black text-[#1A4454] px-8 py-4 inline-block">
          🎉 SALE ON PLACEBOCART 🎉 EVERYTHING FREE 🎉 DOPAMINE RUSH GUARANTEED 🎉
        </div>
        <div className="text-2xl font-black text-[#1A4454] px-8 py-4 inline-block">
          🎉 SALE ON PLACEBOCART 🎉 EVERYTHING FREE 🎉 DOPAMINE RUSH GUARANTEED 🎉
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
