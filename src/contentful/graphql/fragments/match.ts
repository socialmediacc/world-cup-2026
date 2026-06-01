import { gql } from "@apollo/client";

import { ENTRY_SYS_FIELDS } from "@/contentful/graphql/fragments/entry-sys";

export const MATCH_FIELDS = gql`
  fragment MatchFields on Match {
    ...EntrySysFields
    internalName
    kickoff
    venue
    ticketUrl
    homeTeam
    awayTeam
  }
  ${ENTRY_SYS_FIELDS}
`;
