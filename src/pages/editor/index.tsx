import React, { memo } from 'react';
import { ConnectRC, connect } from 'umi';
import '@/components/amisMaterial';


import './index.less';

const Component: ConnectRC<ContentProps, { id: string }> = ({
  editor,
  main,
  right,
  dispatch,
  match,
}) => {

  return (
    <div>1111</div>
  );
};

export default connect((props: ContentProps) => props)(memo(Component));
