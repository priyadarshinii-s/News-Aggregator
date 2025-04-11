import { Check, ChevronRight, EarthLock, Users, Shield, BarChart } from 'lucide-react';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Background from '../components/Background';

export default function LandingPage() {
  const [animationLoaded, setAnimationLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);


  const getStaggeredDelay = (index) => {
    const baseDelay = 300;
    const staggerAmount = 150;
    return `delay-[${baseDelay + (index * staggerAmount)}ms]`;
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-t from-blue-300 via-blue-200 to-white">
      <Background/>

      <header className={`p-6 relative z-10 transform transition-all duration-700 ease-out ${animationLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
        <div className="text-blue-600 font-bold text-2xl flex items-center ml-10">
          <EarthLock className={`h-8 w-8 mr-2 transition-all duration-1000 ease-out ${animationLoaded ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`} aria-hidden="true" />
          <span className={`transition-all duration-700 ease-out ${animationLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>VNC</span>
        </div>
      </header>

      <main className="flex h-5/6 relative z-10">
        <div className="w-1/2 pl-16 pr-8 flex flex-col justify-center pointer-events-none">
          <h1 className={`text-gray-900 text-7xl font-bold leading-tight mb-6 transform transition-all duration-1000 ease-out ${animationLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
            Discover Your
            <br />
            <span className={`text-blue-600 inline-block transition-all duration-1000 delay-300 ease-out ${animationLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>Perfect News</span>
          </h1>

          <div className={`text-gray-600 text-xl max-w-xl  mb-10 relative transform transition-all duration-700 delay-500 ease-out ${animationLoaded ? 'translate-y-0 opacity-100 before:h-4/5' : 'translate-y-16 opacity-0 before:h-0'
            }`} style={{ transitionProperty: 'transform, opacity' }}>
            Access verified news, check authenticity on the blockchain, and explore reliable content based on community votes. Your entire news world, all in one place.
          </div>

          <Link to="/login" className="w-fit">
            <button
              className={`bg-blue-600 text-white font-bold py-4 px-10 rounded-full w-fit text-lg hover:bg-blue-700 hover:shadow-xl hover:scale-105 shadow-lg shadow-blue-200 flex items-center pointer-events-auto transform transition-all duration-700 delay-700 ease-out ${animationLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
              aria-label="Get started with Verified News Chain"
              style={{ transitionProperty: 'transform, opacity, background-color, box-shadow, scale' }}
            >
              <span>GET STARTED</span>
              <ChevronRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${animationLoaded ? 'translate-x-0' : '-translate-x-4'}`} />
            </button>
          </Link>
        </div>

        <div className={`w-1/2 flex items-center justify-center p-8 transform transition-all duration-1000 delay-300 ease-out ${animationLoaded ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-24 opacity-0 rotate-3'}`}>
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 relative hover:shadow-blue-100 transition-shadow duration-500">
            <div className="absolute -right-12 -top-12 w-24 h-24 bg-blue-500 rounded-full opacity-10 animate-pulse" style={{ animationDuration: '7s' }}></div>
            <div className="absolute -left-10 -bottom-10 w-20 h-20 bg-blue-500 rounded-full opacity-10 animate-pulse" style={{ animationDuration: '9s' }}></div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <EarthLock className={`h-5 w-5 mr-2 transition-all duration-700 ${animationLoaded ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`} aria-hidden="true" />
                <h3 className="font-bold">Verified News Chain</h3>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-b from-gray-50 to-white">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className={`border-b border-gray-100 pb-4 mb-4 hover:bg-blue-50/30 p-3 rounded-lg transform transition-all duration-700 ease-out ${getStaggeredDelay(index)} ${animationLoaded
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-12 opacity-0 scale-95'
                    }`}
                  style={{ transitionProperty: 'transform, opacity, scale, background-color' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-gray-600 text-sm font-medium">
                        {index === 0 ? "The Daily News" : index === 1 ? "Tech Today" : "Business Weekly"}
                      </span>
                      <div className={`ml-2 bg-green-100 text-green-600 rounded-full px-2 py-0.5 text-xs font-medium flex items-center transition-all duration-500 ease-out ${animationLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <Check className="h-3 w-3 mr-1" aria-hidden="true" />
                        Verified
                      </div>
                    </div>
                    <div className={`bg-blue-100 text-blue-600 rounded-full px-2 py-0.5 text-xs font-medium transition-all duration-500 delay-100 ease-out ${animationLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                      {index === 0 ? "92% Reliable" : index === 1 ? "87% Reliable" : "94% Reliable"}
                      <span className="text-xs text-blue-500 ml-1">
                        {index === 0 ? "(2.4k+ votes)" : index === 1 ? "(1.8k+ votes)" : "(3.2k+ votes)"}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-bold text-gray-900 mb-2">
                    {index === 0
                      ? "Global Climate Summit Reaches Historic Agreement"
                      : index === 1
                        ? "AI Breakthrough in Medical Research"
                        : "Markets Rise as Trade Tensions Ease"}
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {index === 0
                      ? "World leaders have reached a consensus on cutting carbon emissions by 50% by 2030..."
                      : index === 1
                        ? "Scientists have developed an AI system capable of predicting disease outcomes..."
                        : "Stock markets worldwide posted gains today as major economies announced progress..."}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="flex items-center">
                      <div
                        className={`h-2 w-2 rounded-full ${index === 0 ? "bg-green-500" : index === 1 ? "bg-blue-500" : "bg-yellow-500"
                          } mr-1`}
                        aria-hidden="true"
                      ></div>
                      <span>{index === 0 ? "2 hours ago" : index === 1 ? "5 hours ago" : "7 hours ago"}</span>
                    </span>
                    <div className="flex items-center space-x-3">
                      <button
                        className="text-green-600 hover:text-green-700 font-medium hover:scale-105 transition-all duration-300"
                        aria-label="Mark as reliable"
                      >✓ Reliable</button>
                      <button
                        className="text-red-500 hover:text-red-600 font-medium hover:scale-105 transition-all duration-300"
                        aria-label="Mark as unreliable"
                      >✕ Unreliable</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}