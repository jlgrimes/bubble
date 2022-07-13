import Button from "@mui/material/Button"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store";
import { nextRound } from "./state/tournamentSlice";

export const TournamentStateView = () => {
  const dispatch = useDispatch();
  const allMatchesSubmitted = useSelector((state: RootState) => state.tournament.matchResults.length === state.tournament.pairings.length)

  return (
    <div>
      <Button disabled={!allMatchesSubmitted} onClick={() => dispatch(nextRound())}>Next round</Button>
    </div>
  )
}