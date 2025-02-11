// app/dashboard/seller/[acct_id]/page
// Seller Profile Page
// Landing page for sellers when signed in

export default function SellerProfilePage() {
    return (
      <section className="container mx-auto px-6 py-10">
        {/* Top section with image & text */}
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left: Large image placeholder */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="bg-light-brown w-full h-64 md:h-80 flex items-center justify-center">
              <span className="text-white">Image Placeholder</span>
            </div>
          </div>
  
          {/* Right: Heading, subheading, body text */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 font-serif">
              Seller Name
            </h1>
            <h2 className="text-lg text-dark-brown/70 mb-4">
              Subheading
            </h2>
            <p className="mb-4 leading-relaxed">
              Excepteur efficient emerging, minim veniam anim aute carefully
              curated Ginza conversation exquisite perfect nostrud nisi
              intricate Content. Qui international first-class nulla ut.
              Punctual adipliscing, essential lovely queen tempor eiusmod
              irure. Exclusive izakaya charming Scandinavian impeccable aute
              quality of life soft power pariatur Melbourne.
            </p>
            <p className="leading-relaxed">
              Discerning. Qui wardrobe aliquid, et Porter destination Toto
              remarkable officia Helsinki excepteur Basset hound. Zürich
              sleepy perfect consectetur.
            </p>
          </div>
        </div>
  
        {/* Search & Filter Bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center gap-4">
          {/* Search input */}
          <div className="flex items-center w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search"
              className="flex-grow border border-dark-brown/20 bg-white px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-dark-green"
            />
            <button className="bg-dark-green text-white px-4 py-2 rounded-r hover:bg-light-green hover:text-dark-brown transition-colors">
              Search
    
            </button>
          </div>
  
          {/* Filter buttons */}
          <div className="flex items-center gap-2">
            <button className="bg-dark-brown text-cream px-3 py-2 rounded hover:bg-light-brown hover:text-white transition-colors">
              New
            </button>
            <button className="border border-dark-brown px-3 py-2 rounded hover:bg-dark-brown hover:text-cream transition-colors">
              Price ascending
            </button>
            <button className="border border-dark-brown px-3 py-2 rounded hover:bg-dark-brown hover:text-cream transition-colors">
              Price descending
            </button>
            <button className="border border-dark-brown px-3 py-2 rounded hover:bg-dark-brown hover:text-cream transition-colors">
              Rating
            </button>
          </div>
        </div>
  
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {/* Example Card #1 */}
          <div className="bg-light-brown h-52 flex flex-col items-center justify-center p-4">
            <span className="text-dark-brown font-semibold mb-2">Item</span>
            <span className="text-dark-brown">$0</span>
          </div>
  
          {/* Example Card #2 */}
          <div className="bg-light-brown h-52 flex flex-col items-center justify-center p-4">
            <span className="text-dark-brown font-semibold mb-2">Item</span>
            <span className="text-dark-brown">$0</span>
          </div>
  
          {/* Example Card #3 */}
          <div className="bg-light-brown h-52 flex flex-col items-center justify-center p-4">
            <span className="text-dark-brown font-semibold mb-2">Item</span>
            <span className="text-dark-brown">$0</span>
          </div>
  
          {/* Example Card #4 */}
          <div className="bg-light-brown h-52 flex flex-col items-center justify-center p-4">
            <span className="text-dark-brown font-semibold mb-2">Item</span>
            <span className="text-dark-brown">$0</span>
          </div>
  
          {/* Add more product cards if needed */}
        </div>
      </section>
    );
  }
  