import { ReactElement, cloneElement } from 'react';
import { useRemId } from '../hooks';

export const RenderIfRemId = ({ children }: { children: ReactElement }) => {
  const remId = useRemId();

  if (remId) {
    return cloneElement(children, { remId });
  }
  return null;
};
