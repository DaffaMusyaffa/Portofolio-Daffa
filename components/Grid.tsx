import { gridItems } from '@/data';
import { BentoGrid, BentoGridItem } from './ui/BentoGrid';
import Profile from './Profile'; // Import Profile component
import Education from './Education'; // Import Education component
import Experiences from './Experience'; // Import Experience component

const Grid = () => {
  return (
    <section id="about">
      {/* Professional Profile Section */}
      <Profile />

      {/* Professional Education Section */}
      <Education />

      {/* Professional Experience Section */}
      <Experiences />

      {/* Existing BentoGrid */}
      <BentoGrid className="w-full py-20">
        {gridItems.map((item, i) => (
          <BentoGridItem id={item.id} key={i} title={item.title} description={item.description} className={item.className} img={item.img} imgClassName={item.imgClassName} titleClassName={item.titleClassName} spareImg={item.spareImg} />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;
