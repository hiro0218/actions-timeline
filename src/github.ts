// @octokit/rest@20 dropped support for node16. However, node16 bundled in actions/runner and still supported.
// So, we use @octokit/rest@19.
import { Octokit, RestEndpointMethodTypes } from "npm:@octokit/rest@20.0.2";
import process from "node:process";

export type Workflow =
  RestEndpointMethodTypes["actions"]["getWorkflowRunAttempt"]["response"][
    "data"
  ];
export type WorkflowJobs =
  RestEndpointMethodTypes["actions"]["listJobsForWorkflowRunAttempt"][
    "response"
  ][
    "data"
  ]["jobs"];

export const createOctokit = (token: string): Octokit => {
  const baseUrl = process.env.GITHUB_API_URL ?? "https://api.github.com";
  return new Octokit({
    auth: token,
    baseUrl,
  });
};

export const fetchWorkflow = async (
  octokit: Octokit,
  owner: string,
  repo: string,
  runId: number,
  runAttempt: number,
): Promise<Workflow> => {
  const workflow = await octokit.rest.actions.getWorkflowRunAttempt({
    owner,
    repo,
    run_id: runId,
    attempt_number: runAttempt,
  });
  return workflow.data;
};

export const fetchWorkflowRunJobs = async (
  octokit: Octokit,
  owner: string,
  repo: string,
  runId: number,
  runAttempt: number,
): Promise<WorkflowJobs> => {
  const workflowJob = await octokit.rest.actions.listJobsForWorkflowRunAttempt({
    owner,
    repo,
    run_id: runId,
    attempt_number: runAttempt,
  });
  return workflowJob.data.jobs;
};
