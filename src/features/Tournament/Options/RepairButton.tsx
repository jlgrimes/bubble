import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store";
import { ButtonWithConfirmationModal } from "../../../common/ButtonWithConfirmationModal";
import { ButtonWithDisabledTooltip } from "../../../common/ButtonWithDisabledTooltip";
import { repair } from "../state/tournamentSlice";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

export const RepairButton = () => {
  const dispatch = useDispatch();
  const shouldBeDisabled: boolean = useSelector((state: RootState) => state.tournament.viewState !== 'tournament');

  const buttonProps = {
    ariaText: 'Repair',
    startIcon: <AutoFixHighIcon />
  }

  if (shouldBeDisabled) {
    return (
      <ButtonWithDisabledTooltip
        {...buttonProps}
        disabled
        disabledTooltipText="Cannot repair outside of swiss rounds."
      >
        Repair
      </ButtonWithDisabledTooltip>
    )
  }

  return (
    <ButtonWithConfirmationModal
      {...buttonProps}
      modalTitle="Are you sure you want to repair the round?"
      modalContent="Repairing loses all match data and reverts to the beginning of the round. Dropped players will be applied to new pairings."
      onClick={() => dispatch(repair())}
    >
      Repair
    </ButtonWithConfirmationModal>
  )
}