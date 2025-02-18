export default function SellerProfilePage() {
    return (
      <section className="container flex mx-auto gap-8 px-6 py-10">
          <div className="w-full">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 font-serif">
              Billing Details
            </h1>
            <form className="flex flex-col w-full space-y-2">            
            <label htmlFor="firstname">First name</label>
            <input
              type="text"
              id="firstname"
              placeholder="First name"
              className="w-full border border-dark-brown/20 bg-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green"
            />
            <label htmlFor="lastname">Last name</label>            
             <input
              type="text"
              id="lastname"
              placeholder="Last name"
              className="w-full border border-dark-brown/20 bg-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green"
            />
             <label htmlFor="country-region">Country/Region</label>            
             <input
              type="text"
              id="country-region"
              placeholder="Country"
              className="w-full border border-dark-brown/20 bg-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green"
            />
            <label htmlFor="address">Street address</label>            
             <input
              type="text"
              id="address"
              placeholder="Address"
              className="w-full border border-dark-brown/20 bg-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green"
            />
            <label htmlFor="city">City/Town</label>            
             <input
              type="text"
              id="city"
              placeholder="City"
              className="w-full border border-dark-brown/20 bg-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green"
            />
             <label htmlFor="state">State</label>            
             <input
              type="text"
              id="state"
              placeholder="State"
              className="w-full border border-dark-brown/20 bg-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green"
            />
             <label htmlFor="phone">Phone</label>            
             <input
              type="text"
              id="phone"
              placeholder="Phone"
              className="w-full border border-dark-brown/20 bg-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green"
            />
             <label htmlFor="email">Email</label>            
             <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full border border-dark-brown/20 bg-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green"
            />            
          </form>            
          </div>
          <div className="w-full">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 font-serif">
                Your order              
                </h1>
                <div className="flex items-center justify-between p-1 mb-4 border border-b-black">
                    <span>TOTAL</span>
                    <span>{`$${0.00}`}</span>
                </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 font-serif">
              Payment Method
            </h1>
            <form className="flex flex-col w-full space-y-2">
            <label htmlFor="card-number">Card number</label>
            <input
              type="text"
              id="card-number"
              placeholder="Card number"
              className="w-full border border-dark-brown/20 bg-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green"
            />
            <label htmlFor="expiration">Expiration(MM/YY)</label>            
             <input
              type="text"
              id="expiration"
              placeholder="Expiration date"
              className="w-full border border-dark-brown/20 bg-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green"
            />
             <label htmlFor="card-security-code">Card Security Code</label>            
             <input
              type="text"
              id="card-security-code"
              placeholder="CVN"
              className="w-full border border-dark-brown/20 bg-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-dark-green"
            />
            <button className="bg-dark-green text-white px-4 py-2 rounded w-full hover:bg-light-green hover:text-dark-brown transition-colors">
                PLACE ORDER
            </button>
            </form>
        </div>
  
        
      </section>
    );
  }
  