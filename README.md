<div align="center">
  <h1>use-slots 🧩</h1>
  <p>Slot placement for React</p>
</div>

## The Problem

When you use [Compound Components Pattern](https://kentcdodds.com/blog/compound-components-with-react-hooks) you need to guarantee that the children you receive are the same as you expect and in most cases these children should follow some order, for example:

```jsx
import { Modal, ModalHeader, ModalBody } from "some-react-modal-lib";

export function Prompt() {
  return (
    <Modal>
      <ModalHeader>Content Header</ModalHeader>
      <ModalBody>Content Body<ModalBody>
    </Modal>
  )
}
```

In this case, if you put `ModalHeader`, after `ModalBody` the render result could be wrong because it depends on the order.

## Installation

```bash
npm install --save use-slots
```

## Usage

```jsx
// import these functions
import { beSlot, useSlots } from "use-slots";

// create your component as usual
function ModalHeader({ children }) {
  return <header>{children}</header>;
}

// enhance your component with beSlot giving a name for your slot
const SlottedModalHeader = beSlot(ModalHeader, "modalHeader");

function ModalBody({ children }) {
  return <div>{children}</div>;
}

const SlottedModalBody = beSlot(ModalBody, "modalBody");

function Modal({ children }) {
  // pass children to useSlots hook and use returned object instead of children
  const slots = useSlots(children);

  return (
    <dialog>
      {slots.modalHeader}
      {slots.modalBody}
    </dialog>
  );
}
```

You can also combine `use-slots` with [tiny-invariant](https://github.com/alexreardon/tiny-invariant) to provide descriptive errors in development. In this example we presume that `ModalHeader` is optional and `ModalBody` is required.

```jsx
import invariant from "tiny-invariant";

function Modal({ children }) {
  const slots = useSlots(children);

  invariant(!slots.modalBody, "You should pass ModalBody as a children.");

  return (
    <dialog>
      {slots.modalHeader ? slots.modalHeader : null}
      {slots.modalBody}
    </dialog>
  );
}
```

## License

[MIT](./LICENSE)
