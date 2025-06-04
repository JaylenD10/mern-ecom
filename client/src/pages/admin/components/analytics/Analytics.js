import {
  Backdrop,
  CircularProgress,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import { fetchAnalytics } from '../../service/admin';
import './analytics.css';
import { useEffect, useState } from 'react';

export default function Analytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetchAnalytics();
      if (response.status === 200) setData(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnalytics();
  }, []);

  return (
    <>
      <div className="analytics-container">
        {data && (
          <>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Card className="analytics-card">
                  <CardHeader
                    avatar={<div className="metric-avatar">0</div>}
                    title="Orders"
                  />
                  <CardContent>
                    <div className="metric-value">
                      {data.currentMonthOrders}
                    </div>
                  </CardContent>
                  <CardContent className="previous-month">
                    <div className="metric-value">
                      {data.previousMonthOrders}
                    </div>{' '}
                    <div className="metric-subtext">Previous Month</div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={6}>
                <Card className="analytics-card">
                  <CardHeader
                    avatar={<div className="metric-avatar">E</div>}
                    title="Earnings"
                  />
                  <CardContent>
                    <div className="metric-value">
                      ${data.currentMonthEarnings}
                    </div>
                    <div className="metric-subtext">Current Month</div>
                  </CardContent>
                  <CardContent className="previous-month">
                    <div className="metric-value">
                      ${data.previousMonthEarnings}
                    </div>{' '}
                    <div className="metric-subtext">Previous Month</div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <div className="order-status-container">
              <Grid container spacing={2}>
                <Grid xs={4}>
                  <Card className="order-status-card">
                    <CardHeader
                      avatar={<div className="status-avatar">P</div>}
                      title="Placed"
                    />
                    <CardContent>
                      <div className="status-value">{data.placed}</div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid xs={4}>
                  <Card className="order-status-card">
                    <CardHeader
                      avatar={<div className="status-avatar">S</div>}
                      title="Shipped"
                    />
                    <CardContent>
                      <div className="status-value">{data.shipped}</div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid xs={4}>
                  <Card className="order-status-card">
                    <CardHeader
                      avatar={<div className="status-avatar">D</div>}
                      title="Delivered"
                    />
                    <CardContent>
                      <div className="status-value">{data.delivered}</div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          </>
        )}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="success" />
        </Backdrop>
      </div>
    </>
  );
}
