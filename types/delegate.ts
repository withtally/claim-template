export interface Delegate {
  id: string;
  account: Account;
  votesCount: string;
  delegatorsCount: number;
  statement: Statement;
}

export interface Account {
  address: string;
  bio: string;
  name: string;
  picture: string;
  twitter: string;
}

export interface Statement {
  statementSummary: string;
  seekingDelegations: boolean;
  isSeekingDelegation: boolean;
  issues: Issue[];
}

export interface Issue {
  id: string;
  organizationId: string;
  name: string;
  description: string;
}