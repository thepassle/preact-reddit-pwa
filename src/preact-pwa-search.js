import { html } from '../web_modules/htm/preact.js';
import { useEffect, useState } from '../web_modules/preact/hooks.js';

import { getAllPosts, formatTitle, css } from './utils.js';
import { StorageArea } from 'std:kv-storage';


export default function Search(props) {
    const [subreddit, setSubreddit] = useState('askreddit');
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(async () => {
        const savedPosts = await getAllPosts(new StorageArea('saved-posts').values());
        setSavedPosts(savedPosts);
    }, []);

    const updateSubreddit = e => setSubreddit(e.target.value);

    return html`
        <div class="search-container">
            <label for="search">Find subreddit</label>
            <input onInput=${updateSubreddit} id="search" type="text" value="${subreddit}"/>
            <a class="search-link" href="/${subreddit}">🔎 Search!</a>
        </div>

        ${savedPosts.length > 0
            ? html`<p>Saved posts:</p>
                <ul>
                    ${savedPosts.map(post => { 
                        const {subreddit, id, url, title} = post[0].data.children[0].data;

                        return html`
                            <li>
                                <a href="/offline/${subreddit}/${id}/${formatTitle(url)}">
                                    ${title}
                                </a>
                            </li>
                        `})
                    }
                </ul>`
            : html`<p>No saved posts.</p>`
        }
    `;
}


css`
    .search-container {
        padding-top: 20vh;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .search-container a {
        background-color: #0077ff;
        color: white;
        padding: 0px 10px;
        height: 40px;
        line-height: 40px;
        text-decoration: none;
        border-radius: 5px;
      }

      .search-container a:hover,
      .search-container a:active,
      .search-container a:focus {
        text-decoration: underline;
      }

      input {
        -webkit-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.3);
        box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.3);
        margin: 10px 0px;
        font-size: 1em;
        width: 80%;
        height: 40px;
        border-radius: 10px;
        border: none;
        padding: 0px 10px;
        transition: box-shadow 0.3s ease-in-out;
        transition: -webkit-box-shadow 0.3s ease-in-out;
      }

      input:active, input:focus, input:hover {
        box-shadow: 0px 3px 10px 0px rgba(0,0,0,0.5);
        -webkit-box-shadow: 0px 3px 10px 0px rgba(0,0,0,0.5);
      }
`;