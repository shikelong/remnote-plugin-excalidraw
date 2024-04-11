import { ReactElement, cloneElement } from 'react';
import { useRemId } from '../hooks';

export const RenderIfRemId = ({ children }: { children: ReactElement }) => {
  const remId = useRemId();

  if (remId) {
    console.log('return ele', remId);
    return cloneElement(children, { remId });
  }
  console.log('return null....');
  return null;
};
