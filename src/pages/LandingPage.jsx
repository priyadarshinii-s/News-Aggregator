import { Check, ChevronRight, EarthLock, Users, Shield, BarChart } from 'lucide-react';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [animationLoaded, setAnimationLoaded] = useState(false);
  
  useEffect(() => {
    // Trigger animations after component mount
    setAnimationLoaded(true);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-t from-blue-300 via-blue-200 to-white">
      {/* Background graphic element for visual interest */}
      <div className="absolute top-40 right-20 w-64 h-64 bg-blue-400 rounded-full opacity-5"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-blue-400 rounded-full opacity-5"></div>

      <header className={`p-6 relative z-10 transform transition-all duration-700 ${animationLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="text-blue-600 font-bold text-2xl flex items-center ml-10">
          <EarthLock className="h-8 w-8 mr-2" aria-hidden="true" />
          <span>VNC</span>
        </div>
      </header>

      <main className="flex h-5/6 relative z-10">
        <div className="w-1/2 pl-16 pr-8 flex flex-col justify-center pointer-events-none">
          <h1 className={`text-gray-900 text-7xl font-bold leading-tight mb-6 transform transition-all duration-700 delay-300 ${animationLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
            Discover Your
            <br />
            <span className="text-blue-600">Perfect News</span>
          </h1>

          <div className={`text-gray-600 text-xl max-w-xl pl-4 mb-10 relative before:content-[''] before:absolute before:left-0 before:top-2 before:h-4/5 before:w-[4px] before:bg-gradient-to-b before:from-blue-500 before:to-transparent before:rounded-[3px] transform transition-all duration-700 delay-500 ${animationLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
            Access verified news, check authenticity on the blockchain, and explore reliable content based on community votes. Your entire news world, all in one place.
          </div>

          <Link to="/login" className="w-fit">
            <button
              className={`bg-blue-600 text-white font-bold py-4 px-10 rounded-full w-fit text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center pointer-events-auto transform transition-all duration-700 delay-700 ${animationLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
              aria-label="Get started with Verified News Chain"
            >
              GET STARTED
            </button>
          </Link>
        </div>

        <div className={`w-1/2 flex items-center justify-center p-8 transform transition-all duration-1000 delay-300 ${animationLoaded ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 relative">
            <div className="absolute -right-12 -top-12 w-24 h-24 bg-blue-500 rounded-full opacity-10"></div>
            <div className="absolute -left-10 -bottom-10 w-20 h-20 bg-blue-500 rounded-full opacity-10"></div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <EarthLock className="h-5 w-5 mr-2" aria-hidden="true" />
                <h3 className="font-bold">Verified News Chain</h3>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-b from-gray-50 to-white">
              <div className={`border-b border-gray-100 pb-4 mb-4 hover:bg-blue-50/30 p-3 rounded-lg transform transition-all duration-700 delay-500 ${animationLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-gray-600 text-sm font-medium">The Daily News</span>
                    <div className="ml-2 bg-green-100 text-green-600 rounded-full px-2 py-0.5 text-xs font-medium flex items-center">
                      <Check className="h-3 w-3 mr-1" aria-hidden="true" />
                      Verified
                    </div>
                  </div>
                  <div className="bg-blue-100 text-blue-600 rounded-full px-2 py-0.5 text-xs font-medium">
                    92% Reliable
                    <span className="text-xs text-blue-500 ml-1" title="Based on 2,462 community votes">
                      (2.4k+ votes)
                    </span>
                  </div>
                </div>

                <h4 className="font-bold text-gray-900 mb-2">Global Climate Summit Reaches Historic Agreement</h4>
                <p className="text-gray-600 text-sm mb-2">
                  World leaders have reached a consensus on cutting carbon emissions by 50% by 2030...
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-1" aria-hidden="true"></div>
                    <span>2 hours ago</span>
                  </span>
                  <div className="flex items-center space-x-3">
                    <button
                      className="text-green-600 hover:text-green-700 font-medium"
                      aria-label="Mark as reliable"
                    >✓ Reliable</button>
                    <button
                      className="text-red-500 hover:text-red-600 font-medium"
                      aria-label="Mark as unreliable"
                    >✕ Unreliable</button>
                  </div>
                </div>
              </div>

              <div className={`border-b border-gray-100 pb-4 mb-4 hover:bg-blue-50/30 p-3 rounded-lg transform transition-all duration-700 delay-700 ${animationLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-gray-600 text-sm font-medium">Tech Today</span>
                    <div className="ml-2 bg-green-100 text-green-600 rounded-full px-2 py-0.5 text-xs font-medium flex items-center">
                      <Check className="h-3 w-3 mr-1" aria-hidden="true" />
                      Verified
                    </div>
                  </div>
                  <div className="bg-blue-100 text-blue-600 rounded-full px-2 py-0.5 text-xs font-medium">
                    87% Reliable
                    <span className="text-xs text-blue-500 ml-1" title="Based on 1,835 community votes">
                      (1.8k+ votes)
                    </span>
                  </div>
                </div>

                <h4 className="font-bold text-gray-900 mb-2">AI Breakthrough in Medical Research</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Scientists have developed an AI system capable of predicting disease outcomes...
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mr-1" aria-hidden="true"></div>
                    <span>5 hours ago</span>
                  </span>
                  <div className="flex items-center space-x-3">
                    <button
                      className="text-green-600 hover:text-green-700 font-medium"
                      aria-label="Mark as reliable"
                    >✓ Reliable</button>
                    <button
                      className="text-red-500 hover:text-red-600 font-medium"
                      aria-label="Mark as unreliable"
                    >✕ Unreliable</button>
                  </div>
                </div>
              </div>

              <div className={`border-b border-gray-100 pb-4 mb-4 hover:bg-blue-50/30 p-3 rounded-lg transform transition-all duration-700 delay-400 ${animationLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-gray-600 text-sm font-medium">Business Weekly</span>
                    <div className="ml-2 bg-green-100 text-green-600 rounded-full px-2 py-0.5 text-xs font-medium flex items-center">
                      <Check className="h-3 w-3 mr-1" aria-hidden="true" />
                      Verified
                    </div>
                  </div>
                  <div className="bg-blue-100 text-blue-600 rounded-full px-2 py-0.5 text-xs font-medium">
                    94% Reliable
                    <span className="text-xs text-blue-500 ml-1" title="Based on 3,217 community votes">
                      (3.2k+ votes)
                    </span>
                  </div>
                </div>

                <h4 className="font-bold text-gray-900 mb-2">Markets Rise as Trade Tensions Ease</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Stock markets worldwide posted gains today as major economies announced progress...
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-yellow-500 mr-1" aria-hidden="true"></div>
                    <span>7 hours ago</span>
                  </span>
                  <div className="flex items-center space-x-3">
                    <button
                      className="text-green-600 hover:text-green-700 font-medium"
                      aria-label="Mark as reliable"
                    >✓ Reliable</button>
                    <button
                      className="text-red-500 hover:text-red-600 font-medium"
                      aria-label="Mark as unreliable"
                    >✕ Unreliable</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}