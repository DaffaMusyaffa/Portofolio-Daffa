'use client';

import { FaLocationArrow } from 'react-icons/fa6';
import Link from 'next/link';
import { useProjects } from '@/lib/use-projects';
import { PinContainer } from './ui/Pin';

const RecentProjects = () => {
  const projects = useProjects();
  return (
    <div className="py-20">
      <h1 className="heading">
        A small selection of <span className="text-purple">recent projects</span>
      </h1>

      {/* Mobile: Grid 2 kolom, Desktop: Flex wrap */}
      <div className="grid grid-cols-2 gap-4 mt-10 md:hidden p-4">
        {projects.map((item) => (
          <div key={item.id} className="w-full">
            <PinContainer title={item.pinTitle} href={`/projects/${item.slug}`}>
              {/* Card dengan ukuran diperkecil untuk mobile */}
              <div className="relative flex items-center justify-center w-full overflow-hidden h-[15vh] mb-6">
                <div className="relative w-full h-full overflow-hidden rounded-2xl" style={{ backgroundColor: '#13162D' }}>
                  <img src="/bg.png" alt="bgimg" className="w-full h-full object-cover" />
                </div>
                <img src={item.img} alt="cover" className="z-10 absolute inset-0 w-full h-full object-cover object-center rounded-2xl" />
              </div>

              <h1 className="font-bold text-sm line-clamp-1 mb-2">{item.title}</h1>

              <p
                className="font-light text-xs line-clamp-2 mb-4"
                style={{
                  color: '#BEC1DD',
                }}
              >
                {item.des}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {item.iconLists.slice(0, 3).map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black w-6 h-6 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${3 * index + 1}px)`,
                      }}
                    >
                      <img src={icon} alt="icon" className="p-1" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <p className="text-xs text-purple">View</p>
                  <FaLocationArrow className="ms-1 text-xs" color="#CBACF9" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>

      {/* Desktop: Layout original */}
      <div className="hidden md:flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {projects.map((item) => (
          <div className="lg:min-h-[40rem] h-[32rem] flex items-center justify-center sm:w-[28rem] w-[85vw]" key={item.id}>
            <PinContainer title={item.pinTitle} href={`/projects/${item.slug}`}>
              <div className="relative flex items-center justify-center sm:w-[28rem] w-[85vw] overflow-hidden h-[25vh] lg:h-[35vh] mb-10">
                <div className="relative w-full h-full overflow-hidden lg:rounded-3xl" style={{ backgroundColor: '#13162D' }}>
                  <img src="/bg.png" alt="bgimg" className="w-full h-full object-cover" />
                </div>
                <img src={item.img} alt="cover" className="z-10 absolute inset-0 w-full h-full object-cover object-center lg:rounded-3xl" />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">{item.title}</h1>

              <p
                className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                style={{
                  color: '#BEC1DD',
                  margin: '1vh 0',
                }}
              >
                {item.des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <img src={icon} alt="icon5" className="p-2" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <p className="flex lg:text-xl md:text-xs text-sm text-purple">View Details</p>
                  <FaLocationArrow className="ms-3" color="#CBACF9" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>

      {/* View All Projects Button */}
      <div className="flex justify-center mt-16">
        <Link href="/projects" className="px-8 py-4 rounded-xl bg-purple hover:bg-purple/80 text-white font-bold text-lg transition-all duration-300 transform hover:scale-105">
          View All Projects
        </Link>
      </div>
    </div>
  );
};

export default RecentProjects;
