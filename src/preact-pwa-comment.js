import { html } from '../web_modules/htm/preact.js';
import { hasChildren, css } from './utils.js';


export default function Comment({author, body, depth, replies}) {
    return html`
        <article class="depth-${depth}">
            <h2 class="author">${author}:</h2>
            <p>${body}</p>

            ${replies
                .filter(hasChildren)
                .map(comment => {
                    const { author, depth, body, replies} = comment.data;
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
            )}
        </article>
    `;
}


css`
    article { display: block;}
    .author {
        word-break: break-word;
        font-size: 1em;
        font-weight: 600;
        margin-bottom: 0.5em;
    }

    p {
        word-break: break-word;
        font-weight: 300;
        margin-top: 0;
    }
    
    .depth-0 {margin-left: 0px;}
    .depth-1 {margin-left: 20px;}
    .depth-2 {margin-left: 40px;}
    .depth-3 {margin-left: 60px;}
    .depth-4 {margin-left: 80px;}
`;