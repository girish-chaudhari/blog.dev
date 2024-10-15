"use client";

import clsx from "clsx";
import { Check, Copy } from "lucide-react";
import React from "react";

interface ICopyToClipboard {
	children: React.ReactNode;
}

export const CopyToClipboard = ({ children }: ICopyToClipboard) => {
	const textInput = React.useRef<HTMLDivElement>(null);
	const [hovered, setHovered] = React.useState(false);
	const [copied, setCopied] = React.useState(false);

	const onEnter = () => {
		setHovered(true);
	};

	const onExit = () => {
		setHovered(false);
		setCopied(false);
	};

	const onCopy = () => {
		setCopied(true);
		if (textInput.current !== null && textInput.current.textContent !== null)
			navigator.clipboard.writeText(textInput.current.textContent);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	return (
		<div
			ref={textInput}
			onMouseEnter={onEnter}
			onMouseLeave={onExit}
			className="relative code-block"
		>
			{hovered && (
				<button
					aria-label="Copy code"
					type="button"
					className={clsx(
						"absolute right-2 top-2 w-8 h-8 p-1.5 rounded bg-gray-700 dark:bg-gray-800 z-10",
						// {
							
						// 	"hover:border-gray-300": !copied,
						// },
					)}
					onClick={onCopy}
				>
					{copied ? (
						<Check className={clsx("h-5 w-5 text-green-400", {
              "":
								copied,
            })} />
					) : (
						<>
							<Copy className="h-5 w-5 text-slate-300" /> 
						</>
					)}
				</button>
			)}
			{children}
		</div>
	);
};
