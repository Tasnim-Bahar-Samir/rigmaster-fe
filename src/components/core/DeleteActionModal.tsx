import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { FC, useState } from 'react';
type DeleteActionProps = {
  revalidateFun?: Function;
  handleDeleteSubmit: Function;
  isLoading: boolean;
  isOnlyIcon?: boolean;
};
const DeleteActionModal: FC<DeleteActionProps> = ({
  handleDeleteSubmit,
  revalidateFun,
  isLoading,
}) => {
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await handleDeleteSubmit();
      if (revalidateFun) {
        // console.log('hello')
        await revalidateFun();
        window.location.reload();
      }
      enqueueSnackbar('Deleted successfully.', {
        variant: 'success',
      });
      setOpen(!open);
    } catch (error) {
      enqueueSnackbar(`${error}`, {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <MenuItem onClick={() => setOpen(!open)}>Delete</MenuItem>
      <Dialog
        sx={{ BiBorderRadius: '20px' }}
        fullWidth
        maxWidth="xs"
        onClose={() => setOpen(!open)}
        open={open}
      >
        <DialogTitle className="font-bold">Are sure to delete?</DialogTitle>
        <DialogContent>If you delete it {"it'll"} remove permanently!</DialogContent>
        <DialogActions>
          <div className="pt-4 flex gap-2 items-center">
            <button onClick={() => setOpen(!open)} className="px-3 py-2 rounded-md border">
              Cancel
            </button>
            <button
              disabled={isLoading}
              onClick={handleDelete}
              className="disabled:bg-slate-500 px-3 py-2 bg-red-600 text-white rounded-md"
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteActionModal;
