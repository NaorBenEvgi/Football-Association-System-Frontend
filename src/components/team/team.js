import React, { useContext } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import WorkIcon from "@material-ui/icons/Work";
import PlaceIcon from "@material-ui/icons/Place";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import useStyles from "./teamStyle";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './team.css';

export default function Team(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [expanded, setExpanded] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={
          { subheader: props.teamStatus === 'Open' ? classes.subtitleOpen : props.teamStatus === 'Pending' ? classes.subtitlePending : classes.subtitleClose }
        }
        title={props.teamName}
        subheader={props.teamStatus}
      />

      <CardContent>
        <div className={classes.contentContainer}>
          <div className={classes.contentCol}>
            <div className={classes.catagory}>
              <DirectionsRunIcon fontSize="large" />
              <ul className={classes.catagoryUl}>
                {props.players.map((player) => (
                  <li key={player.name} className={classes.catagoryLi}>
                    {player.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className={classes.catagory}>
              <WorkIcon fontSize="large" />
              <List className={classes.catagoryUl}>
                {props.managers.map((manager) => (
                  <ListItem key={manager.name} className={classes.catagoryLi}>
                    <ListItemText>
                      {manager.name}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
          <div className={classes.contentCol}>
            <div className={classes.catagory}>
              <PlaceIcon fontSize="large" />
              <p className={classes.catagoryUl}>{props.stadium.fieldName}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Edit team</MenuItem>
      </Menu>
    </Card>
  );
}
