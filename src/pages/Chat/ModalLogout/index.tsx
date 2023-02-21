import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface StateProps {
    openModal: boolean;
    handleOpenModel(): void;
    handleLogout(): void;
}

const ModalLogout = (props: StateProps) => {

  return (
    <div>
      <Dialog
        open={props.openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleOpenModel}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Fazer logout?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Por favor confirme se quer sair do chat
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleLogout} color="primary">
            Sim
          </Button>
          <Button onClick={props.handleOpenModel} color="primary">
            Não
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalLogout;