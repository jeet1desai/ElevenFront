import React, { useState } from 'react';

import { Button, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { IconEdit } from '@tabler/icons-react';

import ProjectForm from 'pages/projects/ProjectForm';
import CreateCompany from 'pages/projects/CompanyForm';
import MainCard from 'components/MainCard';

import { useSelector } from 'store/index';

import { STATUS } from 'utils/enum';

const Setting = () => {
  const [isProjectModalOpen, setProjectModal] = useState(false);
  const [isCompanyModalOpen, setCompanyModal] = useState(false);

  const { project } = useSelector((state) => state.project);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {project && (
            <MainCard
              title="Project"
              secondary={
                <Button
                  onClick={() => {
                    setProjectModal(true);
                  }}
                  variant="contained"
                  color="success"
                  startIcon={<IconEdit size={18} />}
                >
                  Edit
                </Button>
              }
            >
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                    Project Name
                  </Typography>
                  <Typography variant="body1">{project.name}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                    Project Code
                  </Typography>
                  <Typography variant="body1">{project.code}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                    Status
                  </Typography>
                  <Typography variant="body1">{STATUS[project.status]}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                    Address
                  </Typography>
                  <Typography variant="body1">{project.address}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                    Start Date
                  </Typography>
                  <Typography variant="body1">{project.start_date ? dayjs(project.start_date).format('MMM DD, YYYY') : ''}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                    End Date
                  </Typography>
                  <Typography variant="body1">{project.end_date ? dayjs(project.end_date).format('MMM DD, YYYY') : ''}</Typography>
                </Grid>
              </Grid>
            </MainCard>
          )}
        </Grid>
        <Grid item xs={12}>
          <MainCard
            title="Company"
            secondary={
              <Button
                onClick={() => {
                  setCompanyModal(true);
                }}
                variant="contained"
                color="success"
                startIcon={<IconEdit size={18} />}
              >
                Edit
              </Button>
            }
          >
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                  Company Name
                </Typography>
                <Typography variant="body1">Company Name</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                  Phone Number
                </Typography>
                <Typography variant="body1">Phone Number</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                  Title
                </Typography>
                <Typography variant="body1">Title</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                  Type
                </Typography>
                <Typography variant="body1">Type</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                  Industry
                </Typography>
                <Typography variant="body1">Industry</Typography>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>

      {isProjectModalOpen && (
        <ProjectForm isProjectModalOpen={isProjectModalOpen} setProjectModal={setProjectModal} project={project} isEdit={true} />
      )}

      {isCompanyModalOpen && <CreateCompany open={isCompanyModalOpen} setCompanyModal={setCompanyModal} isEdit={true} />}
    </>
  );
};

export default Setting;
