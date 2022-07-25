import { useDispatch } from "react-redux"
import { ButtonWithConfirmationModal } from "../../../common/ButtonWithConfirmationModal";
import { repair } from "../state/tournamentSlice";

export const RepairButton = () => {
  const dispatch = useDispatch();

  return (
    <ButtonWithConfirmationModal
      modalTitle="Are you sure you want to repair the round?"
      modalContent="Repairing loses all match data and reverts to the beginning of the round."
      onClick={() => dispatch(repair())}
    >
      Repair
    </ButtonWithConfirmationModal>
  )
}