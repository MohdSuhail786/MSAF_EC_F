import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function CircularProgressBar({style}) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={style}>
      <CircularProgress />
      {/* <CircularProgress color="secondary" /> */}
    </div>
  );
}