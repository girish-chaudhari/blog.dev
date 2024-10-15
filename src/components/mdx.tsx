// "use client";

import clsx from "clsx";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import rehypePrettyCode from "rehype-pretty-code";
import remarkRehype from "remark-rehype";
import { CopyToClipboard } from "./copy-button";
import { LiveCode } from "./sandpack";
import { TweetComponent } from "./tweet";
import TwitterEmbed from "./react-tweet";
// import { Tabs, TabsContent, TabsList } from "./ui/tabs";

import { Tab, Tabs } from "./CodeTabs";

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
				},
			children,
		),
			],
			// children,
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
		<ul className="list-none p-0">
			{items.map((item, index) => (
				<li key={index} className="flex items-center space-x-2">
					<input
						type="checkbox"
						checked={item.checked}
						readOnly={readOnly}
						className="mr-2"
					/>
					<span className={item.checked ? "line-through text-gray-500" : ""}>
						{item.text}
					</span>{" "}
				</li>
			))}
		</ul>
	);
};

interface ToggleProps {
	initialOn?: boolean;
}

// const Toggle: React.FC<ToggleProps> = ({ initialOn = false }) => {
//   const [isOn, setIsOn] = useState(initialOn);

//   return (
//     <button
//       onClick={() => setIsOn(!isOn)}
//       className={`px-4 py-2 rounded-md ${
//         isOn ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
//       }`}
//     >
//       {isOn ? "On" : "Off"}
//     </button>
//   );
// };

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

interface ReminderProps {
	children: ReactNode; // The URL of the Excalidraw drawing
}

const Reminder: React.FC<ReminderProps> = ({ children }) => {
	return (
		<div className="border-2 border-red-400 p-4 rounded-lg bg-red-100 text-red-600 font-bold mt-5">
			{children}
		</div>
	);
};

interface CalloutProps {
	emoji: React.ReactNode;
	children: React.ReactNode;
}

const Callout: React.FC<CalloutProps> = ({ emoji, children }) => {
	return (
		<div className="px-4 py-3 border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm flex items-center text-neutral-900 dark:text-neutral-100 mb-8">
			<div className="flex items-center w-4 mr-4">{emoji}</div>
			<div className="w-full callout">{children}</div>
		</div>
	);
};

interface ProsConsCardProps {
	title: string;
	pros: string[];
}

const ProsCard: React.FC<ProsConsCardProps> = ({ title, pros }) => {
	return (
		<div className="border border-emerald-200 dark:border-emerald-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 my-4 w-full">
			<span>{`You might use ${title} if...`}</span>
			<div className="mt-4">
				{pros.map((pro) => (
					<div key={pro} className="flex font-medium items-baseline mb-2">
						<div className="h-4 w-4 mr-2">
							<svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24">
								<g
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
									<path d="M22 4L12 14.01l-3-3" />
								</g>
							</svg>
						</div>
						<span>{pro}</span>
					</div>
				))}
			</div>
		</div>
	);
};

interface ConsCardProps {
	title: string;
	cons: string[];
}

const ConsCard: React.FC<ConsCardProps> = ({ title, cons }) => {
	return (
		<div className="border border-red-200 dark:border-red-900 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-6 my-6 w-full">
			<span>{`You might not use ${title} if...`}</span>
			<div className="mt-4">
				{cons.map((con) => (
					<div key={con} className="flex font-medium items-baseline mb-2">
						<div className="h-4 w-4 mr-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="h-4 w-4 text-red-500"
							>
								<path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
							</svg>
						</div>
						<span>{con}</span>
					</div>
				))}
			</div>
		</div>
	);
};


interface IPre {
  children: React.ReactElement;
  theme?: string;
  showLineNumbers?: boolean;
  filename?: string; // Adding the filename prop
}

export const Pre: React.FC<IPre> = ({
  children,
  theme = "default", // Default theme if none is provided
  showLineNumbers = false, // Default to no line numbers
  filename, // Optional filename
  ...props
}) => {
  return (
    <div className="code-block-container">
      {/* {title && <div className="code-block-header">{title}</div>} */}
      <CopyToClipboard>
        <pre
          className={`px-4 py-3 overflow-x-auto rounded-lg font-jetbrains ${
            theme ? `${theme}-theme` : "bg-syntaxBg"
          } ${showLineNumbers ? "line-numbers" : ""}`}
          {...props}
        >
          {children}
        </pre>
      </CopyToClipboard>
    </div>
  );
};
interface VideoProps  {
src: ""
} 

const Video: React.FC<VideoProps> = ({src = ""}) => {
	return (
		<div>
			<video  width="100%" controls>
				<source src={src} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		</div>
	);
};

// const TabsComponent = ({ }) => {
// 	return <>
// 	<Tabs defaultValue="account" className="w-[400px]">
//   <TabsList>
//     <TabsTrigger value="account">Account</TabsTrigger>
//     <TabsTrigger value="password">Password</TabsTrigger>
//   </TabsList>
//   <TabsContent value="account">Make changes to your account here.</TabsContent>
//   <TabsContent value="password">Change your password here.</TabsContent>
// </Tabs></>
// }

interface TabsItemsProps {
	label:string,
	children: React.ReactNode
}

// const TabsItemComponent = ({
// 	label, children
// }) => {
// 	return (
// 		<>
// 		<TabsList>
//     <TabsTrigger value="account">Account</TabsTrigger>
//     <TabsTrigger value="password">Password</TabsTrigger>
//   </TabsList>
//   <TabsContent value="account">Make changes to your account here.</TabsContent>
//   <TabsContent value="password">Change your password here.</TabsContent>
// 	</>
// 	)
// }

export const globalComponents = {
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	Image: RoundedImage,
	a: CustomLink,
	pre: Pre,
	Callout,
	ProsCard,
	ConsCard,
	Table,
	LiveCode,
	StaticTweet: TweetComponent,
	YouTube: YouTubeEmbed,
	Checklist,
	Video,
	// Tabs,
	// TabItem: TabsItemComponent,
Tab,
Tabs,
	// Tabs,
	// TabsList,
	// TabsContent,
	// Toggle,
	Todo,
	NumberedList,
	BulletedList,
	CodeSandbox: CodeSandboxEmbed,
	Tweet: TwitterEmbed,
	Quote,
	Embed,
	Excalidraw: ExcalidrawEmbed,
	Reminder,
};

export default function CustomMDX({ source }: any) {
	return (
		<div>
			<MDXRemote
				source={source}
				components={{ ...globalComponents } as any}
				options={{
					mdxOptions: {
						rehypePlugins: [
							remarkRehype,
							[
								rehypePrettyCode,
								{
									// https://rehype-pretty.pages.dev/#usage
									theme: "github-dark",
									keepBackground: false,
									filterMetaString: (string:string) => string.replace(/filename="[^"]*"/, ""),
									// filterMetaString: (string: string) =>
									// 	string.replace(/filename="[^"]*"/, ""),
								},
							],
						],
					},
				}}
			/>
		</div>
	);
}
