import React, { useState } from 'react';

import { styled } from '@mui/material/styles';
import { TextField, InputAdornment, Button, TableHead, TableRow, TableCell, TableBody, TableContainer, Table } from '@mui/material';

import { IconSearch } from '@tabler/icons-react';

import MainCard from 'components/MainCard';

import AddMember from './AddMember';

const TableHeaderBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '10px',
  justifyContent: 'space-between',
  borderBottom: '1px solid #e6ebf1',
  padding: '16px 12px'
});

const Teams = () => {
  const [isAddMemberOpen, setAddMember] = useState(false);

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
              <TableRow>
                <TableCell colSpan="6" align="center">
                  No data
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </MainCard>

      <AddMember open={isAddMemberOpen} onClose={() => setAddMember(false)} />
    </>
  );
};

export default Teams;
