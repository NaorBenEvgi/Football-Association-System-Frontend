import React, { useState, useEffect, useContext } from "react";
import API from "../../api/Api";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import CreateSeasonModal from "../../components/newSeasonModal/newSeasonModal";
import { AuthContext } from "../../providers/authProvider";
import Season from "../../components/season/season"
const useStyles = makeStyles((theme) => ({
  createTeam: {
    position: "fixed",
    bottom: "10%",
    right: "10%",
  },
}));

export default function () {
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  const [leagues, setLeagues] = useState([]);
  const [createSeasonOpen, setOpen] = useState(false);

  const getLeagues = async () => {
    const response = await API.getLeagues({available: true});
    setLeagues(response);
    };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getLeagues();
  }, []);

  return leagues.length < 0 ? (
    <div>in Teams</div>
  ) : (
      <div className={classes.root}>
        {leagues.map((league, index) => {
          return (
            <Season
              key={index}
              begin={league.begin}
              leagueName={league.leagueName}
              rankingMethod={league.rankingMethod}
              referees={league.referees}
              schedulingMethod={league.schedulingMethod}
              season={league.season}
              teamsInLeaguePerSeason={league.teamsInLeaguePerSeason}
              index ={index}
            />
          );
        })}
        {/* Change to ASSOCIATION_AGENT */}
          {(authContext.state.user &&
          authContext.state.user.roles.indexOf("FAN") >= 0) ? (
            <div className={classes.createTeam}>
              <Fab color="secondary" aria-label="add" onClick={handleOpen}>
                <AddIcon />
              </Fab> 

            </div>
          ) : null}
          <CreateSeasonModal getSeasons={getLeagues} open={createSeasonOpen} close={handleClose} /> 
      </div>
    );
}