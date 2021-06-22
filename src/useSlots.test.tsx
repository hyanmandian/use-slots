import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { beSlot, useSlots } from '.';

type Props = { children: React.ReactNode };

function Title({ children }: Props) {
  return <h1>{children}</h1>;
}

const SlottedTitle = beSlot(Title, 'title');

function Subtitle({ children }: Props) {
  return <p role="doc-subtitle">{children}</p>;
}

const SlottedSubtitle = beSlot(Subtitle, 'subTitle');

function Action({ children }: Props) {
  return <button>{children}</button>;
}

const SlottedAction = beSlot(Action, 'action');

describe('useSlots', () => {
  it('should return slots', () => {
    const children = [
      <SlottedTitle>Title</SlottedTitle>,
      <SlottedSubtitle>Subtitle</SlottedSubtitle>,
      <SlottedAction>Back</SlottedAction>,
      <SlottedAction>Continue</SlottedAction>,
    ];

    const {
      result: { current },
    } = renderHook(() => useSlots(children));

    expect(current).toHaveProperty('title');
    expect(current.title).toHaveLength(1);

    expect(current).toHaveProperty('subTitle');
    expect(current.subTitle).toHaveLength(1);

    expect(current).toHaveProperty('action');
    expect(current.action).toHaveLength(2);
  });
});
