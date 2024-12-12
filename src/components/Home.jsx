import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Typewriter } from 'react-simple-typewriter';
import { Fade, Slide, Zoom } from 'react-awesome-reveal';



// Lottie React 
// React-simple-typewriter
// React Awesome reveal 
// React-tooltip


const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchRunningCampaigns = async () => {
      try {
        const response = await fetch('https://react-firebase-mongo-node-server.vercel.app/runningCampaigns?limit=6');
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching running campaigns:', error);
      }
    };
    fetchRunningCampaigns();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`home ${isDarkMode ? 'dark' : ''} overflow-x-hidden`}>
      {/* Theme Toggle Button */}
      <div className="theme-toggle relative top-16 left-2 z-10">
        <button
          onClick={toggleTheme}
          className="p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded shadow-lg transition"
        >
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/* Banner Section */}
      <section className="banner relative">
        <Swiper
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="h-64 sm:h-80 lg:h-[500px]"
        >
          <SwiperSlide>
            <div className="bg-blue-500 dark:bg-blue-800 text-white h-full flex items-center justify-center">
              <Fade>
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold">
                  <Typewriter
                    words={['Welcome to Our Campaign Platform']}
                    loop={false}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={20}
                  />
                </h2>
              </Fade>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-green-500 dark:bg-green-800 text-white h-full flex items-center justify-center">
              <Fade>
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold">
                  <Typewriter
                    words={['Support a Cause That Matters']}
                    loop={false}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={20}
                  />
                </h2>
              </Fade>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-red-500 dark:bg-red-800 text-white h-full flex items-center justify-center">
              <Fade>
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold">
                  <Typewriter
                    words={['Start Your Campaign Today!']}
                    loop={false}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={20}
                  />
                </h2>
              </Fade>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Running Campaigns Section */}
      <section className="running-campaigns py-8 bg-gray-100 dark:bg-gray-900">
        <Slide direction="up">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
            Running Campaigns
          </h2>
        </Slide>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {campaigns.map((campaign) => (
            <Fade key={campaign._id}>
              <div className="card bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded shadow p-4">
    
                <h3 className="text-lg font-bold">{campaign.title}</h3>
                <p className="text-sm">Type: {campaign.type}</p>
                <p className="text-sm">Deadline: {campaign.deadline}</p>
                <Link
                  to={`/details/${campaign._id}`}
                  className="mt-4 inline-block bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-800 transition"
                >
                  See More
                </Link>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works py-8 dark:bg-gray-900">
        <Zoom>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-600">
            <Typewriter
              words={['How It Works']}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={70}
              delaySpeed={1500}
            />
          </h2>
        </Zoom>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
  {['Create Campaign', 'Share Your Campaign', 'Receive Support', 'Achieve Your Goals'].map((step, index) => (
    <Slide direction="up" key={index}>
      <div className="step bg-gray-50 p-6 rounded shadow text-center">
        <div
          className={`icon ${['bg-blue-400', 'bg-green-400', 'bg-orange-400', 'bg-purple-400'][index]} text-white w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4`}
        >
          {index + 1}
        </div>
        <h3 className="text-lg font-bold">{step}</h3>
        <p className="text-sm text-gray-600">Description of {step.toLowerCase()}.</p>
      </div>
    </Slide>
  ))}
</div>

      </section>

      {/* Join Our Community Section */}
      <section className="dark:bg-gray-900 join-community py-8 bg-gradient-to-r text-gray-600">
        <Zoom>
          <div className="container mx-auto text-center px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              <Typewriter
                words={['Join Our Community']}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={100}
                deleteSpeed={70}
                delaySpeed={1500}
              />
            </h2>
            <p className="text-sm sm:text-base max-w-2xl mx-auto mb-6">
              Be a part of a thriving community that supports impactful causes. Whether you want to donate, create a campaign, or volunteer, we welcome you!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {['Sign Up as a Donor', 'Start a Campaign', 'Become a Volunteer'].map((action, index) => (
                <Fade key={index}>
                  <a
                    className="bg-white text-blue-600 px-6 py-2 rounded shadow hover:bg-gray-200 transition"
                  >
                    {action}
                  </a>
                </Fade>
              ))}
            </div>
          </div>
        </Zoom>
      </section>
    </div>
  );
};

export default Home;
