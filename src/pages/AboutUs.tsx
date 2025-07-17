
const AboutUs = () => {
  return (
    <div className="container mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
      <p className="mb-4">
        Welcome to <strong>Shree Mobile Repair</strong>, your trusted mobile service and repair partner. We provide reliable repairs, genuine parts, and excellent customer support.
      </p>
      <p className="mb-4">
        Our platform allows users to search for mobile brands, view their models, explore part listings, and get detailed information with contact options.
        Admins can add brands, models, and manage inventory via the dashboard.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Our Shops</h2>
      <div className="mb-4">
        <h3 className="font-semibold">Chittorgarh</h3>
        <p>33-Subhash Chowk, New Cloth Market, Near Bharat Gas, Chittorgarh, Rajasthan 312001</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Nimbahera</h3>
        <p>Akrshan Tower, Savant Singh Choraha, Adarsh Nagar, Nimbahera, Rajasthan 312601</p>
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Reach Us</h2>
      <p>We are available for mobile repair queries, part orders, and business inquiries. Contact us through the website, WhatsApp, or by visiting our store locations.</p>
    </div>
  );
};

export default AboutUs;
