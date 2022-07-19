import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { MatchFilter } from './Pairings/types';
import { PairingFilters, PairingSearch } from './Pairings/Options';

interface TournamentOptionsCardProps {
  completedMatchFilter: MatchFilter;
  setCompletedMatchFilter: (matchFilter: MatchFilter) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

export const TournamentOptionsCard = (props: TournamentOptionsCardProps) => {
  return (
    <Card>
      <CardContent>
        <PairingFilters
          completedMatchFilter={props.completedMatchFilter}
          setCompletedMatchFilter={props.setCompletedMatchFilter}
        />
        <PairingSearch
          searchQuery={props.searchQuery}
          setSearchQuery={props.setSearchQuery}
        />
      </CardContent>
    </Card>
  );
};
