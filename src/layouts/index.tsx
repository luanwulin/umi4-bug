import React, { Fragment, useEffect } from 'react';

import '@/assets/styles/base.less';

export default (props: {
  children: boolean
  | React.ReactChild
  | React.ReactFragment
  | React.ReactPortal
  | null
  | undefined; }) => {
  useEffect(() => {
    (window as any).MonacoEnvironment = {
      getWorkerUrl(moduleId: string, label: string) {
        let url = '/fe/amis/static/editor.worker.js';

        if (label === 'json') {
          url = '/fe/amis/static/json.worker.js';
        } else if (label === 'css') {
          url = '/fe/amis/static/css.worker.js';
        } else if (label === 'html') {
          url = '/fe/amis/static/html.worker.js';
        } else if (label === 'typescript' || label === 'javascript') {
          url = '/fe/amis/static/ts.worker.js';
        }

        return url;
      },
    };
  }, []);
  return <Fragment>{ props.children }</Fragment>;
};
