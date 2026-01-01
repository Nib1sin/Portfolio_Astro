interface Props {
  title: string;
  company: string;
  description: string[];
  link?: string;
  date: string;
}

const ExperienceItem = ({ title, company, description, link, date }: Props) => {
  return (
    <div class="relative mx-12 pb-12 grid before:absolute before:-left-8.75 before:block before:h-full before:border-l-2 before:border-text-gray-800 dark:text-white before:content-[''] md:grid-cols-5 md:gap-10 md:space-x-4]">
      <div class="relative pb-12 md:col-span-2">
        <div class="sticky top-0">
          <span class="text-lime-800 dark:text-red-900 -left-10.5 absolute rounded-full text-5xl">
            &bull;
          </span>
          <h3 class="text-xl font-bold text-lime-800 dark:text-red-400 transition duration-500 hover:scale-110">
            {title}
          </h3>
          <h4 class="font-semibold text-xl text-yellow-800/40 dark:text-white duration-500 hover:scale-110 origin-left">
            {company}
          </h4>
          <time class="p-0 m-0 text-sm text-gray-800 dark:text-white">
            {date}
          </time>
        </div>
      </div>

      <div class="relative flex flex-col gap-2 pb-4 text-gray-300 md:col-span-3">
        {description.map((paragraph) => (
          <p
            key={paragraph}
            class="mt-2 text-gray-600 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-100"
          >
            {paragraph}
          </p>
        ))}
        {link && (
          <a href={link}
          target="_blank"
          rel="noopener noreferrer"
          class="
            inline-flex items-center text-lg font-medium 
            text-lime-800 hover:text-green-700
            dark:text-red-300 dark:hover:text-red-400 
            transition duration-500 ease-in-out
          ">
            {company}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 icon icon-tabler icon-tabler-chevron-right animate-pulse"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24V24H0z" fill="none" />
              <path d="M9 6l6 6-6 6" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

export default ExperienceItem;