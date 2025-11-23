// Minimal resolver types to satisfy TypeScript for now.
// We will refine these when we expand the schema.

export type ResolverFn<Parent = any, Args = any, Context = any, Result = any> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: any
) => Promise<Result> | Result;

export interface Resolvers {
  Query: {
    health: ResolverFn<unknown, unknown, any, string>;
    me: ResolverFn<unknown, unknown, any, any>;
  };
  Mutation: {
    login: ResolverFn<unknown, { email: string; password: string }, any, any>;
  };
}
