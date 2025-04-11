import { useState, useRef } from "preact/hooks";
import ExperienceItem from "./ExperienceItem";
import i18next, { t, changeLanguage } from "i18next";

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
  const experienceRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setShowAll(!showAll);

    // Scroll to the "Experiencia" section when collapsing the list
    if (showAll) {
      const experienciaSection = document.getElementById("experiencia");
      if (experienciaSection)
        experienciaSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
      <div class="flex justify-center mt-4 rounded-full animate-bounce">
        <button
          class={`
            px-4 py-2 hover:scale-110
          dark:text-white text-black rounded 
          dark:border-white/10 border-black/30
          dark:bg-white/5 bg-black/5
          dark:hover:bg-slate-900 hover:bg-black/10
            transition duration-400 ease-in-out
            flex items-center gap-2`}
          onClick={handleToggle}
        >
          <svg
            class={`w-4 h-4 text-black dark:text-gray-300 rtl:rotate-180 transition-transform duration-300 
              ${showAll ? "rotate-270" : "rotate-90"
              }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ExperienceList;