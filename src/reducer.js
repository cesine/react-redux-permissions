import { walkObject } from './core';
import { RRP_ADD_PERMISSION, RRP_REMOVE_PERMISSION, RRP_CLEAR } from "./constants"

function roleToRoles(role) {
  const roles = []
  if (role !== null && typeof role === 'object') {
    walkObject(({ value, keyPath }) => {
      if (!!value) {
        roles.push(keyPath);
      }
    })(role);
  } else if (typeof role === 'string') {
    roles.push(role);
  }
  return roles;
}

function mergeRoles(old, add) {
  const roles = old
    // Add all old roles not about to be re-added to the added
    .reduce((memo, role) => {
      if (add.indexOf(role) === -1) {
        memo.push(role);
      }
      return memo;
    }, [...add]);
  return roles;
}

export const reducer = (state = [], action = {}) => {
  switch (action.type) {
    case RRP_ADD_PERMISSION:
      const roles = action.roles.reduce(
        (memo, role) => memo.concat(roleToRoles(role)),
        [],
      );
      return mergeRoles(state, roles);
    case RRP_REMOVE_PERMISSION:
      return state.filter(role =>
        action.roles.indexOf(role) === -1,
      );
    case RRP_CLEAR:
      return []
    default:
      return state
  }
}

export default reducer
