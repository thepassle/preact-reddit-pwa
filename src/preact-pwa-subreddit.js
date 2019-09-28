import { html } from '../web_modules/htm/preact.js';
import { useEffect, useState } from '../web_modules/preact/hooks.js';
import { formatTitle, css } from './utils.js';

export default function Subreddit({subreddit}) {    
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
        const responseAsJson = await response.json();
        setPosts(responseAsJson.data.children);
    }, []);

    return posts.length
        ? html`
            <h1>${subreddit}</h1>
            <ul class="subreddits">
                ${posts.map(post => html`
                    <li>
                        <h2>
                            <a href="/${post.data.subreddit}/${post.data.id}/${formatTitle(post.data.url)}">${post.data.title}</a>
                        </h2>
                        <span>⬆️${post.data.ups}, by: ${post.data.author}</span>
                    </li>
                `)}
            </ul>`
        : html`Loading...`
}

css`
    h1 {
        font-size: 1.5em;
        font-weight: 600;
        text-transform: lowercase;
        font-weight: 100;
        margin-bottom: 2em;
        color: #6b6b6b;
        text-decoration: underline;
        text-decoration-color: rgb(0, 119, 255);
    }

    .subreddits {
        list-style: none;
        padding-left: 0;
    }

    h2 {
        margin-top: 1.5em;
        margin-bottom: 0.25em;
        font-size: 1em;
        font-weight: 400;
    }

    span {
        font-size: 0.75em;
    }
`;