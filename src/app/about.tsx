import ContentBox from '../components/contentBox';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import { Link, List, ListItem } from '@mui/joy';
import { WORKOUT_CONFIG } from '@shared-data';

const formatConversion = (activity: {
  units: 'time' | 'distance';
  pointRate: number;
}) => {
  if (activity.units === 'time') {
    if (activity.pointRate < 1)
      return `${activity.pointRate * 60} points per hour`;
    return `${activity.pointRate} points per minute`;
  }
  if (activity.pointRate < 1)
    return `1 point per ${
      Math.round((1 / activity.pointRate) * 100) / 100
    } miles`;
  return `${activity.pointRate} point${
    activity.pointRate > 1 ? 's' : ''
  } per mile`;
};

export default () => (
  <ContentBox maxWidth={800}>
    <Box m={2} mb={10}>
      <Typography level={'h2'}>What is FantasyFitness?</Typography>
      <Typography sx={{ mt: 1, mb: 1 }}>
        <b>
          FantasyFitness (or 'NotFantasyFitness') is the spiritual successor to
          iFantasyFitness.
        </b>{' '}
        iFantasyFitness was created by 2015 alum <b>Tate Bosler</b> to spark
        competition in summer training. Running from 2012 to 2020, participants
        would be drafted onto teams, and earn points by logging their
        activities. Now, FantasyFitness is back with a new look and feel!
      </Typography>

      <Typography level={'h3'} sx={{ mt: 4 }}>
        How does it work?
      </Typography>
      <Typography sx={{ mt: 1, mb: 1 }}>
        Whenever you exercise, log your activity on the website. You'll earn
        points based on the duration and type of activity. Don't log low-effort
        activities like mowing the lawn or walking to the fridge! Acceptable
        activities are listed below, along with the points conversions.
      </Typography>

      <Typography level={'h3'} sx={{ mt: 4 }}>
        Point Conversions
      </Typography>
      <List size={'sm'} marker={'disc'}>
        {WORKOUT_CONFIG.map((activity) => (
          <ListItem>
            <Typography level={'body-sm'}>
              <b>{activity.name}</b>: {formatConversion(activity)}
            </Typography>
          </ListItem>
        ))}
      </List>

      <Typography level={'h3'} sx={{ mt: 4 }}>
        Why do it?
      </Typography>
      <Typography sx={{ mt: 1, mb: 1 }}>
        <b>Prizes!</b> The highest-scoring individuals in both the Upperclassmen
        and Underclassmen divisions will receive prizes at the end of the
        competition. More details to come. In addition to prizes for top
        scorers, the winning team will receive a highly-coveted award.
      </Typography>

      <Typography level={'h4'} sx={{ mt: 4 }}>
        Stuff for nerds
      </Typography>
      <Typography>
        iFantasyFitness source code can be found{' '}
        <Link href={'https://github.com/tatebosler/ifantasyfitness'}>here</Link>
        .
      </Typography>
      <Typography>
        Source for this implementation lives{' '}
        <Link href={'https://github.com/cgreggescalante/nff'}>here</Link>.
      </Typography>
      <Typography mb={2}>
        This website is built with React, TypeScript, Firebase, and Material-UI.
      </Typography>
      <a href="https://wakatime.com/badge/user/25fb9fe4-7b85-4ba3-9fce-5907c701b2a9/project/6af16204-9878-4b9f-bfc1-5f4462bc8495">
        <img
          src="https://wakatime.com/badge/user/25fb9fe4-7b85-4ba3-9fce-5907c701b2a9/project/6af16204-9878-4b9f-bfc1-5f4462bc8495.svg"
          alt="wakatime"
        />
      </a>
      <Typography>
        That's the total time I've spent working on this project since I started
        in August of 2023. Seems like a bit much :/. It works out to about 2
        minutes per line of code.
      </Typography>
    </Box>
  </ContentBox>
);
