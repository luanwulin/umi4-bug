import React from 'react';
import { ConnectRC, connect } from 'umi';

import './index.less';

const Component: ConnectRC<ContentProps> = ({ left }) => (
    <div className="editor-left">
      <div className="scroll-wrap">
        11
      </div>
    </div>
);

export default connect((props: ContentProps) => props)(Component);
