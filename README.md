<div align="center">
# use-slots

> Slot placement for React.

</div>

## The Problem

When you use [Compound Components Pattern]() you need to guarantee that the children you receive are the same as you expect and these children should follow some order, for example:

```typescript
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

In this case, if you put `ModalHeader`, after `ModalBody` the render result should be wrong, because you depends on order.

## Installation

```bash
npm install --save use-slots
```

## Usage

```typescript
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

## License

(MIT)[./LICENSE]
