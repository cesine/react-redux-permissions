import { RRP_ADD_PERMISSION, RRP_REMOVE_PERMISSION, RRP_CLEAR } from "./constants"

export function add(...roles) {
  return {
    type: RRP_ADD_PERMISSION,
    roles,
  };
}

export function remove(...roles) {
  return {
    type: RRP_REMOVE_PERMISSION,
    roles,
  };
}

export function clear() {
  return {
    type: RRP_CLEAR,
  };
}
