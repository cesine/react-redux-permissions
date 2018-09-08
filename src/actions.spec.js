import {
  add,
  remove,
  clear,
} from './actions';
import {
  RRP_ADD_PERMISSION,
  RRP_REMOVE_PERMISSION,
  RRP_CLEAR,
} from './constants';

describe('actions', () => {
  it('adds one', () => {
    expect(add('foo'))
      .toEqual({
        type: RRP_ADD_PERMISSION,
        roles: ['foo'],
      });
  });

  it('adds more than one', () => {
    expect(add('foo', 'bar'))
      .toEqual({
        type: RRP_ADD_PERMISSION,
        roles: ['foo', 'bar'],
      });
  });

  it('removes one', () => {
    expect(remove('foo'))
      .toEqual({
        type: RRP_REMOVE_PERMISSION,
        roles: ['foo'],
      });
  });

  it('removes more than one', () => {
    expect(remove('foo', 'bar'))
      .toEqual({
        type: RRP_REMOVE_PERMISSION,
        roles: ['foo', 'bar'],
      });
  });

  it('clears', () => {
    expect(clear())
      .toEqual({
        type: RRP_CLEAR,
      });
  });
});
