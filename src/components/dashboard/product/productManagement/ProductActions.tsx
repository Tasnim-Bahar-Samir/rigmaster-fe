import { Menu } from '@mui/material';
import { FC, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import DeleteActionModal from '@/components/core/DeleteActionModal';
import ProductEdit from './ProductEdit';

type ProductActionsProps = {
  handleDeleteFun: Function;
  isDataDeleting: boolean;
  instance: any;
};

const ProductActions: FC<ProductActionsProps> = ({ instance, handleDeleteFun, isDataDeleting }) => {
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
        <ProductEdit instance={instance} setAnchorEl={setAnchorEl} />
        <DeleteActionModal
          setAnchorEl={setAnchorEl}
          handleDeleteSubmit={handleDeleteFun}
          isLoading={isDataDeleting}
        />
      </Menu>
    </div>
  );
};

export default ProductActions;
