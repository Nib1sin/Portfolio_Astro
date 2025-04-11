import { useState, useRef } from "preact/hooks";
import StudyItem from "./StudyItem";

interface Study {
  title: string
  school: string
  description: string[]
  link?: string
  date: string
}

interface Props {
    studies: Study[];
}

const StudyList = ({ studies }: Props ) => {
    const [showAll, setShowAll] = useState(false)
    const sortedStudies = [...studies].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    const visibleStudies = showAll ? sortedStudies : sortedStudies.slice(0, 1)
    const handleToggle = () => {
        setShowAll(!showAll)
    
        // Scroll to the "Experiencia" section when collapsing the list
        if (showAll) {
        const experienciaSection = document.getElementById("sobre-mi")
        if (experienciaSection)
            experienciaSection.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    };

    return (
        <ol class="relative border-s border-gray-200 dark:border-gray-700">
        {visibleStudies.map((study, index) => (
          <StudyItem
            key={study.date}
            title={study.title}
            school={study.school}
            description={study.description}
            link={study.link}
            date={study.date}
          />
        ))}
        <div class="flex justify-center mt-4 rounded-full animate-bounce">
          <button
            class={`px-4 py-2 hover:scale-110
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
        </ol>
    );
}

export default StudyList;
