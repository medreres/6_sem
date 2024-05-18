import {LazyQueryExecFunction, OperationVariables} from '@apollo/client';

import {Me} from '../../requests/types';

export type UseMeRequest = () => {
  me: LazyQueryExecFunction<Me, OperationVariables>;
};
