import { Menu } from '@mui/material';
import { FC, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import DashOrderDetails from './DashOrderDetails';
import OrderForm from './OrderForm';
import DeleteActionModal from '@/components/core/DeleteActionModal';

type OrderActionsProps = {
  handleDeleteFun: Function;
  isDataDeleting: boolean;
  instance: any;
  handleEdit: Function;
  isDataEditing: boolean;
};

const OrderActions: FC<OrderActionsProps> = ({
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
        <OrderForm
          instance={instance}
          handleDataSubmit={handleEdit}
          isDataSubmiting={isDataEditing}
        />
        <DashOrderDetails setAnchorEl={setAnchorEl} orderDetails={instance} />
        <DeleteActionModal handleDeleteSubmit={handleDeleteFun} isLoading={isDataDeleting} />
      </Menu>
    </div>
  );
};

export default OrderActions;
