import { useState } from "preact/hooks";
import ExperienceItem from "./ExperienceItem";

interface Experience {
  date: string;
  title: string;
  company: string;
  description: string[];
  link?: string;
}

interface Props {
  experiences: Experience[];
}

const ExperienceList = ({ experiences }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const sortedExperiences = [...experiences].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const visibleExperiences = showAll ? sortedExperiences : sortedExperiences.slice(0, 1);

  return (
    <div>
      {visibleExperiences.map((experience, index) => (
        <ExperienceItem
          key={experience.date}
          title={experience.title}
          company={experience.company}
          description={experience.description}
          link={experience.link}
          date={experience.date}
        />
      ))}
      <div class="flex justify-center mt-4">
        <button
          class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 flex items-center gap-2"
          onClick={() => setShowAll(!showAll)}
        >
          <span class="text-sm">{showAll ? "Mostrar menos" : "Mostrar más"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class={`w-5 h-5 transition-transform duration-300 ${
              showAll ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ExperienceList;