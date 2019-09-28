import { html, render } from './web_modules/htm/preact.js';
import { css } from './src/utils.js';

import AsyncRoute from './web_modules/preact-async-route.js';
import Router from './web_modules/preact-router.js';

css`
    .home-btn {
        text-decoration: none;
        -webkit-box-shadow: 0px 3px 10px 0px rgba(0,0,0,0.5);
        box-shadow: 0px 3px 10px 0px rgba(0,0,0,0.5);
        position: fixed;
        background-color: #9b00ff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        bottom: 20px;
        left: 20px;
    }

    a {
        color: #0077ff;
    }
`;

function App() {
    return html`        
        <${Router}>
            <${AsyncRoute} 
                path="/" 
                getComponent=${ () => import('./src/preact-pwa-search.js').then(module => module.default) }    
            />
            <${AsyncRoute} 
                path="/:subreddit" 
                getComponent=${ () => import('./src/preact-pwa-subreddit.js').then(module => module.default) }    
            />
            <${AsyncRoute} 
                path="/:subreddit/:id/:urlTitle" 
                getComponent=${ () => import('./src/preact-pwa-thread.js').then(module => module.default) }    
            />
            <${AsyncRoute} 
                path="/offline/:subreddit/:id/:urlTitle" 
                getComponent=${ () => import('./src/preact-pwa-thread.js').then(module => module.default) }    
            />
        <//>
        <a class="home-btn" aria-label="Home" href="/">🏠</a>
    `;
}

render(html`<${App} />`, document.body);