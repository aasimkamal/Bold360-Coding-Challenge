import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import AgentTable from './AgentTable';
import Card from './Card';

const styles = () => ({
    root: {
      flexGrow: 1
    },
    gridContainer: {
      margin: 20
    }
  });
  
  const dashboard = ({
    classes,
    totalNumberOfChats,
    totalNumberOfDesktopVisitors,
    totalNumberOfMobileVisitors,
    chatOperators,
    toggleStatusHandler
  }) => (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#3a5bac" }}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Bold360 Agent Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.gridContainer}>
        <Grid container spacing={24}>
          <Grid item sm={4}>
            <Card title="Total Number of Chats" data={totalNumberOfChats} />
          </Grid>
          <Grid item sm={4}>
            <Card title="Total Number of Desktop Visitors" data={totalNumberOfDesktopVisitors} />
          </Grid>
          <Grid item sm={4}>
            <Card title="Total Number of Mobile Visitors" data={totalNumberOfMobileVisitors} />
          </Grid>
        </Grid>
        <AgentTable
          agents={chatOperators}
          toggleStatusHandler={toggleStatusHandler}
        />
      </div>
    </div>
  );
  
  dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    totalNumberOfChats: PropTypes.number.isRequired,
    totalNumberOfDesktopVisitors: PropTypes.number.isRequired,
    totalNumberOfMobileVisitors: PropTypes.number.isRequired,
    chatOperators: PropTypes.arrayOf(PropTypes.object).isRequired,
    toggleStatusHandler: PropTypes.func.isRequired
  };
  
  export default withStyles(styles)(dashboard);