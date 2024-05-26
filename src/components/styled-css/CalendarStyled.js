import { styled } from '@mui/material/styles';

const ExperimentalStyled = styled('div')(({ theme }) => ({
  '& .fc-license-message': {
    display: 'none'
  },

  '& .fc': {
    '--fc-bg-event-opacity': 1,
    '--fc-border-color': theme.palette.divider,
    '--fc-daygrid-event-dot-width': '10px',
    '--fc-today-bg-color': theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.primary.light,
    '--fc-list-event-dot-width': '10px',
    '--fc-event-border-color': theme.palette.primary.dark,
    '--fc-now-indicator-color': theme.palette.error.main,
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily
  },

  '& .fc .fc-daygrid-day-top': {
    display: 'grid',
    '& .fc-daygrid-day-number': {
      textAlign: 'center',
      marginTop: 12,
      marginBottom: 12
    }
  },

  '& .fc .fc-col-header-cell': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50]
  },

  '& .fc .fc-col-header-cell-cushion': {
    color: theme.palette.grey[900],
    padding: 16
  },

  '& .fc-direction-ltr .fc-daygrid-event.fc-event-end, .fc-direction-rtl .fc-daygrid-event.fc-event-start': {
    marginLeft: 4,
    marginBottom: 6,
    borderRadius: '6px'
  },

  '& .fc-direction-ltr .fc-daygrid-event.fc-event-start, .fc-direction-rtl .fc-daygrid-event.fc-event-end': {
    marginLeft: 4,
    marginBottom: 6,
    borderRadius: '6px'
  },

  '& .fc-h-event .fc-event-main': {
    padding: 4,
    paddingLeft: 8
  },

  '& .fc .fc-more-popover': {
    border: 'none',
    borderRadius: '6px'
  },

  '& .fc .fc-more-popover .fc-popover-body': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.grey[200],
    borderBottomLeftRadius: '6px',
    borderBottomRightRadius: '6px'
  },

  '& .fc .fc-popover-header': {
    padding: 12,
    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.grey[200],
    color: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.text.primary
  },

  '& .fc-theme-standard .fc-list-day-cushion': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[100]
  },

  '& .fc .fc-list-event:hover td': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark[800] : theme.palette.grey[100]
  },

  '& .fc-timegrid-event-harness-inset .fc-timegrid-event, .fc-timegrid-event.fc-event-mirror, .fc-timegrid-more-link': {
    padding: 8,
    margin: 2
  },

  '& .fc .fc-daygrid-day.fc-day-today': {
    backgroundColor: '#e4f1ff'
  }
}));

export default ExperimentalStyled;
