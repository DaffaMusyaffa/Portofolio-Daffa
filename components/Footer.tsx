import { FaLocationArrow } from 'react-icons/fa6';
import { socialMedia } from '@/data';
import MagicButton from './MagicButton';

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-10 min-h-96">
        <img src="/footer-grid.svg" alt="grid" className="w-full h-full opacity-50 " />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital presence to the next level?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">Reach out to me today and let&apos;s discuss how I can help you achieve your goals.</p>
        {/* Update email dengan email Anda */}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=daffamusyaffa10@gmail.com&su=Project%20Collaboration&body=Hi%20Daffa,%0D%0A%0D%0AI'm%20interested%20in%20discussing%20a%20project%20with%20you.%0D%0A%0D%0ABest%20regards"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            // Fallback ke mailto jika Gmail tidak terbuka
            setTimeout(() => {
              window.location.href = "mailto:daffamusyaffa10@gmail.com?subject=Project%20Collaboration&body=Hi%20Daffa,%0D%0A%0D%0AI'm%20interested%20in%20discussing%20a%20project%20with%20you.%0D%0A%0D%0ABest%20regards";
            }, 500);
          }}
        >
          <MagicButton title="Let's get in touch" icon={<FaLocationArrow />} position="right" />
        </a>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        {/* Update copyright dengan nama Anda */}
        <p className="md:text-base text-sm md:font-normal font-light">Copyright © 2025 Portfolio Muhammad Daffa Musyaffa</p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 hover:bg-opacity-100 transition-all duration-300"
            >
              <img src={info.img} alt="social media icon" width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
