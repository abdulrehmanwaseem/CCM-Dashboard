import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../ui/modal";
import { closeModal } from "@/redux/slice/modal";
import ConfirmationModal from "./ConfirmationModal";
import PatientDetailsModal from "./PatientDetailsModal";
import type { RootState, AppDispatch } from "@/redux/store";
import DiagnosisViewModal from "./DiagnosisViewModal";

const ModalWrapper = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    open,
    modalType,
    MODAL_WIDTH = "max-w-[450px]",
  } = useSelector((state: RootState) => state.modal);

  const handleOpenChange = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      isOpen={open}
      onClose={handleOpenChange}
      className={`${MODAL_WIDTH} p-6 lg:p-8`}
    >
      {checkModal(modalType)}
    </Modal>
  );
};

export default ModalWrapper;

const checkModal = (name: string) => {
  let component = null;
  switch (name) {
    case "confirmation":
      component = <ConfirmationModal />;
      break;
    case "diagnosisView":
      return <DiagnosisViewModal />;
      break;
    case "patientDetails":
      component = <PatientDetailsModal />;
      break;
  }
  return component;
};
