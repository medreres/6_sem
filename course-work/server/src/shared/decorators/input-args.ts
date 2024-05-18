import { Args } from '@nestjs/graphql';

interface InputDecoratorParams {
  type?: () => any;
}
export const InputArgs = (params?: InputDecoratorParams) =>
  Args({ name: 'input', type: params?.type || (() => String) });
