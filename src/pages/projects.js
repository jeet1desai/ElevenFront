import React from 'react';

import { Box, TableHead, TableRow, TableCell, TableBody, TableContainer, Table, Typography, Button } from '@mui/material';

import MainCard from 'components/MainCard';

import { useSelector } from 'store/index';
import { ROLES, STATUS } from 'utils/enum';

import dayjs from 'dayjs';

const headCells = [
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Project Name'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Permission'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Team'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Project Code'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Status'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Last Updated'
  }
];

const Projects = () => {
  const { projects } = useSelector((state) => state.project);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', width: '100%', alignItem: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h2">Projects</Typography>
          <Button variant="contained" color="success">
            New Project
          </Button>
        </Box>
        <MainCard sx={{ mt: 2 }} content={false}>
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
                '& .MuiTableCell-root:first-of-type': {
                  pl: 2
                },
                '& .MuiTableCell-root:last-of-type': {
                  pr: 3
                }
              }}
            >
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project) => {
                  return (
                    <TableRow
                      onClick={() => {
                        console.log('hi');
                      }}
                      key={project.id}
                      hover
                      role="checkbox"
                      sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
                      tabIndex={-1}
                    >
                      <TableCell>{project.name}</TableCell>
                      <TableCell>{ROLES[1]}</TableCell>
                      <TableCell>{project.name}</TableCell>
                      <TableCell>{project.code}</TableCell>
                      <TableCell>{STATUS[project.status]}</TableCell>
                      <TableCell>{dayjs(project.modified_date).format('DD MMM YYYY hh:mm A')}</TableCell>
                    </TableRow>
                  );
                })}
                {projects.length === 0 && (
                  <TableRow hover role="checkbox" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} tabIndex={-1}>
                    <TableCell align="center" colSpan={6}>
                      No Project Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Box>
    </Box>
  );
};

export default Projects;
