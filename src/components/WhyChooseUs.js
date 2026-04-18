"use client";

export default function WhyChooseUs() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      title: "Experienced Dermatologists",
      description: "Board-certified dermatologists with 15+ years of experience in treating all skin and hair conditions.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      title: "Advanced Technology",
      description: "State-of-the-art equipment including FDA-approved lasers and advanced diagnostic tools.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Safe & Effective Treatments",
      description: "Clinically proven procedures with minimal downtime and maximum safety protocols.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      title: "Personalized Skin Care",
      description: "Customized treatment plans tailored to your unique skin type, concerns, and goals.",
    },
  ];

  return (
    <section className="py-24 bg-[#F7FAFC]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-2 bg-[#00A651]/10 text-[#00A651] rounded-full text-sm font-semibold mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0B0F19] mb-6">
              Your Trusted Partner in Skin & Hair Care
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              At Healthfusion, we combine expertise with compassion to deliver exceptional dermatological care. Our team of experienced dermatologists and state-of-the-art facilities ensure you receive the best treatment possible.
            </p>
            
            {/* Stats Row */}
            {/* <div className="flex gap-8">
              <div>
                <p className="text-4xl font-bold text-[#00A651]">15+</p>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-[#0077C8]">100k+</p>
                <p className="text-gray-600">Happy Patients</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-[#00A651]">50+</p>
                <p className="text-gray-600">Expert Doctors</p>
              </div>
            </div> */}
          </div>

          {/* Right Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-[#00A651]/10 text-[#00A651] flex items-center justify-center mb-4 group-hover:bg-[#0077C8] group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0B0F19] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
