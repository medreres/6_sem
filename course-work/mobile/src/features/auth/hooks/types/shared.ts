import {RegisterOptions} from 'react-hook-form';

export type FieldRule<Field extends string = ''> = Omit<
  RegisterOptions<Record<string, any>, Field>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;
