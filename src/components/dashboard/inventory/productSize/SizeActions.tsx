import { Menu } from '@mui/material';
import { FC, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import DeleteActionModal from '@/components/core/DeleteActionModal';
import SizeForm from './SizeForm';

type SizeActionsProps = {
  handleDeleteFun: Function;
  isDataDeleting: boolean;
  instance: any;
  handleEdit: Function;
  isDataEditing: boolean;
};

const SizeActions: FC<SizeActionsProps> = ({
  instance,
  handleEdit,
  isDataEditing,
  handleDeleteFun,
  isDataDeleting,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <button className="px-1 rounded-sm">
        <BsThreeDots
          className="cursor-pointer"
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        />
      </button>
      <Menu
        sx={{
          top: 10,
          left: -90,
          borderRadius: 25,
          paddingLeft: 12,
          paddingRight: 12,
        }}
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}

        // TransitionComponent={Fade}
      >
        <SizeForm
          setAnchorEl={setAnchorEl}
          instance={instance}
          handleDataSubmit={handleEdit}
          isDataSubmiting={isDataEditing}
        />
        <DeleteActionModal handleDeleteSubmit={handleDeleteFun} isLoading={isDataDeleting} />
      </Menu>
    </div>
  );
};

export default SizeActions;
