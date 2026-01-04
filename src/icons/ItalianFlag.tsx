import type { JSX } from "preact";

export default function ItalianFlag(props: JSX.IntrinsicElements["svg"]) {
  return (
    <svg class="w-4 h-auto" {...props} xmlns="http://www.w3.org/2000/svg" 
    width="800" height="800" aria-hidden="true" viewBox="0 0 36 36">
        <path fill="#CE2B37" d="M36 27a4 4 0 0 1-4 4h-8V5h8a4 4 0 0 1 4 4v18z"/>
        <path fill="#009246" d="M4 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h8V5H4z"/><path fill="#EEE" d="M12 5h12v26H12z"/>
    </svg>
  );
}