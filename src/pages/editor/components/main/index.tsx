import React, {
  forwardRef,
} from 'react';
import { ConnectRC, connect, history } from 'umi';
import './index.less';
const Component: ConnectRC<ContentProps> = ({
  main,
  editor,
  right,
  dispatch,
  refInstance,
}) =>
  // @ts-ignore
  (
    <div >
      111
    </div>
  )
;

const WrapComponent = connect((props: ContentProps) => props)(Component);

export default forwardRef((props, ref) => (
  // @ts-ignore
  <WrapComponent {...props} refInstance={ref} />
));
