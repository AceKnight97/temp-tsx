/* eslint-disable consistent-return */
import { useRef, useState, useEffect } from 'react';
import _ from 'lodash';
// import emitter from '../Utils/eventEmitter';

export const useMergeState = (initialState) => {
  const [state, setState] = useState(initialState);
  const setMergedState = newState => setState((prevState) => {
    const expectedState = _.assign(prevState, newState);
    return { ...expectedState };
  });
  return [state, setMergedState];
};

export const useUpdateEffect = (effect, dependencies = [], cleanup, timeOutConfig = {}) => {
  const isInitialMount = useRef(true);
  const handleTimeOut = useRef(undefined);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (!_.isEmpty(timeOutConfig)) {
      const { timeout } = timeOutConfig;
      if (handleTimeOut.current) {
        clearTimeout(handleTimeOut.current);
      }
      handleTimeOut.current = setTimeout(() => {
        effect();
      }, timeout);
    } else {
      effect();
    }
    return cleanup;
  }, dependencies);
};

/*
 *  const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * The hook will only return the latest value if it's been more than 500ms since searchTerm changed.
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

// export const useEmitter = (key, callback, deps) => {
//   useEffect(() => {
//     if (!(key && callback)) {
//       return;
//     }
//     const listener = emitter.addListener(key, callback);
//     return () => {
//       listener.remove();
//     };
//   }, [key, ...deps]);
//   return emitter;
// };
