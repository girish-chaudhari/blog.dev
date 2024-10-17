import fs from "fs/promises";  // Use async version of fs
import matter from "gray-matter";
import path from "path";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import pLimit from "p-limit";  // Limit concurrency

// Cache to store processed markdown
const cache = new Map<string, string>();

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};


async function getMDXFiles(dir: string): Promise<string[]> {
  const files = await fs.readdir(dir);  // Asynchronously read files
  return files.filter((file) => path.extname(file) === ".mdx");
}

export async function highlightCode(code: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(code);

  return String(file);
}

export async function markdownToHTML(markdown: string): Promise<string> {
  if (cache.has(markdown)) {
    return cache.get(markdown) as string;
  }

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      keepBackground: false,
      transformers: [
        transformerCopyButton({
          visibility: "hover",
          feedbackDuration: 3000,
        }),
      ],
    })
    .use(rehypeStringify)
    .process(markdown);

  const html = result.toString();
  cache.set(markdown, html);  // Cache the processed result
  return html;
}

export async function getPost(slug: string): Promise<{ source: string; metadata: Metadata; slug: string } | null> {
  const filePath = path.join("content", `${slug}.mdx`);
  try {
    const source = await fs.readFile(filePath, "utf-8");
    const { content, data } = matter(source);

    const metadata: Metadata = {
      title: data.title,
      publishedAt: data.publishedAt,
      summary: data.summary,
      image: data.image || null,
    };

    return {
      source: content,
      metadata,
      slug,
    };
  } catch (error) {
    console.error("Error reading file", error);
    return null;  // Explicitly return null when the post is not found or an error occurs
  }
}



async function getAllPosts(dir: string): Promise<{ metadata: Metadata; slug: string; source: string }[]> {
  const mdxFiles = await getMDXFiles(dir);
  const limit = pLimit(5);  // Limit to 5 concurrent promises

  return Promise.all(
    mdxFiles.map((file) =>
      limit(async () => {
        const slug = path.basename(file, path.extname(file));
        const post = await getPost(slug);

        // If getPost returned null, handle it (you could filter out null posts later)
        if (!post) {
          throw new Error(`Post not found: ${slug}`);
        }

        return {
          metadata: post.metadata, // This now uses the correct Metadata type
          slug,
          source: post.source,
        };
      })
    )
  );
}


export async function getBlogPosts(): Promise<{ metadata: Metadata; slug: string; source: string }[]> {
  return getAllPosts(path.join(process.cwd(), "content"));
}
