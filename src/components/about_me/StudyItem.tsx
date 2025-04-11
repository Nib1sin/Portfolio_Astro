import type { FunctionalComponent } from "preact";

interface Props {
  title: string;
  school: string;
  description: string[];
  link?: string;
  date: string;
}

const LinkButton: FunctionalComponent<{ href: string }> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener"
    role="link"
    className={`
      inline-flex items-center text-lg font-medium 
      text-lime-800 hover:text-green-700
      dark:text-red-300 dark:hover:text-red-400 
      transition duration-500 ease-in-out
    `}
  >
    {children}
  </a>
);

const StudyItem: FunctionalComponent<Props> = ({ title, school, description, link, date }) => {
  return (
    <li class="mb-10 ms-6">
      <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
        <svg
            className=""
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
            <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
        </svg>
      </span>
      <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white transition duration-500 hover:scale-110 origin-left">
        {title}
      </h3>
      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500 dark:hover:text-red-400 hover:text-red-800">
        {date}
      </time>
      <p className="text-base font-normal text-gray-500 dark:text-gray-400">
        {link && (
          <LinkButton href={link}>
            {school}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 icon icon-tabler icon-tabler-chevron-right"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 6l6 6l-6 6" />
            </svg>
          </LinkButton>
        )}
        {description.map((paragraph, index) => (
          <p
            key={index}
            className="mt-2 text-gray-600 dark:text-gray-400 dark:hover:text-gray-100 hover:text-black"
          >
            {paragraph}
          </p>
        ))}
      </p>
    </li>
  );
};

export default StudyItem;