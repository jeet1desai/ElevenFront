import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import dayjs from 'dayjs';
// import { NumericFormat } from 'react-number-format';

import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';

import { IconMessage, IconSunglasses } from '@tabler/icons-react';

import { TaskStatus } from 'pages/tasks/index';

import { isDatePastDueDateColor } from 'utils/utilsFn';

const headCells = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'ID'
  },
  {
    id: 'title',
    align: 'left',
    disablePadding: true,
    label: 'Title'
  },
  {
    id: '',
    align: 'right',
    disablePadding: false,
    label: ''
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'dueDate',
    align: 'left',
    disablePadding: false,
    label: 'Due Date'
  }
];

function OrderTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

export default function DashTaskTable({ tasks }) {
  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead />
          <TableBody>
            {tasks.slice(0, 10).map((task) => {
              return (
                <TableRow hover role="checkbox" sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={task.id}>
                  <TableCell component="th" scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to={`/projects/${task.project.id}/tasks/view/${task.id}`}>
                      # {task.id}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{task.title}</TableCell>
                  <TableCell align="right">
                    {task.comments.length > 0 && (
                      <Chip
                        sx={{ border: '0' }}
                        icon={<IconMessage color="#919191" size={20} />}
                        label={task.comments.length}
                        variant="outlined"
                      />
                    )}
                    {task.assign.length > 0 && (
                      <Chip
                        sx={{ border: '0' }}
                        icon={<IconSunglasses color="#919191" size={20} />}
                        label={task.assign.length}
                        variant="outlined"
                      />
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <TaskStatus status={task.status} />
                  </TableCell>
                  <TableCell align="left" style={{ color: isDatePastDueDateColor(task.end_date) }}>
                    {task.end_date ? dayjs(task.end_date).format('MMM DD, YYYY') : ''}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
