"use client";

import { useTheme } from 'next-themes';
import React from 'react';

interface TwitterEmbedProps {
	tweetId: string;
}


const TwitterEmbed: React.FC<TwitterEmbedProps> = ({ tweetId }) => {
	const {theme} = useTheme()
	return (
		<blockquote className="twitter-tweet"
		data-theme={theme === 'dark' ? 'dark' : 'light'}
		>
			<a href={`https://twitter.com/statuses/${tweetId}`}>Tweet</a>
			<script
				async
				src="https://platform.twitter.com/widgets.js"
				charSet="utf-8"
			></script>
		</blockquote>
	);
};

export default TwitterEmbed;