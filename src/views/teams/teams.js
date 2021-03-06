import React, { useState, useEffect, useContext } from "react";
import API from "../../api/Api";
import Team from "../../components/team/team";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CreateTeamModal from "../../components/newTeamModal/newTeamModal";
import { AuthContext } from "../../providers/authProvider";
import { useStyles } from "./useStyles";

export default function () {
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  const [teams, setTeams] = useState([]);
  const [createTeamOpen, setOpen] = useState(false);

  const getTeams = async () => {
    const response = await API.getAllTeams();
    console.log(response);
    setTeams(response);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getTeams();
  }, []);

  return teams.length < 0 ? (
    <div>in Teams</div>
  ) : (
    <div className={classes.root}>
      <ul className={classes.teams}>
        {teams.map((team) => {
          return (
            <Team
              key={team.teamName}
              teamName={team.teamName}
              teamStatus={team.teamStatus}
              players={team.players}
              managers={team.owners}
              stadium={team.stadium}
            />
          );
        })}
      </ul>
      {(authContext.state.user &&
      authContext.state.user.roles.indexOf("FAN") >= 0 )? (
        <div className={classes.createTeam}>
          <Fab color="secondary" aria-label="add" onClick={handleOpen}>
            <AddIcon />
          </Fab>
        </div>
      ) : null}
      <CreateTeamModal getTeams={getTeams} open={createTeamOpen} close={handleClose} />
    </div>
  );
}
