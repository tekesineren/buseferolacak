import Header from '@/components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen">
        <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-24 px-8">
          <div className="max-w-[1440px] mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Path to Athletic Excellence
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-8">
              Discover scholarships, NIL opportunities, and mentorship programs tailored for athletes at every level.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                Get Started
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>

        <section className="py-20 px-8 bg-gray-50">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Featured Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Athletic Scholarship {i}</h3>
                      <p className="text-sm text-gray-500">University Program</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Full scholarship opportunity for student athletes with demonstrated excellence in their sport.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-600 font-medium">$25,000/year</span>
                    <span className="text-sm text-gray-500">Deadline: Mar 15</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-8">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              How Ventora Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { step: '01', title: 'Create Your Profile', desc: 'Build your athletic portfolio with stats, achievements, and goals.' },
                { step: '02', title: 'Discover Opportunities', desc: 'Browse thousands of scholarships and NIL deals matched to your profile.' },
                { step: '03', title: 'Apply & Connect', desc: 'Submit applications and connect directly with coaches and sponsors.' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-indigo-100 text-indigo-600 font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-8 bg-indigo-600 text-white">
          <div className="max-w-[1440px] mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of athletes who have found their perfect opportunity through Ventora.
            </p>
            <button className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Create Free Account
            </button>
          </div>
        </section>

        <footer className="py-12 px-8 bg-gray-900 text-gray-400">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div>
                <h4 className="text-white font-semibold mb-4">Platform</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Scholarships</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">NIL Deals</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Mentorship</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Network</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-800 text-center text-sm">
              <p>&copy; 2026 Ventora. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
