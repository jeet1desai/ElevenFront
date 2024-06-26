import React, { useEffect, useMemo, useState } from 'react';

import { styled } from '@mui/material/styles';
import {
  TextField,
  InputAdornment,
  Button,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Table,
  IconButton,
  Chip,
  Stack
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';

import { IconSearch, IconEye, IconTrash } from '@tabler/icons-react';
import { MessageOutlined } from '@ant-design/icons';

import MainCard from 'components/MainCard';
import ViewMember from './ViewMember';
import AddMember from './AddMember';
import RemoveMember from './RemoveMember';

import { useDispatch, useSelector } from 'store/index';
import { getTeamsService } from 'services/team';
import { createChatService } from 'services/chat';

import { ROLES } from 'utils/enum';

const TableHeaderBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '10px',
  justifyContent: 'space-between',
  borderBottom: '1px solid #e6ebf1',
  padding: '16px 12px'
});

const TeamRole = ({ role }) => {
  let color;
  let bgColor;
  let borderColor;
  let title = ROLES[role];

  switch (role) {
    case 2:
      color = '#ffb814';
      bgColor = '#fff6d0';
      borderColor = '#ffcf4e';
      break;
    case 3:
      color = '#58d62a';
      bgColor = '#eafcd4';
      borderColor = '#8ae65b';
      break;
    case 4:
      color = 'error';
      break;
    default:
      color = '#549bff';
      bgColor = '#dcf0ff';
      borderColor = '#7eb9ff';
  }

  if (role === 4) {
    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <Chip label={title} size="small" color={color} />
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Chip label={title} size="small" sx={{ color: color, background: bgColor, borderColor: borderColor }} />
    </Stack>
  );
};

const Teams = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { projectId } = useSelector((state) => state.project);
  const { teams } = useSelector((state) => state.team);
  const { user } = useSelector((state) => state.account);

  const [isAddMemberOpen, setAddMember] = useState(false);
  const [deleteTeamDialogOpen, setDeleteTeamDialog] = useState(false);
  const [viewTeamDialogOpen, setViewTeamDialog] = useState(false);

  const [teamMember, setTeamMember] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [filterTeamList, setFilterTeamList] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(getTeamsService(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    setTeamList(teams);
    setFilterTeamList(teams);
  }, [teams]);

  const handleCloseDeleteDialog = () => {
    setTeamMember(null);
    setDeleteTeamDialog((deleteTeamDialogOpen) => !deleteTeamDialogOpen);
  };

  const handleCloseViewDialog = () => {
    setTeamMember(null);
    setViewTeamDialog((viewTeamDialogOpen) => !viewTeamDialogOpen);
  };

  const handleFilterTeamMembers = useMemo(() => {
    return _.debounce((e) => {
      handleFilter(e.target.value);
    }, 500);
  }, []);

  const handleFilter = (value) => {
    const filteredTeams = teamList.filter((team) => {
      return (
        team.user.first_name.toLowerCase().includes(value.toLowerCase()) ||
        team.user.last_name.toLowerCase().includes(value.toLowerCase()) ||
        team.company.company.toLowerCase().includes(value.toLowerCase()) ||
        team.user.email.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilterTeamList(filteredTeams);
  };

  return (
    <>
      <MainCard content={false}>
        <TableHeaderBox>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch stroke={2} size={16} />
                </InputAdornment>
              )
            }}
            placeholder="Search team member"
            size="small"
            sx={{ '& input': { paddingLeft: '2px' } }}
            onChange={handleFilterTeamMembers}
          />
          <Button variant="contained" color="success" onClick={() => setAddMember(true)}>
            Add Team Member
          </Button>
        </TableHeaderBox>
        <TableContainer
          sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            maxWidth: '100%',
            '& td, & th': { whiteSpace: 'nowrap' },
            '& th': { textTransform: 'uppercase' }
          }}
        >
          <Table
            sx={{
              '& .MuiTableCell-root:first-of-type': { pl: 2 },
              '& .MuiTableCell-root:last-of-type': { pr: 3 }
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Permission</TableCell>
                <TableCell align="left">Company</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterTeamList.map((team) => {
                return (
                  <TableRow key={team.id}>
                    <TableCell align="left">{team.user.first_name + ' ' + team.user.last_name}</TableCell>
                    <TableCell align="left">{team.user.email}</TableCell>
                    <TableCell align="left">
                      <TeamRole role={team.role} />
                    </TableCell>
                    <TableCell align="left">{team.company.company}</TableCell>
                    <TableCell align="left">
                      {team.user.country_code && team.user.phone_number ? team.user.country_code + ' ' + team.user.phone_number : 'Na'}
                    </TableCell>
                    <TableCell align="center">
                      {user.id !== team.user.id && (
                        <IconButton
                          onClick={() => {
                            dispatch(createChatService(user.id, team.user.id));
                            navigate(`/projects/${projectId}/chat`);
                          }}
                        >
                          <MessageOutlined />
                        </IconButton>
                      )}
                      <IconButton
                        color="primary"
                        onClick={() => {
                          setTeamMember(team);
                          setViewTeamDialog(true);
                        }}
                      >
                        <IconEye />
                      </IconButton>
                      {user.id !== team.user.id && ROLES[team.role] !== ROLES[4] && (
                        <IconButton
                          color="error"
                          onClick={() => {
                            setTeamMember(team);
                            setDeleteTeamDialog(true);
                          }}
                        >
                          <IconTrash />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {filterTeamList.length === 0 && (
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    No data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>

      <ViewMember open={viewTeamDialogOpen} onClose={handleCloseViewDialog} teamMember={teamMember} isOnlyView={false} />

      <AddMember open={isAddMemberOpen} onClose={() => setAddMember(false)} />

      <RemoveMember open={deleteTeamDialogOpen} onClose={handleCloseDeleteDialog} teamMember={teamMember} />
    </>
  );
};

export default Teams;
