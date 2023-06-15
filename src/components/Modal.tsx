import tw from "tailwind-styled-components";
import ReactModal from "react-modal";
import { FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  title: string;
  open: boolean;
  closeModal: () => void;
  handleSubmit: UseFormHandleSubmit<any>;
  onValid: (data: any) => void;
  onInValid: (errors: FieldErrors) => void;
  registerProps: any[];
  errors: FieldErrors<any>;
}

export function Modal({
  title,
  open,
  closeModal,
  handleSubmit,
  onValid,
  onInValid,
  registerProps,
  errors,
}: ModalProps) {
  const getFirstErrorMessage = () => {
    for (const registerProp of registerProps) {
      if (errors.hasOwnProperty(registerProp.name)) {
        return (
          <ErrorMessage
            errors={errors}
            name={registerProp.name}
            render={({ message }) => <p>{message}</p>}
          />
        );
      }
    }
  };

  return (
    <ModalContainer
      isOpen={open}
      ariaHideApp={false}
      onRequestClose={closeModal}
      shouldCloseOnEsc
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        },
      }}
    >
      <ModalCancelButton onClick={closeModal}>
        <CustomXMarkIcon />
      </ModalCancelButton>
      <ModalForm onSubmit={handleSubmit(onValid, onInValid)} autoComplete="off">
        <ModalTitle>{title}</ModalTitle>
        <ModalContent>
          {registerProps.map((registerProp, index) => {
            if (registerProp.name === "id") return null;
            return (
              <ModalInputRow key={registerProp.name}>
                <ModalInputTitle>
                  {registerProp.name.toUpperCase()}
                </ModalInputTitle>
                <ModalInput {...registerProp} autoFocus={index === 0} />
              </ModalInputRow>
            );
          })}
        </ModalContent>
        <ModalButtonRow>
          <div>{getFirstErrorMessage()}</div>
          <ModalCreateButton type="submit">CONFIRM</ModalCreateButton>
        </ModalButtonRow>
      </ModalForm>
    </ModalContainer>
  );
}

const ModalContainer = tw(ReactModal)`
absolute
top-1/2
left-1/2
-translate-x-1/2
-translate-y-1/2
w-96
min-h-48
m-auto
outline-none
rounded-xl
shadow-xl
bg-slate-300
`;

const ModalForm = tw.form`
w-full
h-full
`;

const ModalTitle = tw.div`
w-full
h-12
flex
justify-center
items-center
bg-slate-400
rounded-tl-xl
rounded-tr-xl
text-md
font-thin
tracking-widest
`;

const ModalContent = tw.div`
w-full
min-h-24
flex
flex-col
px-2
py-8
border-y-2
border-gray-800/5
`;

const ModalInputRow = tw.div`
w-full
h-10
flex
flex-row
items-center
justify-between
text-base
font-medium
p-4
`;

const ModalInputTitle = tw.h1`
text-md
font-thin
tracking-widest
`;

const ModalInput = tw.input`
ring-slate-600
shadow-md
rounded-sm
w-64
`;

const ModalCancelButton = tw.button`
absolute
top-2
right-2
w-8
h-8
flex
items-center
justify-center
rounded-full
hover:bg-slate-600/20
`;

const CustomXMarkIcon = tw(XMarkIcon)`
w-5
h-5
`;

const ModalButtonRow = tw.div`
w-full
h-12
bg-slate-400/30
rounded-br-xl
rounded-bl-xl
flex
flex-row
justify-between
items-center
px-5
text-red-700
`;

const ModalCreateButton = tw.button`
w-20
h-8
rounded-md
shadow-md
text-center
font-thin
text-sm
bg-green-400/10
text-gray-800
`;

export default Modal;
