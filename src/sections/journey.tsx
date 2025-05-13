import image1 from '../assets/images/IMG_6694.jpeg'
import image2 from '../assets/images/IMG_6694.jpeg'
import image3 from '../assets/images/IMG_6692.png';
import image4 from '../assets/images/IMG_6691.jpeg';
import image5 from '../assets/images/IMG_6690.jpeg';
import image6 from '../assets/images/IMG_6694.jpeg'
//import image5 from '../assets/images/IMG_6689.PNG';

import { Timeline } from "../components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="mb-6 text-sm text-neutral-800 dark:text-neutral-200">
            Certified in advanced cybersecurity practices including network defense and endpoint protection.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img src={image1} alt="Certificate 2024 - 1" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
            <img src={image2} alt="Certificate 2024 - 2" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <p className="mb-6 text-sm text-neutral-800 dark:text-neutral-200">
            Completed training on cloud security, zero-trust models, and compliance.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img src={image3} alt="Certificate 2023 - 1" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
            <img src={image4} alt="Certificate 2023 - 2" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
    {
      title: "Earlier Certifications",
      content: (
        <div>
          <p className="mb-6 text-sm text-neutral-800 dark:text-neutral-200">
            Foundations in ethical hacking, penetration testing, and secure systems architecture.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img src={image5} alt="Certificate Early - 1" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
            <img src={image6} alt="Certificate Early - 2" className="h-20 w-full rounded-lg object-cover shadow-md md:h-44 lg:h-60" />
          </div>
        </div>
      ),
    },
  ];

  return <Timeline data={data} />;
}
