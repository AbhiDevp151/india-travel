export default function Gallery() {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  return (
    <main className="bg-zinc-950 pt-32 pb-20 min-h-screen text-white">
      <div className="container mx-auto px-6">
        <h1 className="text-6xl font-black mb-4 italic uppercase">Our <span className="text-orange-500 not-italic">Gallery</span></h1>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-4 mb-12">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setActive(c)}
              className={`px-6 py-2 rounded-full text-sm font-bold border transition-all ${active === c ? 'bg-orange-500 border-orange-500 text-white' : 'border-white/10 text-gray-400 hover:border-white/30'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {GALLERY.map((img, index) => (
            <div key={img.id} onClick={() => setLightbox(index)}
              className="relative group overflow-hidden rounded-2xl cursor-pointer break-inside-avoid">
              <img src={img.thumb} alt={img.title} className="w-full h-auto transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <h3 className="font-bold text-lg">{img.title}</h3>
                <p className="text-gray-400 text-xs flex items-center gap-1">📍 {img.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox - Tailwind style */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl" onClick={() => setLightbox(null)}>
          <button className="absolute top-10 right-10 text-4xl text-white">&times;</button>
          <img src={GALLERY[lightbox].src} className="max-w-full max-h-[80vh] rounded-lg shadow-2xl shadow-orange-500/10" />
          <div className="absolute bottom-10 text-center">
            <h3 className="text-2xl font-bold">{GALLERY[lightbox].title}</h3>
            <p className="text-orange-500">{GALLERY[lightbox].location}</p>
          </div>
        </div>
      )}
    </main>
  );
}