/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(
  initialState: { currentUser?: API.CurrentUser } | undefined,
) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    canHr: currentUser && currentUser.access === 'hr',
    canEmployee: currentUser && currentUser.access === 'employee',
    canEmployeeOnboard: currentUser && currentUser.access === 'employee-onboard',
  };
}
