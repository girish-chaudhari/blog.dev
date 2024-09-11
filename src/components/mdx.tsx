import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props: any) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: any) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

// This replaces rehype-slug
function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: React.ReactNode }) => {
    let slug = slugify(children as string);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Video"
      ></iframe>
    </div>
  );
};

interface ChecklistItem {
  text: string;
  checked: boolean;
}

interface ChecklistProps {
  items: ChecklistItem[];
  readOnly?: boolean;
}

const Checklist: React.FC<ChecklistProps> = ({ items, readOnly = false }) => {
  return (
    <ul className="list-disc pl-5">
      {items.map((item, index) => (
        <li
          key={index}
          className={`flex items-center ${
            readOnly ? "cursor-not-allowed" : ""
          }`}
        >
          <input
            type="checkbox"
            checked={item.checked}
            readOnly={readOnly}
            className="mr-2"
          />
          {item.text}
        </li>
      ))}
    </ul>
  );
};

interface ToggleProps {
  initialOn?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ initialOn = false }) => {
  const [isOn, setIsOn] = useState(initialOn);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className={`px-4 py-2 rounded-md ${
        isOn ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
      }`}
    >
      {isOn ? "On" : "Off"}
    </button>
  );
};

interface TodoProps {
  text: string;
  completed: boolean;
}

const Todo: React.FC<TodoProps> = ({ text, completed }) => {
  return (
    <div
      className={`p-2 ${
        completed ? "bg-green-100" : "bg-yellow-100"
      } border border-gray-300 rounded-md`}
    >
      <p
        className={`${completed ? "line-through text-gray-500" : "text-black"}`}
      >
        {text}
      </p>
    </div>
  );
};

interface NumberedListProps {
  items: string[];
}

const NumberedList: React.FC<NumberedListProps> = ({ items }) => {
  return (
    <ol className="list-decimal pl-5">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ol>
  );
};

interface BulletedListProps {
  items: string[];
}

const BulletedList: React.FC<BulletedListProps> = ({ items }) => {
  return (
    <ul className="list-disc pl-5">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

interface CodeSandboxEmbedProps {
  sandboxId: string;
}

const CodeSandboxEmbed: React.FC<CodeSandboxEmbedProps> = ({ sandboxId }) => {
  return (
    <iframe
      src={`https://codesandbox.io/embed/${sandboxId}?fontsize=14&hidenavigation=1&theme=dark`}
      className="w-full h-[500px] border-none"
      title="CodeSandbox"
    ></iframe>
  );
};

interface TwitterEmbedProps {
  tweetId: string;
}

const TwitterEmbed: React.FC<TwitterEmbedProps> = ({ tweetId }) => {
  return (
    <blockquote className="twitter-tweet">
      <a href={`https://twitter.com/statuses/${tweetId}`}>Tweet</a>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      ></script>
    </blockquote>
  );
};

interface QuoteProps {
  text: string;
  author: string;
}

const Quote: React.FC<QuoteProps> = ({ text, author }) => {
  return (
    <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600">
      <p>"{text}"</p>
      <footer className="mt-2 text-right">— {author}</footer>
    </blockquote>
  );
};

interface EmbedProps {
  url: string;
  title: string;
}

const Embed: React.FC<EmbedProps> = ({ url, title }) => {
  return (
    <div className="w-full h-[500px]">
      <iframe
        src={url}
        className="w-full h-full border-none"
        title={title}
      ></iframe>
    </div>
  );
};

interface ExcalidrawEmbedProps {
  url: string; // The URL of the Excalidraw drawing
}

const ExcalidrawEmbed: React.FC<ExcalidrawEmbedProps> = ({ url }) => {
  return (
    <div className="w-full h-[600px]">
      <iframe
        src={url}
        className="w-full h-full border-none"
        title="Excalidraw Drawing"
        allow="fullscreen"
      ></iframe>
    </div>
  );
};

export const globalComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  Table,
  YouTube: YouTubeEmbed,
  Checklist,
  Toggle,
  Todo,
  NumberedList,
  BulletedList,
  CodeSandbox: CodeSandboxEmbed,
  Tweet: TwitterEmbed,
  Quote,
  Embed,
  Excalidraw: ExcalidrawEmbed,
};
