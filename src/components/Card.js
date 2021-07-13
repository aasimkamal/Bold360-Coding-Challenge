import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    textAlign: "center"
  },
  data: {
    fontSize: 50
  }
};

const card = ({
  classes,
  title,
  data
}) => (
  <Card className={classes.card} raised="true" style={{ backgroundColor: "lightblue" }}>
    <CardContent>
      <Typography component="h1">
        {title}
      </Typography>
      <Typography component="h1" className={classes.data}>
        {data}
      </Typography>
    </CardContent>
  </Card>
);

card.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.number.isRequired
};

export default withStyles(styles)(card);