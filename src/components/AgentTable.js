import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Switch from 'react-switch';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const agentTable = ({
  classes,
  agents,
  toggleStatusHandler
}) => (
  <Paper className={classes.root} elevation={24} style={{ backgroundColor: "aliceblue" }}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Login ID</TableCell>
          <TableCell>Service Type</TableCell>
          <TableCell>Client ID</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {agents.map(agent => (
          <TableRow key={`${agent.LoginID}`}>
            <TableCell component='th' scope='row'>
              {agent.Name}
            </TableCell>
            <TableCell>{agent.UserName}</TableCell>
            <TableCell>{agent.Email}</TableCell>
            <TableCell>{agent.LoginID}</TableCell>
            <TableCell>{agent.ServiceTypeID === '1' ? 'Chats' : 'Others'}</TableCell>
            <TableCell>{agent.ClientID}</TableCell>
            <TableCell>
              {agent.StatusType === 0 ? (
                <Typography component='h1'>
                  Offline
                </Typography>
              ) : (
                <label>
                    <span>{agent.StatusType === 2 ? 'Available' : 'Away'}&nbsp;&nbsp;&nbsp;</span>
                    <Switch onChange={() => toggleStatusHandler(agent.LoginID, agent.ClientID, agent.StatusType)} checked={agent.StatusType === 2} />
                </label>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

agentTable.propTypes = {
  classes: PropTypes.object.isRequired,
  agents: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleStatusHandler: PropTypes.func.isRequired
};

export default withStyles(styles)(agentTable);