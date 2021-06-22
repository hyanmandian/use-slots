import { ReactNode } from 'react';
import flattenChildren from 'react-keyed-flatten-children';

type Slot = { slot: string } & ReactNode;

type Slots = { [key: string]: Slot[] };

export function useSlots(children: ReactNode) {
  return flattenChildren(children).reduce((acc, child) => {
    const slot = (child as any).type?.slot;

    return slot
      ? { ...acc, [slot]: acc[slot] ? [...acc[slot], child] : [child] }
      : acc;
  }, {} as Slots);
}

export function beSlot<T>(Component: T, name: string) {
  ((Component as unknown) as Slot).slot = name;

  return Component;
}
