'use client';

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-amber-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

const reviews = [
  {
    stars: 5,
    text: "I used to spend 30–45 minutes creating invoices in Canva every single time. With Invoice Builda I just typed what I did for my client and it filled everything automatically. Downloaded the PDF in under a minute. My clients actually comment on how professional my invoices look now.",
    name: "Adaeze O.",
    role: "Freelance Graphic Designer, Lagos",
    initials: "AO",
    avatarColor: "bg-purple-100 text-purple-700"
  },
  {
    stars: 5,
    text: "Tried three other invoice tools before this one. They all wanted me to create an account, verify my email, set up a profile — before I could even see what the product looked like. Invoice Builda just works. Open it, describe your project, download. That's it.",
    name: "James Whitfield",
    role: "Web Developer, Manchester",
    initials: "JW",
    avatarColor: "bg-blue-100 text-blue-700"
  },
  {
    stars: 4,
    text: "English is my second language so filling invoice forms was always stressful — I worried about getting the wording wrong. Now I just describe the order in simple English and the AI writes it properly for me. The Bold template is my favourite, very clean.",
    name: "Fatima Al-Rashid",
    role: "E-commerce Seller, Dubai",
    initials: "FA",
    avatarColor: "bg-rose-100 text-rose-700"
  },
  {
    stars: 5,
    text: "I invoice 8–10 clients every month. Before this I was copy-pasting an old Word template and manually changing the numbers every time — and still making errors. Now I do all 10 invoices in one afternoon. The fact that it works perfectly on my phone is the best part.",
    name: "Kwame Asante",
    role: "Marketing Consultant, Accra",
    initials: "KA",
    avatarColor: "bg-green-100 text-green-700"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Proof Bar */}
        <div className="grid grid-cols-2 md:flex md:flex-row md:justify-center md:items-center gap-8 md:gap-0 mb-16 md:mb-24">
          <div className="text-center md:px-12 md:border-r border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-1">2,400+</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide">Invoices Created</div>
          </div>
          <div className="text-center md:px-12 md:border-r border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-1">18</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide">Countries</div>
          </div>
          <div className="text-center col-span-2 md:col-span-1 md:px-12">
            <div className="text-3xl font-bold text-blue-600 mb-1">4.8/5</div>
            <div className="text-sm text-gray-500 uppercase tracking-wide">Average Rating</div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by freelancers and businesses worldwide</h2>
          <p className="text-lg text-gray-600">Real people. Real invoices. Real results.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition duration-200 p-6 md:p-8 flex flex-col">
              <div className="mb-4">
                <StarRating count={review.stars} />
              </div>
              <p className="text-gray-700 text-base leading-relaxed italic flex-1 mb-6">
                &quot;{review.text}&quot;
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${review.avatarColor}`}>
                  {review.initials}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{review.name}</div>
                  <div className="text-sm text-gray-400">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
