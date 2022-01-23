import { IssueSource } from "./issue-source";

export interface Issues extends Array<Issue> {}

export interface Issue {
  status: number;
  code: number;
  title: string;
  detail: string;
  source: IssueSource;
}
