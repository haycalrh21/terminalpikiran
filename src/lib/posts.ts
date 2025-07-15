export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string; // Added imageUrl
}

const posts: Post[] = [
  {
    slug: "first-blog-post",
    title: "The Journey Begins: My First Blog Post",
    excerpt:
      "A warm welcome to my new blog! In this inaugural post, I share my motivations and what you can expect from future content.",
    content: `
      <p>Welcome, dear readers, to the very first entry on my new blog! I'm incredibly excited to embark on this journey with all of you. For a long time, I've wanted a space to share my thoughts, experiences, and insights on various topics that I'm passionate about.</p>
      <p>This blog will be a melting pot of ideas, ranging from technology and programming to personal development, creative writing, and perhaps even some musings on daily life.</p>
      <p>I believe that sharing knowledge and perspectives is a powerful way to learn and grow, both for the writer and the reader. I encourage you to participate in the comments, share your own views, and let's build a vibrant community together.</p>
      <p>Thank you for joining me at the beginning of this adventure. I look forward to many more posts and discussions with you all!</p>
    `,
    author: "John Doe",
    date: "July 14, 2025",
    imageUrl: "/placeholder.svg?height=400&width=600", // Placeholder image
  },
  {
    slug: "understanding-react-hooks",
    title: "Demystifying React Hooks: A Practical Guide",
    excerpt:
      "React Hooks revolutionized functional components. This guide breaks down the most common hooks with practical examples.",
    content: `
      <p>React Hooks have fundamentally changed how we write React components, allowing us to use state and other React features in functional components without writing a class. This has led to cleaner, more readable, and often more performant code.</p>
      <h2>useState</h2>
      <p>The <code>useState</code> hook allows you to add state to functional components. It returns a pair: the current state value and a function that lets you update it.</p>
      <pre><code>import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
      <h2>useEffect</h2>
      <p>The <code>useEffect</code> hook lets you perform side effects in functional components. It's a close replacement for <code>componentDidMount</code>, <code>componentDidUpdate</code>, and <code>componentWillUnmount</code>.</p>
      <pre><code>import React, { useState, useEffect } from 'react';

function TitleUpdater() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  }, [count]); // Only re-run if count changes

  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</code></pre>
      <p>There are many more hooks like <code>useContext</code>, <code>useReducer</code>, <code>useCallback</code>, and <code>useMemo</code>, each serving a specific purpose to make your React development more efficient and enjoyable.</p>
    `,
    author: "Jane Smith",
    date: "August 1, 2025",
    imageUrl: "/placeholder.svg?height=400&width=600", // Placeholder image
  },
  {
    slug: "css-grid-vs-flexbox",
    title: "CSS Grid vs. Flexbox: When to Use Which?",
    excerpt:
      "Confused about CSS Grid and Flexbox? This post clarifies their strengths and helps you decide the best tool for your layout needs.",
    content: `
      <p>CSS Grid and Flexbox are both powerful layout modules in CSS, but they are designed for different purposes. Understanding when to use each is key to building robust and responsive web designs.</p>
      <h2>Flexbox: One-Dimensional Layout</h2>
      <p>Flexbox is ideal for laying out items in a single dimension—either a row or a column. It excels at distributing space among items in a container and aligning them.</p>
      <p>Use Flexbox for:</p>
      <ul>
        <li>Navigation bars</li>
        <li>Components with dynamic content alignment</li>
        <li>Distributing items evenly within a single line</li>
      </ul>
      <h2>CSS Grid: Two-Dimensional Layout</h2>
      <p>CSS Grid is designed for two-dimensional layouts, meaning it can handle both rows and columns simultaneously. It's perfect for creating complex page layouts.</p>
      <p>Use CSS Grid for:</p>
      <ul>
        <li>Overall page layouts (header, sidebar, main content, footer)</li>
        <li>Complex component layouts that require precise positioning in both dimensions</li>
        <li>Creating responsive designs with explicit grid areas</li>
      </ul>
      <p>In many modern web applications, you'll find yourself using both. Grid for the macro layout of the page, and Flexbox for the micro layout of elements within those grid areas.</p>
    `,
    author: "Alice Johnson",
    date: "August 15, 2025",
    imageUrl: "/placeholder.svg?height=400&width=600", // Placeholder image
  },
];

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPostSlugs(): string[] {
  return posts.map((post) => post.slug);
}
