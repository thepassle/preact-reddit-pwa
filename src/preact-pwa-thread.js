import { html } from '../web_modules/htm/preact.js';
import { useEffect, useState } from '../web_modules/preact/hooks.js';
import { hasChildren, css } from './utils.js';
import { StorageArea } from 'std:kv-storage';

import Comment from './preact-pwa-comment.js';


const savedPosts = new StorageArea("saved-posts");

export default function Thread({id, subreddit, urlTitle, path}) {

    const [{thread, title, comments} = data, setData] = useState({});
    const [postIsSaved, setPostSaved] = useState(false);

    useEffect(async () => {

        let post;
        if(path.includes('offline')) {
            post = await savedPosts.get(id);
        } else {
            const response = await fetch(`https://www.reddit.com/r/${subreddit}/comments/${id}/${urlTitle}.json`);
            post = await response.json();
        }

        setData({
            thread: post,
            title: post[0].data.children[0].data.title,
            comments: post[1].data.children
        })
    }, []);

    useEffect(async () => {
        setPostSaved(typeof await savedPosts.get(id) !== 'undefined');
    }, []);

    async function saveForOffline() {
        await savedPosts.set(id, thread);
        setPostSaved(true);
    }
    
    async function deleteFromStorage() {
        await savedPosts.delete(id);
        setPostSaved(false);
    }

    return thread
        ? html`
            <h1>${title}</h1>

            ${postIsSaved
                ? html`<button class="delete" onClick=${deleteFromStorage}>❌ Delete from storage</button>`
                : html`<button class="save" onClick=${saveForOffline}>💾 Save for offline</button>`
            }

            ${comments
                .filter(hasChildren)
                .map(comment => {
                    const { author, body, depth, replies} = comment.data;
                    const { children } = replies.data;

                    return html`
                        <${Comment}
                            depth=${depth}
                            author=${author}
                            body=${body}
                            replies=${children}>
                        </${Comment}>
                    `;
                }
            )}`
        : html`Loading...`
}


css`
    button {
        padding: 0px 10px;
        height: 40px;
        margin-bottom: 10px;
        line-height: 40px;
        text-decoration: none;
        border-radius: 5px;
        border: none;
        font-size: 1em;
        color: white;
    }

    .save {
        background-color: #0077ff;
    }

    .delete {
        background-color: #ff6262;
    }

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

    h2 {
        margin-top: 1.5em;
        margin-bottom: 0.25em;
        font-size: 1em;
        font-weight: 400;
    }
`;