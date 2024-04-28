import { styled } from '@mui/material/styles';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

const CardMediaWrapper = styled('div')({
  maxWidth: 540,
  margin: '0 auto',
  position: 'relative'
});

const PageContentWrapper = styled('div')({
  margin: '0 auto',
  textAlign: 'center'
});

const ConstructionCard = styled(Card)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #e6ebf1',
  boxShadow: 'none',
  borderRadius: '8px'
});

const UnderConstruction = () => {
  return (
    <>
      <ConstructionCard>
        <CardContent>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
              <CardMediaWrapper>
                <CardMedia
                  component="img"
                  image={'https://mantisdashboard.io/assets/under-construction-FFwMuvjh.svg'}
                  title="Slider 3 image"
                />
              </CardMediaWrapper>
            </Grid>
            <Grid item xs={12}>
              <PageContentWrapper>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h1" component="div">
                      Under Construction
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">This page is on under construction!! Please check after some time</Typography>
                  </Grid>
                </Grid>
              </PageContentWrapper>
            </Grid>
          </Grid>
        </CardContent>
      </ConstructionCard>
    </>
  );
};

export default UnderConstruction;
