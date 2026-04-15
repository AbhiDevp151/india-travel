import React, { useState } from 'react';

const INITIAL_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1524492717547-2249978a688b?w=800', title: 'Taj Mahal' },
  { url: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800', title: 'Varanasi' },
  { url: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800', title: 'Humayun Tomb' },
  { url: 'https://images.unsplash.com/photo-1598324789736-4861f89564a0?w=800', title: 'Munnar' },
  { url: 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800', title: 'Kerala' },
  { url: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?w=800', title: 'Jaipur' },
  { url: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800', title: 'Goa' },
  { url: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800', title: 'Mumbai' },
  { url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800', title: 'Udaipur' },
  { url: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800', title: 'Ladakh' },
  { url: 'https://images.unsplash.com/photo-1566117773210-909241b7f83e?w=800', title: 'Rishikesh' },
  { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', title: 'Red Fort' },
  { url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800', title: 'Hampi' },
  { url: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800', title: 'Sikkim' },
  { url: 'https://images.unsplash.com/photo-1526761122248-c31c93f8b2b9?w=800', title: 'Shimla' },
  { url: 'https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?w=800', title: 'Ooty' },
  { url: 'https://images.unsplash.com/photo-1590050752117-23a9d7fc201c?w=800', title: 'Amritsar' },
  { url: 'https://images.unsplash.com/photo-1599661046289-e318978b6ffc?w=800', title: 'Jaisalmer' },
  { url: 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?w=800', title: 'Manali' },
  { url: 'https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?w=800', title: 'Agra Fort' },
  { url: 'https://images.unsplash.com/photo-1517330357046-3ab5a5dd42a1?w=800', title: 'Khajuraho' },
  { url: 'https://images.unsplash.com/photo-1613395210343-b93868622c30?w=800', title: 'Kanyakumari' },
  { url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800', title: 'Chennai' },
  { url: 'https://images.unsplash.com/photo-1561361513-2d8f558bc61b?w=800', title: 'Ghats' },
  { url: 'https://images.unsplash.com/photo-1617653202545-931490e8d5e6?w=800', title: 'Leh Palace' },
  { url: 'https://images.unsplash.com/photo-1577089416457-45a0699cf3fd?w=800', title: 'Mysore' },
  { url: 'https://images.unsplash.com/photo-1597044751137-975945d82084?w=800', title: 'Darjeeling' },
  { url: 'https://images.unsplash.com/photo-1569350080814-974b76baadbd?w=800', title: 'Victoria Memorial' },
  { url: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800', title: 'Hyderabad' },
  { url: 'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?w=800', title: 'Alleppey' },
];

const Gallery = () => {
  const [images, setImages] = useState(INITIAL_IMAGES);

  const handleImageError = (index) => {
    setImages((prev) => {
      const updated = [...prev];
      // Broken image ko nikalo
      const brokenItem = updated.splice(index, 1)[0];
      // End mein push kardo with a flag
      return [...updated, { ...brokenItem, broken: true }];
    });
  };

  return (
    <main className="min-h-screen bg-zinc-950 pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <header className="mb-20 border-l-4 border-orange-500 pl-8">
          <p className="text-orange-500 font-black text-xs uppercase tracking-[0.4em] mb-4">India in Focus</p>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-none">
            Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 not-italic">India</span>
          </h1>
          <p className="text-gray-500 mt-6 max-w-xl text-sm font-bold uppercase tracking-widest leading-relaxed">
            A curated collection of 30 breathtaking landscapes and monuments.
          </p>
        </header>

        {/* Masonry Grid Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {images.map((img, i) => (
            <div 
              key={img.url + i} 
              className={`relative group overflow-hidden rounded-[2.5rem] border border-white/5 shadow-2xl transition-all duration-500 ${img.broken ? 'opacity-20 scale-90 blur-sm pointer-events-none' : 'opacity-100'}`}
            >
              <img 
                src={img.url} 
                alt={img.title} 
                onError={() => handleImageError(i)}
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110 object-cover" 
              />
              
              {!img.broken && (
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <span className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-1">Explore</span>
                  <p className="text-white font-black uppercase italic text-2xl tracking-tighter leading-none">
                    {img.title}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Floating Footer Stats */}
        <div className="fixed bottom-8 right-8 bg-zinc-900/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full hidden md:block z-50">
          <p className="text-[10px] font-black uppercase tracking-widest">
            <span className="text-orange-500">{images.filter(img => !img.broken).length}</span> / 30 Moments Loaded
          </p>
        </div>
      </div>
    </main>
  );
};

export default Gallery;