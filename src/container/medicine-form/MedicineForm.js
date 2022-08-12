import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { useFormik ,Form ,Formik} from 'formik';

function MedicineForm(props) {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let schema = yup.object().shape({
    name: yup.string().required("Enter medicine name"),
    age: yup.number().required().positive().integer(),
    email: yup.string().email()
  });

  const formikObj = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema : schema ,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const {handleSubmit ,handleBlur ,handleChange ,errors ,touched} = formikObj

    return (
        <div>
      <Button  className='bg-success my-5' variant="contained" onClick={handleClickOpen}>
        Medicine Form
      </Button>
      <h4 className='text-success mb-5'>Given below is the list of medicine form.</h4>
      <Formik values={formikObj}>
              <Form onSubmit={handleSubmit}>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Medicine Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the all required information in the medicine form
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Medicine Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name ? <p>{errors.name}</p>: ''}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      </Form>
      </Formik>
    </div>
    );
}

export default MedicineForm;