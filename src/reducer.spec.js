import {
  RRP_ADD_PERMISSION,
  RRP_REMOVE_PERMISSION,
  RRP_CLEAR,
} from './constants';
import reducer from './reducer';

describe('reducer', () => {
  it('adds one to state', () => {
    expect(reducer([], {
      type: RRP_ADD_PERMISSION,
      roles: ['foo']
    })).toEqual(['foo']);
  });

  it('adds more than one to state', () => {
    expect(reducer([], {
      type: RRP_ADD_PERMISSION,
      roles: ['foo', 'bar']
    })).toEqual(['foo', 'bar']);
  });

  it('removes one from state', () => {
    expect(reducer(['foo', 'bar'], {
      type: RRP_REMOVE_PERMISSION,
      roles: ['foo']
    })).toEqual(['bar']);
  });

  it('removes more that one from state', () => {
    expect(reducer(['foo', 'bar', 'foobar'], {
      type: RRP_REMOVE_PERMISSION,
      roles: ['foo', 'bar']
    })).toEqual(['foobar']);
  });

  it('clears from state', () => {
    expect(reducer(['foo', 'bar'], {
      type: RRP_CLEAR,
    })).toEqual([]);
  });
});
