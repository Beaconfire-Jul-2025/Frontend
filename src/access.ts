/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(
  initialState: { currentUser?: API.CurrentUser } | undefined,
) {
  const { currentUser } = initialState ?? {};
  return {
    canHr: currentUser && currentUser.access === 'ROLE_HR',
    canAdmin: currentUser && currentUser.access === 'ROLE_ADMIN',
    canEmployee: currentUser && currentUser.access === 'ROLE_EMPLOYEE',
    canEmployeeOnboard: currentUser && currentUser.access === 'ROLE_ONBOARD',
  };
}
