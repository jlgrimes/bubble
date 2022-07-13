import Button from "@mui/material/Button"
import { useDispatch } from "react-redux"
import { nextRound } from "./state/tournamentSlice";

export const TournamentStateView = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Button onClick={() => dispatch(nextRound())}>Next round</Button>
    </div>
  )
}