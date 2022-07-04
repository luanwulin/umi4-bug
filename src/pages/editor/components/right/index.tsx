import React from 'react';
import { ConnectRC, connect } from 'umi';

import './index.less';

const Component: ConnectRC<ContentProps> = (props: any) => (
    <div className="editor-right">
      111
    </div>
);

export default connect((props: ContentProps) => props)(Component);

export * from './model';
