import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import InfiniteScroll from './InfiniteScroll/InfiniteScroll';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<InfiniteScroll />, document.getElementById('root'));
registerServiceWorker();
