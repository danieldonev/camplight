import { isRejectedWithValue, MiddlewareAPI } from '@reduxjs/toolkit';
import { enqueueSnackbar } from 'notistack';

export const rtkQueryErrorLogger = () => (next: any) => (action: MiddlewareAPI) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    enqueueSnackbar(
      'data' in action.error
        ? (action.error.data as { message: string }).message
        : action.error.message,
      {
        variant: 'error',
      }
    );
  }

  return next(action);
};
