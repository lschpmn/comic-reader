
export const loggingMiddleware = store => next => action => {
  console.log('Action:');
  console.log(action);
  const result = next(action);
  console.log('State:');
  console.log(store.getState());
  return result;
};
